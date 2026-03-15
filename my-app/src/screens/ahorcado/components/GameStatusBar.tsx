import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BackButton } from "@/src/components/BackButton";
import { PressStartFont } from "@/src/components/PressStartFont";
import { colors } from "@/src/theme/colors";

interface GameStatusBarProps {
  lives: number;
  score: number;
}

export function GameStatusBar({ lives, score }: GameStatusBarProps) {
  const hearts = Array.from({ length: lives }).map((_, i) => (
    <Ionicons
      key={i}
      name="heart"
      size={20}
      color={colors.lightPurple}
      style={{ marginHorizontal: 2 }}
    />
  ));

  return (
    <View style={styles.topBar}>
      <BackButton />
      <View style={{ flex: 1 }} />
      <View style={styles.heartsContainer}>{hearts}</View>
      <View style={{ flex: 1 }} />
      <View style={styles.scoreContainer}>
        <Ionicons name="star" size={18} color={colors.lightPurple} />
        <PressStartFont style={styles.scoreText}>{score}</PressStartFont>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  heartsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -40,
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  scoreText: {
    marginLeft: 6,
    fontSize: 18,
    color: colors.white,
  },
});
