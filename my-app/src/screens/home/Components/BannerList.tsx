import { View, StyleSheet } from "react-native";
import { HomeBanner } from "./HomeBanner";
import { colors } from "@/src/theme/colors";


export function BannerList() {

    return (
        <View style={styles.container}>
            <HomeBanner
                title="Desafio del Ahorcado"
                description="Adivina los titulos letra por letra. ¿Cuantos puedes identificar?"
                bcolor={colors.purple}
            />
            <HomeBanner
                title="Pixel Reveal"
                description="Identifica titulos desde imagenes pixeleadas. ¡Pon a prueba tu memoria visual!"
                bcolor={colors.green}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 10,
        gap: 16,
    },

})