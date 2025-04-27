import { View,Text,StyleSheet,ScrollView } from "react-native";
import { PressStartFont } from "@/src/components/PressStartFont";
import { colors } from "@/src/theme/colors";
import { ImageBackground } from "expo-image";



type MovieInfoProps = {
    image: string;
    title: string;
    categorys: string[];
    description: string;
}

export function MovieInfo({
    image,title,categorys,description
}: MovieInfoProps){
    return (
        <View style={styles.container}>
            <ImageBackground source={image} style={styles.poster}></ImageBackground>
            <PressStartFont style={styles.title}>{title}</PressStartFont>
            <Text style={styles.descripcion}>{description}</Text>
            <PressStartFont style={styles.genero}>Generos</PressStartFont>
            <View style={styles.categoriasContainer}>
            {categorys.map((category, index) => (
                <Text key={index} style={styles.categorias}>
                    {category}
                </Text>
            ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    poster: {
        width: "100%",
        height: 360,
        marginBottom: 40,
    },
    title: {
        color: colors.purple,
        fontSize: 20,
        marginBottom: 10,
    },
    descripcion: {
        color: "#fff"
    },
    genero: {
        fontSize: 14,
        marginTop: 20,
        color: colors.green,
    },
    categoriasContainer: {
        flexDirection: "row",
        marginTop: 7,
        alignSelf: "flex-start",
        gap: 10,
    },
    categorias: {
        backgroundColor: colors.darkGray,
        color: "#fff",
        fontSize: 14,
        padding: 5,
        margin: 2,
    },

});