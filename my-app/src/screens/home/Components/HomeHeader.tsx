import { StyleSheet, View } from "react-native";
import { PressStartFont } from "@/src/components/PressStartFont";
import { colors } from "@/src/theme/colors";
import { FilterButton } from "./FilterButton";

export function HomeHeader() {

    return (
        <View style={styles.container}>
        <PressStartFont style = {styles.title}>Pixdex</PressStartFont>
        <FilterButton />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 16,
        paddingHorizontal:8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    title: { 
        fontSize: 24,
        fontWeight: "bold",
        color: colors.purple
    }
});


