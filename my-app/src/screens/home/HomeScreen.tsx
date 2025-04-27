import { View, StyleSheet } from "react-native";
import { HomeHeader}  from "./Components/HomeHeader";
import { BannerList } from "./Components/BannerList";
import { colors } from "@/src/theme/colors";
import { SectionList } from "./Components/SectionList";

export function HomeScreen() {
    return (
        <View style={styles.container}>
        <HomeHeader />
        <BannerList />
        <SectionList/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { backgroundColor: colors.background, flex: 1 },
})