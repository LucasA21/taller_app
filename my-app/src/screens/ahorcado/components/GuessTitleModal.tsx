import { useState } from "react";
import {
  Modal,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { PressStartFont } from "@/src/components/PressStartFont"
import { AppButton } from "@/src/components/AppButton";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/src/theme/colors";

type GuessTitleModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (guess: string) => void;
};

export function GuessTitleModal({
  visible,
  onClose,
  onSubmit,
}: GuessTitleModalProps) {
  const [text, setText] = useState("");

  function handlePressSubmit() {
    if (!text.trim()) {
      Alert.alert("Escribe algo antes de enviar");
      return;
    }
    onSubmit(text.trim());
    setText("");
  }

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.backdrop}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <PressStartFont style={styles.title}>Guess the Title</PressStartFont>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={20} color="#fff" />
            </Pressable>
          </View>

          <TextInput
            placeholder="Enter complete title"
            placeholderTextColor="#888"
            value={text}
            onChangeText={setText}
            style={styles.input}
          />

          <View style={styles.buttonsRow}>
            <AppButton
              text="SUBMIT GUESS"
              onPress={handlePressSubmit}
              style={styles.submitButton}
            />
            <AppButton
              text="CERRAR"
              onPress={onClose}
              style={styles.closeButtonApp}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "95%",
    maxWidth: 470,
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 32,
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.purple,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
    width: "100%",
  },
  title: {
    fontSize: 22,
    color: colors.lightPurple,
    textAlign: "center",
    flex: 1,
  },
  closeButton: {
    marginLeft: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.lightPurple,
    paddingHorizontal: 8,
    paddingVertical: 8,
    color: "#fff",
    marginBottom: 24,
    width: "100%",
    fontSize: 16,
    borderRadius: 4,
    backgroundColor: colors.darkGray,
  },
  submitButton: {
    width: 190,
  },
  closeButtonApp: {
    width: 120,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    marginTop: 0,
    marginBottom: 0,
  },
});
