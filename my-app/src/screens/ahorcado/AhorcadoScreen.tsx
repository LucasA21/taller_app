import { useState, useEffect } from "react";
import { View, StyleSheet, Alert, ScrollView, Dimensions, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { API_URL } from "@/src/common/constants";

import { BackButton } from "@/src/components/BackButton";
import { PressStartFont } from "@/src/components/PressStartFont";
import { AppButton } from "@/src/components/AppButton";
import { GuessTitleModal } from "./components/GuessTitleModal";
import { GameOverModal } from "./components/GameOverModal";
import { CustomAlertModal } from "./components/CustomAlertModal";
import { colors } from "@/src/theme/colors";

export function AhorcadoScreen() {
  const [lives, setLives] = useState(5);
  const [score, setScore] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [gameOverVisible, setGameOverVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const { height: windowHeight } = Dimensions.get("window");
  const [contenidos, setContenidos] = useState<any[]>([]);
  const [currentContenido, setCurrentContenido] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  function showCustomAlert(title: string, message: string) {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  }

  useEffect(() => {
    async function fetchContenidos() {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/contenidos`)
        const data = await res.json();
        setContenidos(data);
        if (data.length > 0) {
          setCurrentContenido(data[Math.floor(Math.random() * data.length)]);
        }
      } catch (e) {
        Alert.alert("Error", "No se pudieron cargar los contenidos");
      } finally {
        setLoading(false);
      }
    }
    fetchContenidos();
  }, []);

  function startNewGame() {
    if (contenidos.length > 0) {
      setCurrentContenido(contenidos[Math.floor(Math.random() * contenidos.length)]);
      setLives(5);
      setScore(0);
    }
  }

  function handleCloseGameOver() {
    setGameOverVisible(false);
    startNewGame();
  }

  function handleSubmitGuess(guess: string) {
    if (!currentContenido) return;
    if (guess.toLowerCase() === currentContenido.nombre.toLowerCase()) {
      setScore((s) => s + 1);
      showCustomAlert("¡Bien hecho!", "Has acertado el título.");
      if (contenidos.length > 1) {
        let nuevo;
        do {
          nuevo = contenidos[Math.floor(Math.random() * contenidos.length)];
        } while (nuevo.id === currentContenido.id && contenidos.length > 1);
        setCurrentContenido(nuevo);
      }
    } else {
      setLives((l) => Math.max(0, l - 1));
      showCustomAlert("Fallaste", `Te quedan ${lives - 1} vidas.`);
    }
    setModalVisible(false);
  }

  useEffect(() => {
    if (lives === 0) {
      setGameOverVisible(true);
    }
  }, [lives]);

  if (loading || !currentContenido) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.lightPurple} />
      </View>
    );
  }

  const hearts = Array.from({ length: lives }).map((_, i) => (
    <Ionicons
      key={i}
      name="heart"
      size={20}
      color={colors.lightPurple}
      style={{ marginHorizontal: 2 }}
    />
  ));

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={[styles.scrollContent, { minHeight: windowHeight }]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <BackButton />
          <View style={{ flex: 1 }} />
          <View style={styles.heartsContainer}>{hearts}</View>
          <View style={{ flex: 1 }} />
          <View style={styles.scoreContainer}>
            <Ionicons name="star" size={18} color={colors.lightPurple} />
            <PressStartFont style={styles.scoreText}>{score}</PressStartFont>
          </View>
        </View>

        <View style={styles.gameContainer}>
          <View style={styles.buttonsRow}>
            <AppButton
              text="GUESS TITLE"
              onPress={() => setModalVisible(true)}
              style={styles.btn}
            />
            <AppButton
              text="GUESS LETTER"
              onPress={() => Alert.alert("No implementado aún")}
              style={styles.btn}
            />
          </View>

          <Image
            source={typeof currentContenido.imageUrl === 'string' ? { uri: currentContenido.imageUrl } : currentContenido.imageUrl}
            style={styles.image}
            contentFit="fill"
          />

          <View style={styles.placeholder}>
            <PressStartFont style={styles.placeholderText}>
              _ _ _ _ _ _ _ _
            </PressStartFont>
          </View>
        </View>

        <GuessTitleModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={handleSubmitGuess}
        />
        <CustomAlertModal
          visible={alertVisible}
          title={alertTitle}
          message={alertMessage}
          onClose={() => setAlertVisible(false)}
        />
        <GameOverModal
          visible={gameOverVisible}
          onClose={handleCloseGameOver}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 40,
    paddingHorizontal: 8,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  heartsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -40,
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  scoreText: {
    marginLeft: 6,
    fontSize: 18,
    color: colors.white,
  },

  gameContainer: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.gray, 
    padding: 16,
    borderRadius: 4,
    marginBottom: 16,
    height: "93%",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 12,
  },
  btn: {
    marginHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },

  image: {
    width: "100%",
    height: "85%",
    backgroundColor: colors.lightGray,
    marginBottom: 12,
  },

  placeholder: {
    height: 50,
    backgroundColor: colors.darkGray,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: colors.white,
    fontSize: 20,
  },
});
