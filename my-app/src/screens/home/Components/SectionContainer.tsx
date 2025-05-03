import { MovieCard } from "./MovieCard";
import { View, StyleSheet, FlatList, Pressable } from "react-native";
import { colors } from "@/src/theme/colors";
import { PressStartFont } from "@/src/components/PressStartFont";
import { Link } from "expo-router";
import { ROUTES } from "@/src/navigation/routes";

type sectionProps = {
    sectionTitle: string;
    item: any[];
}

export function SectionContainer({ sectionTitle, item }: sectionProps) {

    return (
        <View style={styles.container}>
            <PressStartFont style={styles.sectionTitle}>
                {sectionTitle}
            </PressStartFont>
            <FlatList
            data={item}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
            renderItem={({ item }) => (
                <Link
                href={{
                    pathname: ROUTES.DETAIL,
                    params: { slug: encodeURIComponent(item.title) },
                }}
                asChild
                >
                   <Pressable style={styles.pressable}>
                        <MovieCard {...item}/>
                    </Pressable>
                </Link>
            )}
            keyExtractor={(item) => item.title}
            contentContainerStyle={styles.sectionContainer}
            >
            </FlatList>
        </View>    
    );
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        paddingTop: 20,
        paddingHorizontal: 10,
        margin:10,
        borderWidth: 4,
        borderColor: colors.darkGray
    },
    sectionTitle: {
        position: "absolute",
        top: -10,
        left: 16,
        paddingHorizontal: 8,
        paddingVertical: 2,
        zIndex: 1,
        backgroundColor: colors.purple,
        borderWidth: 2,
        borderColor: colors.lightPurple,
        fontSize: 12,
        fontWeight: "bold",
        color: "#fff",
    },
    sectionContainer: {
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    pressable: {
        flexShrink: 0,
      },
});