import { Ionicons } from "@expo/vector-icons";
import { AppButton } from "@/src/components/AppButton";
import { ViewStyle } from "react-native";

type FilterButtonProps = {
  onPress: () => void;
  style?: ViewStyle;
}


export function FilterButton({onPress, style}: FilterButtonProps) {
  return (
    <AppButton
      icon={<Ionicons name="settings-outline" size={13} color="white" />}
      text="FILTRAR"
      onPress={onPress}
      style={[{ paddingHorizontal: 10, paddingVertical: 4 }, style]}
    />
  );
}
