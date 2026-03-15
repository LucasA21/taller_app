import { StyleSheet, View } from "react-native";
import { PressStartFont } from "@/src/components/PressStartFont";
import { colors } from "@/src/theme/colors";
import { FilterButton } from "./FilterButton";
import { AuthButton } from "@/src/components/AuthButton";
import { router } from "expo-router";

type HomeHeaderProps = {
    onFilterPress: () => void;
}

export function HomeHeader({onFilterPress}: HomeHeaderProps) {

    return (
        <View style={styles.container}>
        <PressStartFont style = {styles.title}>Pixdex</PressStartFont>
        <View style={{ flexDirection: 'row', gap: 4 }}>
          <FilterButton onPress={onFilterPress}/>
          <AuthButton onPress={() => router.push('/auth')}/>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 16,
        paddingHorizontal:8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: { 
        fontSize: 24,
        fontWeight: "bold",
        color: colors.purple
    }
});


