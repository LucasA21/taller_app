import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AppButton } from "./AppButton";
import { ROUTES } from "@/src/navigation/routes";

export function BackButton() {
  const router = useRouter();
  return (
    <AppButton
      icon={<Ionicons name="arrow-back" size={10} color="white" />}
      text="VOLVER"
      onPress={() => router.push(ROUTES.HOME)}
      style={{ alignSelf: 'flex-start' }}
    />
  );
}
