import React from "react";
import { View, StyleSheet } from "react-native";
import { PressStartFont } from "@/src/components/PressStartFont";
import { colors } from "@/src/theme/colors";

interface GamePlaceholderProps {
  title: string;
  guessedLetters: string[];
}

export function GamePlaceholder({ title, guessedLetters }: GamePlaceholderProps) {
  const words = title.split(" ");
  
  const normalizeChar = (char: string) => {
    return char.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
  };

  return (
    <View style={styles.placeholderArea}>
      <View style={styles.placeholderContainer}>
        {words.map((word, wIndex) => (
          <View key={wIndex} style={styles.wordWrapper}>
            <PressStartFont style={styles.placeholderText}>
              {word.split("").map((char) => {
                const normalizedChar = normalizeChar(char);
                const isLetter = /[A-Z]/.test(normalizedChar);
                return isGuessedLetter(normalizedChar, guessedLetters) || !isLetter ? char : "_";
              }).join(" ")}
            </PressStartFont>
          </View>
        ))}
      </View>
    </View>
  );
}

function isGuessedLetter(char: string, guessed: string[]) {
  return guessed.includes(char);
}

const styles = StyleSheet.create({
  placeholderArea: {
    minHeight: 100,
    backgroundColor: colors.darkGray,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderRadius: 4,
  },
  placeholderContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 40,
    rowGap: 24,
  },
  wordWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  placeholderText: {
    color: colors.white,
    fontSize: 18,
    textAlign: "center",
    lineHeight: 24,
  },
});
