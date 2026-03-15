import React from "react";
import {
    Pressable,
    View,
    StyleSheet,
    PressableProps,
    ViewStyle,
    StyleProp,
} from "react-native";

import { PressStartFont } from "@/src/components/PressStartFont";
import { colors } from "@/src/theme/colors";

type AppButtonProps = PressableProps & {
    icon?: React.ReactNode;
    text: string;
    style?: StyleProp<ViewStyle>;
    variant?: 'primary' | 'secondary';
};

export function AppButton({
    icon,
    text,
    style,
    onPress,
    variant = 'primary',
    ...pressableProps
}: AppButtonProps) {
    const isPrimary = variant === 'primary';
    const containerStyle = isPrimary ? styles.primaryContainer : styles.secondaryContainer;
    const textStyle = isPrimary ? styles.primaryText : styles.secondaryText;

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                style,
                { opacity: pressed ? 0.6 : 1 },
            ]}
            {...pressableProps}
        >
            <View style={[styles.container, containerStyle]}>
                {icon}
                <PressStartFont style={[styles.text, textStyle, { width: undefined, marginLeft: icon ? 6 : 0 }]}>
                    {text}
                </PressStartFont>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        padding: 10,
        borderWidth: 2,
    },
    primaryContainer: {
        borderTopColor: colors.lightPurple,
        borderLeftColor: colors.lightPurple,
        borderBottomColor: colors.darkPurple,
        borderRightColor: colors.darkPurple,
        backgroundColor: colors.purple,
    },
    secondaryContainer: {
        borderTopColor: colors.lightGray,
        borderLeftColor: colors.lightGray,
        borderBottomColor: colors.darkGray,
        borderRightColor: colors.darkGray,
        backgroundColor: colors.gray,
    },
    text: {
        fontSize: 12,
        textAlign: "center",
    },
    primaryText: {
        color: colors.white,
    },
    secondaryText: {
        color: colors.white,
    },
});