import { View, StyleSheet, useWindowDimensions } from "react-native";
import { HomeBanner } from "./HomeBanner";
import { colors } from "@/src/theme/colors";
import { ROUTES } from "@/src/navigation/routes";


export function BannerList() {
    const {width} = useWindowDimensions();
    const isNarrow = width < 400;

    return (
        <View 
        style={styles.container}
        >
            <HomeBanner
                title="Desafio Ahorcado"
                description="Adivina los titulos letra por letra. ¿Cuantos puedes identificar?"
                bcolor={colors.purple}
                route={ROUTES.AHORCADO}
                sty={styles.banner}
            />
            <HomeBanner
                title="Pixel Reveal"
                description="Identifica titulos desde imagenes pixeleadas. ¡Pon a prueba tu memoria visual!"
                bcolor={colors.green}
                route={ROUTES.REVEAL}
                sty={styles.banner}
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
    banner: {
    },
})