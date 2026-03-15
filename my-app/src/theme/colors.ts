export const colors = {

    background: "#1a1f2c",
    purple: "#6e59a5",
    darkPurple: "#4a3d70",
    lightPurple: "#9b87f5",
    green: "#5fd068",
    darkGreen: "#3a8041",
    lightGreen: "#a8e1b0",
    gray: "#8e9196",
    darkGray: "#403e43",
    lightGray: "#f6f6f7",
    red: "#ea384c",
    darkRed: "#b8212f",
    lightRed: "#f5a3b7",
    blue: "#33c3f0",
    darkBlue: "#1eaedb",
    white: "#ffffff",
    black: "#000000",
    transparent: "transparent",

    // Functional & Transparent tokens
    white70: "rgba(255, 255, 255, 0.7)",
    white90: "rgba(255, 255, 255, 0.9)",
    white20: "rgba(255, 255, 255, 0.2)",
    white05: "rgba(255, 255, 255, 0.05)",
    white30: "rgba(255, 255, 255, 0.3)",
    black30: "rgba(0, 0, 0, 0.3)",
    black50: "rgba(0, 0, 0, 0.5)",
    errorOverlay: "rgba(234, 56, 76, 0.2)",
    successOverlay: "rgba(95, 208, 104, 0.2)",

} as const;

export type Color = typeof colors[keyof typeof colors];