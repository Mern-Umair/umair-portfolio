"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { profile } from "@/data/site";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

/**
 * The site has no backend, so the form does not pretend to send anything by itself.
 * It validates the fields and then opens the visitor's own email app or WhatsApp with the
 * message already written.
 */
export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});

  const update = (field: keyof typeof values) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const next: Errors = {};
    if (!values.name.trim()) next.name = "Please add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) next.email = "Please enter a valid email address.";
    if (values.message.trim().length < 10) next.message = "A sentence or two about the role or project helps.";
    setErrors(next);
    const firstInvalid = (["name", "email", "message"] as const).find((field) => next[field]);
    if (firstInvalid) document.getElementById(`contact-${firstInvalid}`)?.focus();
    return !firstInvalid;
  };

  const text = () => `${values.message.trim()}\n\n${values.name.trim()}\n${values.email.trim()}`;

  const sendEmail = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    const subject = `Portfolio enquiry from ${values.name.trim()}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text())}`;
  };

  const sendWhatsApp = () => {
    if (!validate()) return;
    window.open(
      `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(text())}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const fieldClass =
    "mt-2 w-full rounded-lg border bg-surface-2 px-4 py-3 text-base text-fg placeholder:text-subtle focus:border-accent focus:outline-none";

  return (
    <form onSubmit={sendEmail} noValidate className="spot rounded-2xl border border-line bg-surface p-6 sm:p-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="text-sm font-medium">
            Your name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={update("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={`${fieldClass} ${errors.name ? "border-danger" : "border-line"}`}
          />
          {errors.name && (
            <p id="contact-name-error" role="alert" className="mt-1.5 text-sm text-danger">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className="text-sm font-medium">
            Your email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={values.email}
            onChange={update("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={`${fieldClass} ${errors.email ? "border-danger" : "border-line"}`}
          />
          {errors.email && (
            <p id="contact-email-error" role="alert" className="mt-1.5 text-sm text-danger">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="contact-message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={update("message")}
          placeholder="Tell me about the role or the project."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : "contact-message-help"}
          className={`${fieldClass} resize-y ${errors.message ? "border-danger" : "border-line"}`}
        />
        {errors.message ? (
          <p id="contact-message-error" role="alert" className="mt-1.5 text-sm text-danger">
            {errors.message}
          </p>
        ) : (
          <p id="contact-message-help" className="mt-1.5 text-sm text-subtle">
            This opens your email app or WhatsApp with the message ready to send.
          </p>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-accent-bg px-5 font-semibold text-accent-fg transition-opacity hover:opacity-90"
        >
          <Mail className="size-4" aria-hidden />
          Send by email
        </button>
        <button
          type="button"
          onClick={sendWhatsApp}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-line px-5 font-semibold transition-colors hover:border-subtle"
        >
          <FaWhatsapp className="size-4" aria-hidden />
          Send on WhatsApp
        </button>
      </div>
    </form>
  );
}
