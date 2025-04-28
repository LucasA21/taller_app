import { View, StyleSheet } from "react-native";
import { PressStartFont } from "@/src/components/PressStartFont";
import { colors } from "@/src/theme/colors";
import { BackButton } from "@/src/components/BackButton";

export function RevealScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
            <BackButton />
            </View>
            <PressStartFont style={styles.title}>
                Reveal Screen
            </PressStartFont>
        </View>    
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        flex: 1,
        justifyContent: "center",
    },
    title: {
        color: colors.green,
        fontSize: 35,
        fontWeight: "bold",
        textAlign: "center",
    },
    buttonContainer: {
        position: "absolute",
        top: 50,
        left: 20,
    }

})
