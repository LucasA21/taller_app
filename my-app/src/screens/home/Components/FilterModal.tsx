import { useState } from "react";
import {
  Modal,
  View,
  ScrollView,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";
import Checkbox from "expo-checkbox";
import { PressStartFont } from "@/src/components/PressStartFont";
import { AppButton } from "@/src/components/AppButton";
import { colors } from "@/src/theme/colors";
import { tiposContenidoAudiovisual } from "@/src/data/tiposContenidoAudiovisual";
import { generosContenidoAudiovisual } from "@/src/data/generosContenidoAudiovisual";

interface FilterModalProps {
  visible: boolean;
  onCancel: () => void;
  onApply: (selectedTypes: number[], selectedGenres: number[]) => void;
}

export function FilterModal({ visible, onCancel, onApply }: FilterModalProps) {
  const [types, setTypes] = useState<number[]>([]);
  const [genres, setGenres] = useState<number[]>([]);

  const toggleType = (id: number) =>
    setTypes((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  const toggleGenre = (id: number) =>
    setGenres((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable style={styles.backdrop} onPress={onCancel}>
        <Pressable style={styles.modal} onPress={(e) => e.stopPropagation()}>
          <PressStartFont style={styles.title}>Filter Content</PressStartFont>

          <PressStartFont style={styles.sectionTitle}>
            Content Types
          </PressStartFont>
          <View style={styles.typesContainer}>
            {tiposContenidoAudiovisual.map((t) => {
              const selected = types.includes(t.id);
              return (
                <View key={t.id} style={styles.rowItem}>
                  <Checkbox
                    value={selected}
                    onValueChange={() => toggleType(t.id)}
                    color={selected ? colors.lightPurple : colors.darkGray}
                    style={styles.checkbox}
                  />
                  <Text style={styles.checkboxLabel}>{t.singular}</Text>
                </View>
              );
            })}
          </View>

          <PressStartFont style={styles.sectionTitle}>Genres</PressStartFont>
          <ScrollView style={styles.genreScroll}>
            <View style={styles.genresContainer}>
              {generosContenidoAudiovisual.map((g) => {
                const selected = genres.includes(g.id);
                return (
                  <View key={g.id} style={styles.genreItem}>
                    <Checkbox
                      value={selected}
                      onValueChange={() => toggleGenre(g.id)}
                      color={selected ? colors.lightPurple : colors.darkGray}
                      style={styles.checkbox}
                      
                    />
                    <Text style={styles.checkboxLabel}>{g.nombre}</Text>
                  </View>
                );
              })}
            </View>
          </ScrollView>

          <View style={styles.buttonsRow}>
            <AppButton
              text="CANCEL"
              onPress={onCancel}
              style={[styles.button, styles.cancelButton]}
            />
            <AppButton
              text="APPLY"
              onPress={() => onApply(types, genres)}
              style={[styles.button, styles.applyButton]}
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const { height: H } = Dimensions.get("window");

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "90%",
    maxWidth: 400,
    height: "60%",
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.lightPurple,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 12,
    textAlign: "center",
    color: "#fff",
  },
  sectionTitle: {
    fontSize: 16,
    color: colors.green,
    marginTop: 12,
    marginBottom: 6,
  },
  typesContainer: {
    flexDirection: "column",
  },
  genreScroll: {
    maxHeight: H * 0.4,
    marginBottom: 8,
  },
  genresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  rowItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  genreItem: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  checkbox: {
    marginRight: 6,
  },
  checkboxLabel: {
    color: "#fff",
    fontSize: 18,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
    gap: 12,
  },
  button: {
    
  },
  cancelButton: {
    backgroundColor: colors.darkGray,
  },
  applyButton: {
    backgroundColor: colors.green,
  },
});
