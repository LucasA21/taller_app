import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { PressStartFont } from "@/src/components/PressStartFont";
import { AppButton } from "@/src/components/AppButton";
import { BackButton } from "@/src/components/BackButton";
import { colors } from "@/src/theme/colors";
import { fetchLeaderboard, subscribeToLeaderboard, ILeaderboardEntry } from "@/src/services/supabaseData";

export function LeaderboardScreen() {
    const [scores, setScores] = useState<ILeaderboardEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const loadScores = async () => {
        const data = await fetchLeaderboard();
        setScores(data.slice(0, 10));
        setLoading(false);
    };

    useEffect(() => {
        loadScores();
        
        const unsubscribe = subscribeToLeaderboard(() => {
            loadScores();
        });

        return () => unsubscribe();
    }, []);

    const handleStartGame = () => {
        router.push("/games/ahorcado/play");
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <BackButton />
            </View>

            <View style={styles.content}>
                <PressStartFont style={styles.title}>Desafío Ahorcado</PressStartFont>
                
                <AppButton 
                    text="INICIAR JUEGO" 
                    onPress={handleStartGame}
                    style={styles.startButton}
                    variant="primary"
                />

                <View style={styles.leaderboardContainer}>
                    <PressStartFont style={styles.leaderboardTitle}>Mejores Jugadores</PressStartFont>
                    
                    <View style={styles.scoresBox}>
                        {loading ? (
                            <ActivityIndicator size="large" color={colors.lightPurple} />
                        ) : scores.length === 0 ? (
                            <PressStartFont style={styles.emptyText}>Sin puntuaciones aún</PressStartFont>
                        ) : (
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {scores.map((entry, index) => (
                                    <View key={entry.id} style={styles.scoreRow}>
                                        <View style={styles.rankPlayer}>
                                            <PressStartFont style={styles.rankText}>
                                                {index + 1}. {entry.username}
                                            </PressStartFont>
                                        </View>
                                        <PressStartFont style={styles.scoreValue}>
                                            {entry.score}
                                        </PressStartFont>
                                    </View>
                                ))}
                            </ScrollView>
                        )}
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    header: {
        marginBottom: 20,
        alignItems: 'flex-start',
    },
    content: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        color: colors.lightPurple,
        textAlign: 'center',
        marginBottom: 30,
    },
    startButton: {
        width: 220,
        marginBottom: 40,
    },
    leaderboardContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    leaderboardTitle: {
        fontSize: 16,
        color: colors.green,
        marginBottom: 20,
    },
    scoresBox: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.darkGray,
        borderWidth: 1,
        borderColor: colors.gray,
        padding: 20,
        borderRadius: 4,
        maxHeight: 400,
    },
    scoreRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.white05,
    },
    rankPlayer: {
        flex: 1,
    },
    rankText: {
        fontSize: 12,
        color: colors.white,
    },
    scoreValue: {
        fontSize: 14,
        color: colors.green,
    },
    emptyText: {
        fontSize: 10,
        color: colors.gray,
        textAlign: 'center',
        marginTop: 20,
    }
});
