import { Pressable,Text,StyleSheet } from "react-native";
import { PressStartFont } from "@/src/components/PressStartFont";
import { colors } from "@/src/theme/colors";


type BannerProps = {
    title: string;
    description: string;
    bcolor: string;
}

function handleBanner() {
    console.log("Aca va logica del banner");
}

export function HomeBanner({title,description,bcolor}: BannerProps) {
   return (
    <Pressable
        onPress={handleBanner}
        style={({ pressed }) => [style.container,{backgroundColor: bcolor}, { opacity: pressed ? 0.5 : 1 }]}
    >
        <PressStartFont style = {style.title}>
            {title}
        </PressStartFont>
        <Text style = {style.description} >{description}</Text>
        <PressStartFont style = {style.jugar}>Jugar</PressStartFont>

    </Pressable>
   )
};

const style = StyleSheet.create({
    container: {
        padding: 10,
        borderWidth: 4,
        borderColor: colors.darkPurple,
        flex: 1,
        gap: 12,
    },
    title: {
        color: "#fff",
        fontSize: 36,
        fontWeight: "bold",
        textAlign: "left",

    },
    description: {
        color: "#fff",
        fontSize: 20,
        textAlign: "left",
        marginTop: 8,
    },
    jugar: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
        textAlign: "right",
        marginTop: "auto",
    },


})