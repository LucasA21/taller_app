import { Modal, View, StyleSheet } from "react-native";
import { AppButton } from "@/src/components/AppButton";
import { PressStartFont } from "@/src/components/PressStartFont";
import { colors } from "@/src/theme/colors";

interface GameOverModalProps {
  visible: boolean;
  onClose: () => void;
}

export function GameOverModal({ visible, onClose }: GameOverModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <PressStartFont style={styles.title}>GAME OVER</PressStartFont>
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
  },
  title: {
    color: colors.lightPurple,
    fontSize: 24,
    marginBottom: 24,
    textAlign: "center",
  },
  button: {
    marginTop: 12,
    width: 120,
  },
}); 