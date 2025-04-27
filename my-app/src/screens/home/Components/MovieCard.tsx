import { View, StyleSheet, Text, ScrollView } from "react-native";
import { ImageBackground } from "expo-image";
import { PressStartFont } from "@/src/components/PressStartFont";
import { colors } from "@/src/theme/colors";

type MovieCardProps = {
    title: string;
    image: string;
    categorys: string[]; 
}

export function MovieCard({ title, image, categorys }: MovieCardProps) {
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.image} source={image}>
            </ImageBackground>
            <PressStartFont 
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.title}>
                {title}
            </PressStartFont>
            <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
            >
                {categorys.map((category, index) => (
                    <Text key={index} style={styles.category}>
                        {category}
                    </Text>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 180,
        gap: 4,
        borderWidth: 2,
        borderTopColor: colors.lightPurple,
        borderLeftColor: colors.lightPurple,
        borderBottomColor: colors.darkPurple,
        borderRightColor: colors.darkPurple,       
    },
    image: {
        width: "100%",
        height: 220,
        overflow: "hidden",
        backgroundColor: colors.lightGray,
    },
    title: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
        alignSelf: "flex-start",
        paddingLeft: 10,
        paddingTop: 10,
    },
    categoriesContainer: {
        flexDirection: "row",
        margin: 7,
        alignSelf: "flex-start",
    },
    category: {
        backgroundColor: colors.darkGray,
        color: "#fff",
        fontSize: 9,
        padding: 5,
        margin: 2,
    },
});