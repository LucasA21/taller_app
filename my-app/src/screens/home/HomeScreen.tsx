import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeHeader}  from "./Components/HomeHeader";
import { colors } from "@/src/theme/colors";
import { SectionListFetch } from "./Components/SectionList";
import { useState } from "react";
import { FilterModal } from "./Components/FilterModal";


export function HomeScreen() {

    const [filterVisible, setFilterVisible] = useState(false);
    const [selectedTypes, setSelectedTypes] = useState<number[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

    return (
        <SafeAreaView style={styles.container}>
        <HomeHeader onFilterPress={() => setFilterVisible(true)}/>
        <FilterModal
        visible={filterVisible}
        onCancel={() => setFilterVisible(false)}
        onApply={(types, genres) => {
          setSelectedTypes(types);
          setSelectedGenres(genres);
          setFilterVisible(false);
        }}
      />
        <SectionListFetch selectedTypes={selectedTypes} selectedGenres={selectedGenres}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { backgroundColor: colors.background, flex: 1 },
})