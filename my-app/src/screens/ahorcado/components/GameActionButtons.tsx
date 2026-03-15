import React from "react";
import { View, StyleSheet } from "react-native";
import { AppButton } from "@/src/components/AppButton";

interface GameActionButtonsProps {
  onGuessTitle: () => void;
  onGuessLetter: () => void;
}

export function GameActionButtons({ onGuessTitle, onGuessLetter }: GameActionButtonsProps) {
  return (
    <View style={styles.buttonsRow}>
      <AppButton
        text="ADIVINAR TÍTULO"
        onPress={onGuessTitle}
        style={styles.btn}
      />
      <AppButton
        text="ADIVINAR LETRA"
        onPress={onGuessLetter}
        style={styles.btn}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    gap: 8,
  },
  btn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
});
