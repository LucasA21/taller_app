import { Stack, useRouter, useSegments } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { AuthProvider, useAuth } from "../providers/AuthProvider";
import { View, ActivityIndicator } from "react-native";
import { colors } from "@/src/theme/colors";

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { session, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "auth";

    if (!session && !inAuthGroup) {
      // Redirect to the login page.
      router.replace("/auth");
    } else if (session && inAuthGroup) {
      // Redirect away from the login page.
      router.replace("/");
    }
  }, [session, loading, segments]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.purple} />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {

  const [loaded, error] = useFonts({
    PressStart2P_400Regular: require("../assets/fonts/PressStart2P-Regular.ttf"),
    PressStart2P_700Bold:    require("../assets/fonts/PressStart2P-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
  