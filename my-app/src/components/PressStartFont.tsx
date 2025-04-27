import React from "react";
import { Text, TextProps } from "react-native";

export function PressStartFont({
    children,
    style,
    ...props
}: TextProps) {
    return (
        <Text
            {...props}
            style={[{fontFamily: "PressStart2P_400Regular"}, style]}
        >
            {children}
        </Text>
    );
}