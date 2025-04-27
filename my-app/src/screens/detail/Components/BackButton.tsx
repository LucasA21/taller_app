import {Ionicons} from "@expo/vector-icons"
import { View, StyleSheet, Pressable} from "react-native";
import { PressStartFont } from "@/src/components/PressStartFont";
import { colors } from "@/src/theme/colors";
import { useRouter } from "expo-router";
import {ROUTES} from "@/src/navigation/routes";

export function BackButton() {

    const router = useRouter(); 

    function handlePress() {
      router.push(ROUTES.HOME);   
    }

  return (
    <Pressable 
    onPress={handlePress} 
    style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}>
    <View style={styles.container}>
    <Ionicons name="arrow-back" size={13} color="white" />
      <PressStartFont style={styles.title}>BACK</PressStartFont>
    </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    gap: 1,
    alignItems: "center",
    flexDirection: "row",
    padding: 5,
    borderWidth: 1,
    backgroundColor: colors.purple,
    borderTopColor: colors.lightPurple,
    borderLeftColor: colors.lightPurple,
    borderBottomColor: colors.darkPurple,
    borderRightColor: colors.darkPurple,
    height: 30,
    width: 100,
  },
  title: {
    color: "#fff", 
    width: 100, 
    fontSize: 12, 
    textAlign: "center"
 },
});  