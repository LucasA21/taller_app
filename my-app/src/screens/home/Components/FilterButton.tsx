import { Ionicons } from "@expo/vector-icons";
import { AppButton } from "@/src/components/AppButton";
import { ViewStyle } from "react-native";

type FilterButtonProps = {
  onPress: () => void;
  style?: ViewStyle;
}


export function FilterButton({onPress}: FilterButtonProps) {
  return (
    <AppButton
      icon={<Ionicons name="settings-outline" size={13} color="white" />}
      text="FILTRAR"
      onPress={onPress}
      style={{ width: 160, height: 30,}}
    />
  );
}
