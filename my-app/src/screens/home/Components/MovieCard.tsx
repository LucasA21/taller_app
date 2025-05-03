import { View, StyleSheet, Text, ScrollView} from "react-native";
import { Image } from "expo-image";
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
            <Image 
                source={{uri: image}} 
                style={styles.image}
                contentFit="contain"
            />
            <View style={styles.info}>
            <PressStartFont 
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.title}>
                    {title}
            </PressStartFont>
            <View style={styles.categoriesContainer}>
                {categorys.map((category, index) => (
                    <Text key={index} style={styles.category}>
                        {category}
                    </Text>
                ))}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 180,
        height: 290,
        marginRight: 10,
        borderWidth: 2,
        overflow: "hidden",
        borderTopColor: colors.lightPurple,
        borderLeftColor: colors.lightPurple,
        borderBottomColor: colors.darkPurple,
        borderRightColor: colors.darkPurple,       
    },
    image: {
        width: "100%",
        height: 220,
        backgroundColor: colors.lightGray,
    },
    title: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
        alignSelf: "flex-start",
        paddingLeft: 7,
        paddingTop: 10,
    },
    categoriesContainer: {
        flexDirection: "row",
        alignSelf: "flex-start",
    },
    category: {
        backgroundColor: colors.darkGray,
        color: "#fff",
        fontSize: 9,
        padding: 5,
        margin: 2,
    },
    info: {
        flex: 1,
        paddingHorizontal: 8,
        paddingVertical: 6,
        justifyContent: "space-between",
        }
});