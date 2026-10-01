"use client";

import { useState } from "react";
import { Check, Minus, ShieldCheck, ShieldX, User } from "lucide-react";

/**
 * Interactive demo of role-based access control, modelled on a rental platform.
 * Everything is derived from the `permissions` table below, the same way a real API derives
 * its answer from one rule set: the menu, the matrix, the route definition and the response.
 */

type Scope = "all" | "own" | "none";
type Action = "read" | "create" | "update" | "delete";
type Role = "admin" | "landlord" | "tenant" | "guest";
type Resource = "properties" | "bookings" | "payments" | "reviews" | "users";

const roles: { id: Role; label: string; who: string }[] = [
  { id: "admin", label: "Admin", who: "Runs the whole platform" },
  { id: "landlord", label: "Landlord", who: "Lists and manages properties" },
  { id: "tenant", label: "Tenant", who: "Books a home and pays rent" },
  { id: "guest", label: "Guest", who: "Not signed in" },
];

const resources: { id: Resource; label: string; menu: string }[] = [
  { id: "properties", label: "Properties", menu: "Listings" },
  { id: "bookings", label: "Bookings", menu: "Bookings" },
  { id: "payments", label: "Payments", menu: "Payments" },
  { id: "reviews", label: "Reviews", menu: "Reviews" },
  { id: "users", label: "Users", menu: "User management" },
];

const actions: { id: Action; label: string }[] = [
  { id: "read", label: "View" },
  { id: "create", label: "Create" },
  { id: "update", label: "Edit" },
  { id: "delete", label: "Delete" },
];

const p = (read: Scope, create: Scope, update: Scope, del: Scope): Record<Action, Scope> => ({
  read,
  create,
  update,
  delete: del,
});

const permissions: Record<Role, Record<Resource, Record<Action, Scope>>> = {
  admin: {
    properties: p("all", "all", "all", "all"),
    bookings: p("all", "none", "all", "all"),
    payments: p("all", "none", "all", "none"),
    reviews: p("all", "none", "none", "all"),
    users: p("all", "all", "all", "all"),
  },
  landlord: {
    properties: p("all", "own", "own", "own"),
    bookings: p("own", "none", "own", "none"),
    payments: p("own", "none", "none", "none"),
    reviews: p("all", "none", "none", "none"),
    users: p("none", "none", "none", "none"),
  },
  tenant: {
    properties: p("all", "none", "none", "none"),
    bookings: p("own", "own", "none", "own"),
    payments: p("own", "own", "none", "none"),
    reviews: p("all", "own", "own", "own"),
    users: p("none", "none", "none", "none"),
  },
  guest: {
    properties: p("all", "none", "none", "none"),
    bookings: p("none", "none", "none", "none"),
    payments: p("none", "none", "none", "none"),
    reviews: p("all", "none", "none", "none"),
    users: p("none", "none", "none", "none"),
  },
};

const requests: { id: string; method: string; path: string; resource: Resource; action: Action; handler: string }[] = [
  { id: "list-properties", method: "GET", path: "/api/properties", resource: "properties", action: "read", handler: "listProperties" },
  { id: "create-property", method: "POST", path: "/api/properties", resource: "properties", action: "create", handler: "createProperty" },
  { id: "create-booking", method: "POST", path: "/api/bookings", resource: "bookings", action: "create", handler: "createBooking" },
  { id: "update-booking", method: "PATCH", path: "/api/bookings/:id/status", resource: "bookings", action: "update", handler: "updateBookingStatus" },
  { id: "delete-user", method: "DELETE", path: "/api/users/:id", resource: "users", action: "delete", handler: "removeUser" },
];

const ownerField: Record<Role, string> = { admin: "", landlord: "owner", tenant: "tenant", guest: "" };

function ScopeCell({ scope }: { scope: Scope }) {
  if (scope === "none") {
    return (
      <span className="inline-flex items-center justify-center text-subtle" title="Not allowed">
        <Minus className="size-4" aria-hidden />
        <span className="sr-only">Not allowed</span>
      </span>
    );
  }
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-medium ${
        scope === "all" ? "bg-ok-soft text-ok" : "bg-accent-soft text-accent"
      }`}
    >
      <Check className="size-3.5" aria-hidden />
      {scope === "all" ? "All" : "Own"}
    </span>
  );
}

export function AccessDemo() {
  const [role, setRole] = useState<Role>("landlord");
  const [requestId, setRequestId] = useState(requests[1].id);

  const current = roles.find((r) => r.id === role)!;
  const request = requests.find((r) => r.id === requestId)!;
  const scope = permissions[role][request.resource][request.action];

  // A route that guests may use is public: no token is needed, so it has no middleware at all.
  const isPublic = permissions.guest[request.resource][request.action] !== "none";
  const allowedRoles = roles
    .filter((r) => r.id !== "guest" && permissions[r.id][request.resource][request.action] !== "none")
    .map((r) => `"${r.id}"`)
    .join(", ");

  // 401 = we do not know who you are; 403 = we know, and you are not allowed.
  const status = scope !== "none" ? 200 : role === "guest" ? 401 : 403;
  const statusLabel = { 200: "200 OK", 401: "401 Unauthorized", 403: "403 Forbidden" }[status];

  const responseBody =
    status === 200
      ? scope === "all" || isPublic
        ? `{\n  "ok": true,\n  "scope": "all records"\n}`
        : `{\n  "ok": true,\n  "scope": "own records only",\n  "filter": { "${ownerField[role]}": req.user.id }\n}`
      : status === 401
        ? `{\n  "ok": false,\n  "message": "Unauthorized: sign in first"\n}`
        : `{\n  "ok": false,\n  "message": "Forbidden: ${role} cannot ${request.action} ${request.resource}"\n}`;

  const routePath = request.path.replace("/api", "");
  const routeDefinition = isPublic
    ? `router.${request.method.toLowerCase()}(\n  "${routePath}",\n  ${request.handler}             // public route, no token needed\n);`
    : `router.${request.method.toLowerCase()}(\n  "${routePath}",\n  protect,                       // verifies the JWT\n  authorize(${allowedRoles}),\n  ${request.handler}\n);`;

  const visibleMenu = resources.filter((res) => permissions[role][res.id].read !== "none");
  const hiddenCount = resources.length - visibleMenu.length;

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface">
      {/* Role picker */}
      <div className="border-b border-line p-4 sm:p-5">
        <p id="role-label" className="font-mono text-[11px] uppercase tracking-widest text-subtle">
          Use the app as
        </p>
        <div role="group" aria-labelledby="role-label" className="mt-3 flex flex-wrap gap-2">
          {roles.map((r) => (
            <button
              key={r.id}
              type="button"
              aria-pressed={r.id === role}
              onClick={() => setRole(r.id)}
              className={`h-11 rounded-lg border px-4 text-sm font-medium transition-colors ${
                r.id === role
                  ? "border-transparent bg-accent-bg text-accent-fg"
                  : "border-line bg-surface-2 text-muted hover:text-fg"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[15rem_minmax(0,1fr)]">
        {/* What this role's dashboard shows */}
        <div className="border-b border-line p-4 sm:p-5 lg:border-r lg:border-b-0">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-accent-soft text-accent">
              <User className="size-5" aria-hidden />
            </span>
            <div>
              <p className="text-sm font-semibold">{current.label}</p>
              <p className="text-xs text-muted">{current.who}</p>
            </div>
          </div>
          <p className="mt-5 font-mono text-[11px] uppercase tracking-widest text-subtle">Menu this role sees</p>
          <ul className="mt-2 space-y-1" aria-live="polite">
            {visibleMenu.map((item) => (
              <li key={item.id} className="rounded-md bg-surface-2 px-3 py-2 text-sm">
                {item.menu}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-subtle">
            {hiddenCount === 0 ? "This role sees every area." : `${hiddenCount} area(s) hidden for this role.`}
          </p>
        </div>

        {/* Permission matrix. relative: keeps the visually hidden labels inside this scroll area. */}
        <div className="relative overflow-x-auto p-4 sm:p-5">
          <table className="w-full min-w-[26rem] text-left text-sm">
            <caption className="sr-only">Permissions of the {current.label} role by resource and action</caption>
            <thead>
              <tr className="font-mono text-[11px] uppercase tracking-widest text-subtle">
                <th scope="col" className="pb-3 font-normal">
                  Resource
                </th>
                {actions.map((a) => (
                  <th key={a.id} scope="col" className="pb-3 text-center font-normal">
                    {a.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {resources.map((res) => (
                <tr key={res.id} className="border-t border-line">
                  <th scope="row" className="py-2.5 pr-3 font-medium">
                    {res.label}
                  </th>
                  {actions.map((a) => (
                    <td key={a.id} className="py-2.5 text-center">
                      <ScopeCell scope={permissions[role][res.id][a.id]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-xs text-subtle">
            &ldquo;Own&rdquo; means the query is filtered to records that belong to the signed-in user.
          </p>
        </div>
      </div>

      {/* Request simulator */}
      <div className="grid grid-cols-1 border-t border-line lg:grid-cols-2">
        <div className="border-b border-line p-4 sm:p-5 lg:border-r lg:border-b-0">
          <p id="request-label" className="font-mono text-[11px] uppercase tracking-widest text-subtle">
            Send a request as {current.label}
          </p>
          <div role="group" aria-labelledby="request-label" className="mt-3 flex flex-col gap-2">
            {requests.map((r) => (
              <button
                key={r.id}
                type="button"
                aria-pressed={r.id === requestId}
                onClick={() => setRequestId(r.id)}
                className={`flex min-h-11 items-center gap-3 rounded-lg border px-3 text-left font-mono text-xs transition-colors sm:text-[13px] ${
                  r.id === requestId ? "border-accent bg-accent-soft text-fg" : "border-line text-muted hover:text-fg"
                }`}
              >
                <span className="w-14 shrink-0 font-semibold">{r.method}</span>
                <span className="truncate">{r.path}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="min-w-0 p-4 sm:p-5" aria-live="polite">
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-[11px] uppercase tracking-widest text-subtle">Response</p>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-xs font-semibold ${
                status === 200 ? "bg-ok-soft text-ok" : "bg-danger-soft text-danger"
              }`}
            >
              {status === 200 ? (
                <ShieldCheck className="size-3.5" aria-hidden />
              ) : (
                <ShieldX className="size-3.5" aria-hidden />
              )}
              {statusLabel}
            </span>
          </div>
          <pre className="mt-3 overflow-x-auto rounded-lg bg-surface-2 p-3 font-mono text-xs leading-relaxed text-fg">
            <code>{responseBody}</code>
          </pre>

          <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-subtle">Route definition</p>
          <pre className="mt-2 overflow-x-auto rounded-lg bg-surface-2 p-3 font-mono text-xs leading-relaxed text-muted">
            <code>{routeDefinition}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
