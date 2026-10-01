import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Browser tab icon: the same "UT" mark as the header logo. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fb923c",
          color: "#0b0b0c",
          fontSize: 34,
          fontWeight: 700,
          borderRadius: 14,
          letterSpacing: -2,
        }}
      >
        UT
      </div>
    ),
    size,
  );
}
