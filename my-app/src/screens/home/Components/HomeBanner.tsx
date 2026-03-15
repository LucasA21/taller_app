import { Pressable, Text, StyleSheet, ViewStyle, View } from "react-native";
import { PressStartFont } from "@/src/components/PressStartFont";
import { colors } from "@/src/theme/colors";
import { Href, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type BannerProps = {
    title: string;
    description: string;
    bcolor: string;
    route: Href;
    sty?: ViewStyle;
}

export function HomeBanner({ title, description, bcolor, route, sty }: BannerProps) {
    const router = useRouter();

    function handleBanner() {
        router.push(route);
    }

    return (
        <Pressable
            onPress={handleBanner}
            style={({ pressed }) => [
                styles.container,
                { backgroundColor: bcolor, transform: [{ scale: pressed ? 0.98 : 1 }] },
                sty
            ]}
        >
            <View style={styles.content}>
                <View style={styles.header}>
                    <PressStartFont style={styles.title} numberOfLines={2}>
                        {title}
                    </PressStartFont>
                    <Ionicons name="game-controller-outline" size={24} color={colors.white70} />
                </View>
                
                <Text style={styles.description} numberOfLines={3}>
                    {description}
                </Text>

                <View style={styles.footer}>
                    <View style={styles.actionButton}>
                        <PressStartFont style={styles.jugar}>JUGAR</PressStartFont>
                        <Ionicons name="play-circle-outline" size={14} color={colors.white} />
                    </View>
                </View>
            </View>
            
            <View style={[styles.patternOverlay, { backgroundColor: colors.white05 }]} pointerEvents="none" />
        </Pressable>
    )
};

const styles = StyleSheet.create({
    container: {
        width: 280,
        height: 160,
        borderWidth: 4,
        borderColor: colors.white20,
        overflow: 'hidden',
        position: 'relative',
        elevation: 5,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
    },
    content: {
        flex: 1,
        padding: 16,
        justifyContent: 'space-between',
        zIndex: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    title: {
        color: colors.white,
        fontSize: 14,
        flex: 1,
        marginRight: 8,
        lineHeight: 18,
        textShadowColor: colors.black50,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    description: {
        color: colors.white90,
        fontSize: 11,
        lineHeight: 16,
        marginTop: 8,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.black30,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: colors.white30,
        gap: 6,
    },
    jugar: {
        color: colors.white,
        fontSize: 10,
    },
    patternOverlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1,
    }
});