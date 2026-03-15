import React from "react";
import { View, Text, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { colors } from "@/src/theme/colors";

interface EtiquetaProps {
  children: React.ReactNode;
  fontSize?: number;
  backgroundColor?: string;
  color?: string;
  paddingHorizontal?: number;
  paddingVertical?: number;
  style?: TextStyle;
  containerStyle?: ViewStyle;
}

export function Etiqueta({
  children,
  fontSize = 14,
  backgroundColor = colors.darkGray,
  color = colors.white,
  paddingHorizontal = 8,
  paddingVertical = 4,
  style = {},
  containerStyle = {},
}: EtiquetaProps) {
  return (
    <View
      style={[
        styles.etiqueta,
        {
          backgroundColor,
          paddingHorizontal,
          paddingVertical,
        },
        containerStyle,
      ]}
    >
      <Text
        style={[
          { color, fontSize, fontWeight: "bold", textAlign: "center" },
          style,
        ]}
      >
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  etiqueta: {
    marginRight: 4,
    marginBottom: 4,
    alignSelf: "flex-start",
  },
}); 