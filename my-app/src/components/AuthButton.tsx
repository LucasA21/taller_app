import { Ionicons } from "@expo/vector-icons";
import { AppButton } from "@/src/components/AppButton";
import { ViewStyle } from "react-native";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/lib/supabase";

type AuthButtonProps = {
  onPress: () => void;
  style?: ViewStyle;
}

export function AuthButton({onPress, style}: AuthButtonProps) {
  const { session } = useAuth();

  const handlePress = () => {
    if (session) {
      supabase.auth.signOut();
    } else {
      onPress();
    }
  };
  return (
    <AppButton
      icon={<Ionicons name={session ? "log-out-outline" : "person-circle-outline"} size={13} color="white" />}
      text={session ? "SALIR" : "INICIAR"}
      onPress={handlePress}
      style={[{ paddingHorizontal: 10, paddingVertical: 4 }, style]}
    />
  );
}
