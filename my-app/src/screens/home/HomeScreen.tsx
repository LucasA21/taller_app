import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeHeader}  from "./Components/HomeHeader";
import { BannerList } from "./Components/BannerList";
import { colors } from "@/src/theme/colors";
import { SectionList } from "./Components/SectionList";


export function HomeScreen() {
    return (
        <SafeAreaView style={styles.container}>
        <HomeHeader />
        <BannerList />
        <SectionList/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { backgroundColor: colors.background, flex: 1 },
})