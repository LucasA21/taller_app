import { View, StyleSheet, ScrollView } from "react-native";
import { HomeBanner } from "./HomeBanner";
import { colors } from "@/src/theme/colors";
import { ROUTES } from "@/src/navigation/routes";

export function BannerList() {
    return (
        <View style={styles.container}>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                snapToInterval={280 + 16} 
                decelerationRate="fast"
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
                <View style={{ width: 10 }} /> 
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
    },
    scrollContent: {
        paddingHorizontal: 16,
        gap: 16,
    },
    banner: {
    },
});