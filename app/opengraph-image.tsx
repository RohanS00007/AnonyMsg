import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Anonymous Message - True Feedback";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        position: "relative",
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
          top: "-100px",
          right: "-100px",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
          bottom: "-50px",
          left: "-50px",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
          textAlign: "center",
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            marginBottom: 30,
            color: "#ffffff",
            letterSpacing: "-2px",
            lineHeight: 1.1,
          }}
        >
          Anonymous Message
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 600,
            marginTop: 20,
            color: "#f0f0f0",
            maxWidth: "900px",
          }}
        >
          True Feedback - Where your identity remains a secret
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 500,
            marginTop: 30,
            color: "#e0e0e0",
            opacity: 0.9,
          }}
        >
          Dive into the world of Anonymous Feedback
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
