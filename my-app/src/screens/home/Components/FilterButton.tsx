import {Ionicons} from "@expo/vector-icons"
import { View, StyleSheet, Pressable} from "react-native";
import { PressStartFont } from "@/src/components/PressStartFont";
import { colors } from "@/src/theme/colors";

export function FilterButton() {

  function handlePress() {
    console.log("Aca va despues la logica de filtrado");
  }  

  return (
    <Pressable 
    onPress={handlePress} 
    style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}>
    <View style={styles.container}>
      <Ionicons name="settings-outline" size={13} color="white" /> 
      <PressStartFont style={styles.title}>FILTRAR</PressStartFont>
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

  },
  title: {
    color: "#fff", 
    width: 100, 
    fontSize: 12, 
    textAlign: "center"
 },
});  