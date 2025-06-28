import { Ionicons } from "@expo/vector-icons";
import { AppButton } from "@/src/components/AppButton";

export function FilterButton() {
  return (
    <AppButton
      icon={<Ionicons name="settings-outline" size={13} color="white" />}
      text="FILTRAR"
      onPress={() => console.log("Aquí va la lógica de filtrado")}
      style={{ width: 120, height: 30 }}
    />
  );
}
