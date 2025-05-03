import { Pressable,Text,StyleSheet,ViewStyle } from "react-native";
import { PressStartFont } from "@/src/components/PressStartFont";
import { colors } from "@/src/theme/colors";
import { Href , useRouter} from "expo-router";

type BannerProps = {
    title: string;
    description: string;
    bcolor: string;
    route: Href;
    sty?: ViewStyle;
}

export function HomeBanner({title,description,bcolor,route,sty}: BannerProps) {
    
    const router = useRouter();

    function handleBanner() {
        router.push(route);
    }
   return (
    <Pressable
        onPress={handleBanner}
        style={({ pressed }) => [style.container,sty,{backgroundColor: bcolor}, { opacity: pressed ? 0.5 : 1 }]}
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
        fontWeight: "bold",
        color: "#fff",
        fontSize: 26,
        textAlign: "left",
    },
    description: {
        color: "#fff",
        fontSize: 18,
        textAlign: "left",
        marginTop: 8,
    },
    jugar: {
        fontWeight: "bold",
        color: "#fff",
        fontSize: 12,
        textAlign: "right",
        marginTop: "auto",
    },


})