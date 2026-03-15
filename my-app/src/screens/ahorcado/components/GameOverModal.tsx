import { Modal, View, StyleSheet, ActivityIndicator } from "react-native";
import { AppButton } from "@/src/components/AppButton";
import { PressStartFont } from "@/src/components/PressStartFont";
import { colors } from "@/src/theme/colors";
import { useState, useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { saveScore } from "@/src/services/supabaseData";

interface GameOverModalProps {
  visible: boolean;
  onClose: () => void;
  score: number;
}

export function GameOverModal({ visible, onClose, score }: GameOverModalProps) {
  const { session } = useAuth();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (visible && score > 0 && session?.user) {
      handleSaveScore();
    }
  }, [visible]);

  const handleSaveScore = async () => {
    setSaving(true);
    const username = session?.user.email?.split('@')[0] || "Jugador";
    const success = await saveScore(username, score);
    setSaving(false);
    if (success) setSaved(true);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <PressStartFont style={styles.title}>JUEGO TERMINADO</PressStartFont>
          <PressStartFont style={styles.scoreText}>PUNTOS: {score}</PressStartFont>
          
          {saving ? (
            <ActivityIndicator size="small" color={colors.lightPurple} style={{ marginVertical: 10 }} />
          ) : saved ? (
            <PressStartFont style={styles.savedText}>¡PUNTUACIÓN GUARDADA!</PressStartFont>
          ) : null}

          <AppButton text="Cerrar" onPress={onClose} style={styles.button} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 32,
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.purple,
    minWidth: 280,
  },
  title: {
    color: colors.lightPurple,
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  scoreText: {
    color: colors.white,
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  savedText: {
    color: colors.green,
    fontSize: 10,
    marginVertical: 10,
    textAlign: "center",
  },
  button: {
    marginTop: 12,
    width: 120,
  },
}); 