"use client";

/**
 * Last resort boundary: catches failures in the root layout itself, where the
 * language provider is not available yet, so it ships self-contained styles.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" dir="ltr">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          color: "#1B3A63",
          fontFamily: "Inter, system-ui, -apple-system, Segoe UI, sans-serif",
          padding: "32px",
        }}
      >
        <div style={{ maxWidth: "30rem", textAlign: "center" }}>
          <p
            style={{
              margin: 0,
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#6E8AA6",
            }}
          >
            Tahseen Jaber Cold Storage
          </p>
          <h1
            style={{
              margin: "16px 0 0",
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "26px",
              lineHeight: 1.2,
            }}
          >
            Something interrupted this page
          </h1>
          <p style={{ margin: "14px 0 0", fontSize: "15px", lineHeight: 1.6, color: "#475569" }}>
            Reloading usually clears it. If it keeps happening, our operations desk is on
            +964 770 450 2200.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              marginTop: "26px",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              height: "44px",
              padding: "0 22px",
              borderRadius: "10px",
              border: "none",
              background: "#1B3A63",
              color: "#ffffff",
              fontSize: "13.5px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
        <p style={{ display: "none" }}>{error?.digest}</p>
      </body>
    </html>
  );
}
