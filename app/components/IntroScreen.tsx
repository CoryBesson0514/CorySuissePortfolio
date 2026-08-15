"use client";

export default function IntroScreen() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        background: "red",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "60px",
        fontWeight: "bold",
      }}
    >
      INTRO TEST
    </div>
  );
}
