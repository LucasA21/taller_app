import React, { useState } from "react";
import {
    TextInput,
    TextInputProps,
    StyleSheet,
    View,
    Text,
} from "react-native";
import { colors } from "@/src/theme/colors";
import { PressStartFont } from "@/src/components/PressStartFont";

type AppTextInputProps = TextInputProps & {
    error?: string;
    label?: string;
};

export function AppTextInput({ error, label, style, ...textInputProps }: AppTextInputProps) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={styles.wrapper}>
            {label && (
                <PressStartFont style={styles.label}>
                    {label}
                </PressStartFont>
            )}
            <View style={[
                styles.container,
                isFocused && styles.containerFocused,
                error && styles.containerError
            ]}>
                <TextInput
                    style={[styles.input, style]}
                    placeholderTextColor={colors.gray}
                    onFocus={(e) => {
                        setIsFocused(true);
                        textInputProps.onFocus?.(e);
                    }}
                    onBlur={(e) => {
                        setIsFocused(false);
                        textInputProps.onBlur?.(e);
                    }}
                    {...textInputProps}
                />
            </View>
            {error && (
                <PressStartFont style={styles.errorText}>
                    {error}
                </PressStartFont>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        marginBottom: 15,
    },
    label: {
        fontSize: 10,
        color: colors.white,
        marginBottom: 8,
        marginLeft: 4,
    },
    container: {
        borderWidth: 2,
        borderTopColor: colors.darkGray,
        borderLeftColor: colors.darkGray,
        borderBottomColor: colors.lightGray,
        borderRightColor: colors.lightGray,
        backgroundColor: colors.black,
    },
    containerFocused: {
        borderTopColor: colors.lightPurple,
        borderLeftColor: colors.lightPurple,
        borderBottomColor: colors.purple,
        borderRightColor: colors.purple,
    },
    containerError: {
        borderTopColor: colors.darkRed,
        borderLeftColor: colors.darkRed,
        borderBottomColor: colors.lightRed,
        borderRightColor: colors.lightRed,
    },
    input: {
        height: 48,
        paddingHorizontal: 12,
        fontFamily: 'PressStart2P_400Regular',
        fontSize: 12,
        color: colors.white,
    },
    errorText: {
        color: colors.lightRed,
        fontSize: 8,
        marginTop: 6,
        marginLeft: 4,
    }
});
