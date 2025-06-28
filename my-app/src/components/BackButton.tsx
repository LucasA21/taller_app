import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AppButton } from "./AppButton";
import { ROUTES } from "@/src/navigation/routes";

export function BackButton() {
  const router = useRouter();
  return (
    <AppButton
      icon={<Ionicons name="arrow-back" size={13} color="white" />}
      text="BACK"
      onPress={() => router.push(ROUTES.HOME)}
      style={{ width: 100, height: 30 }}
    />
  );
}
