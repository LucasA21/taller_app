import React from "react";
import { Modal, View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { PressStartFont } from "@/src/components/PressStartFont";
import { colors } from "@/src/theme/colors";
import { Ionicons } from "@expo/vector-icons";

interface GuessLetterModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectLetter: (letter: string) => void;
  guessedLetters: string[];
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function GuessLetterModal({ visible, onClose, onSelectLetter, guessedLetters }: GuessLetterModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" aria-modal={true}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <PressStartFont style={styles.title}>Adivina una Letra</PressStartFont>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={colors.white} />
            </TouchableOpacity>
          </View>

          <View style={styles.grid}>
            {ALPHABET.map((letter) => {
              const isGuessed = guessedLetters.includes(letter);
              return (
                <TouchableOpacity
                  key={letter}
                  style={[styles.letterBox, isGuessed && styles.disabledBox]}
                  onPress={() => onSelectLetter(letter)}
                  disabled={isGuessed}
                >
                  <PressStartFont style={[styles.letterText, isGuessed && styles.disabledText]}>
                    {letter}
                  </PressStartFont>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const { width } = Dimensions.get("window");
const boxSize = (width * 0.8) / 7 - 8; 

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "90%",
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.purple,
    borderRadius: 8,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    color: colors.white,
    fontSize: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
  },
  letterBox: {
    width: boxSize,
    height: boxSize,
    backgroundColor: colors.purple,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.lightPurple,
    borderRadius: 4,
  },
  disabledBox: {
    backgroundColor: colors.darkGray,
    borderColor: colors.gray,
  },
  letterText: {
    color: colors.white,
    fontSize: 14,
  },
  disabledText: {
    color: colors.gray,
  },
});
