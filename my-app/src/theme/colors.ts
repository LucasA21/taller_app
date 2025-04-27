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
    

} as const;

export type Color = typeof colors[keyof typeof colors];