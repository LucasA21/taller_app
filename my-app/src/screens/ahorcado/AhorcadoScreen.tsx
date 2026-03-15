import { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";

import { GuessTitleModal } from "./components/GuessTitleModal";
import { GuessLetterModal } from "./components/GuessLetterModal";
import { GameOverModal } from "./components/GameOverModal";
import { CustomAlertModal } from "./components/CustomAlertModal";
import { GameStatusBar } from "./components/GameStatusBar";
import { GameActionButtons } from "./components/GameActionButtons";
import { GamePlaceholder } from "./components/GamePlaceholder";
import { ScanlineOverlay } from "./components/ScanlineOverlay";
import { colors } from "@/src/theme/colors";
import { fetchContenidos } from "@/src/services/supabaseData";

export function AhorcadoScreen() {
  const [lives, setLives] = useState(5);
  const [score, setScore] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [letterModalVisible, setLetterModalVisible] = useState(false);
  const [gameOverVisible, setGameOverVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const router = useRouter();
  const { height: windowHeight } = Dimensions.get("window");
  const [contenidos, setContenidos] = useState<any[]>([]);
  const [currentContenido, setCurrentContenido] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  function showCustomAlert(title: string, message: string) {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  }

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await fetchContenidos();
        setContenidos(data);
        if (data.length > 0) {
          setCurrentContenido(data[Math.floor(Math.random() * data.length)]);
        }
      } catch (e) {
        showCustomAlert("Error", "No se pudieron cargar los contenidos");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  function nextWord() {
    if (contenidos.length > 1) {
      let nuevo;
      do {
        nuevo = contenidos[Math.floor(Math.random() * contenidos.length)];
      } while (nuevo.id === currentContenido.id && contenidos.length > 1);
      setCurrentContenido(nuevo);
      setGuessedLetters([]);
    }
  }

  function startNewGame() {
    if (contenidos.length > 0) {
      setCurrentContenido(contenidos[Math.floor(Math.random() * contenidos.length)]);
      setLives(5);
      setScore(0);
      setGuessedLetters([]);
    }
  }

  function handleCloseGameOver() {
    setGameOverVisible(false);
    router.push("/games/ahorcado");
  }

  const normalize = (text: string) => 
    text.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, '');

  function checkWin(title: string, currentGuessed: string[]) {
    const normalizedTarget = title.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const lettersToGuess = [...new Set(normalizedTarget.replace(/[^A-Z]/g, "").split(""))];
    return lettersToGuess.length > 0 && lettersToGuess.every(l => currentGuessed.includes(l));
  }

  const getBlurIntensity = () => {
    if (!currentContenido) return 20;
    const normalizedTarget = currentContenido.nombre.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const lettersToGuess = [...new Set(normalizedTarget.replace(/[^A-Z]/g, "").split(""))] as string[];
    if (lettersToGuess.length === 0) return 0;
    
    const guessedCount = lettersToGuess.filter((l: string) => guessedLetters.includes(l)).length;
    const progress = guessedCount / lettersToGuess.length;
    
    return Math.max(0, 25 * (1 - progress));
  };

  function handleSubmitGuess(guess: string) {
    if (!currentContenido) return;
    
    const normalizedGuess = normalize(guess);
    const normalizedTarget = normalize(currentContenido.nombre);

    if (normalizedGuess === normalizedTarget) {
      setScore((s) => s + 1);
      showCustomAlert("¡Bien hecho!", "Has acertado el título.");
      nextWord();
    } else {
      setLives((l) => Math.max(0, l - 1));
      showCustomAlert("Fallaste", `Ese no es el título.`);
    }
    setModalVisible(false);
  }

  function handleSelectLetter(letter: string) {
    if (!currentContenido) return;
    const newGuessed = [...guessedLetters, letter];
    setGuessedLetters(newGuessed);

    const normalizedTarget = currentContenido.nombre.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    if (normalizedTarget.includes(letter)) {
      if (checkWin(currentContenido.nombre, newGuessed)) {
        setScore((s) => s + 1);
        showCustomAlert("¡Ganaste!", "Has completado el título.");
        nextWord();
      }
    } else {
      setLives((l) => Math.max(0, l - 1));
      showCustomAlert("Error", `La letra ${letter} no está.`);
    }
    setLetterModalVisible(false);
  }

  useEffect(() => {
    if (lives === 0) {
      setGameOverVisible(true);
    }
  }, [lives]);

  if (loading || !currentContenido) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.lightPurple} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { minHeight: windowHeight }]}
        showsVerticalScrollIndicator={false}
      >
        <GameStatusBar lives={lives} score={score} />

        <View style={styles.gameContainer}>
          <GameActionButtons 
            onGuessTitle={() => setModalVisible(true)}
            onGuessLetter={() => setLetterModalVisible(true)}
          />

          <View style={styles.imageWrapper}>
            <Image
              source={typeof currentContenido.imageUrl === 'string' ? { uri: currentContenido.imageUrl } : currentContenido.imageUrl}
              style={styles.image}
              contentFit="fill"
              blurRadius={getBlurIntensity()}
            />
            <ScanlineOverlay />
          </View>

          <GamePlaceholder 
            title={currentContenido.nombre} 
            guessedLetters={guessedLetters}
          />
        </View>

        <GuessTitleModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={handleSubmitGuess}
        />
        <GuessLetterModal
          visible={letterModalVisible}
          onClose={() => setLetterModalVisible(false)}
          onSelectLetter={handleSelectLetter}
          guessedLetters={guessedLetters}
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
          score={score}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-start",
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
  imageWrapper: {
    width: "100%",
    height: "70%",
    backgroundColor: colors.lightGray,
    marginBottom: 12,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.white05,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
