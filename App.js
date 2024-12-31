import { useState, useEffect, useCallback } from "react";
import * as Font from "expo-font";

import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import StartGame from "./screens/StartGame";
import Game from "./screens/Game";
import GameOver from "./screens/GameOver";
import Colors from "./constants/colors";
import * as SplashScreen from "expo-splash-screen";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [userNumber, setUserNumber] = useState();
  const [roundsNumber, setRoundsNumber] = useState(0);

  const pickedNumberHandler = (number) => {
    setUserNumber(number);
    setIsGameOver(false);
  };

  const gameOverHandler = () => {
    setIsGameOver((prev) => !prev);
  };

  const onStartNewGame = () => {
    setIsGameOver(false);
    setUserNumber(null);
    setRoundsNumber(0);
  };

  const roundsNumberHandler = (number) => {
    setRoundsNumber(number);
  };

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
          "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        SplashScreen.hide();
      }
    }
    prepare();
  }, []);

  let screen = <StartGame onPickedNumber={pickedNumberHandler} />;

  if (userNumber) {
    screen = (
      <Game
        userNumber={userNumber}
        onUpdateRoundsNumber={roundsNumberHandler}
        onGameOver={gameOverHandler}
      />
    );
  }

  if (isGameOver && userNumber) {
    screen = (
      <GameOver
        userNumber={userNumber}
        onStartNewGame={onStartNewGame}
        roundsNumber={roundsNumber}
      />
    );
  }

  return (
    <>
      <LinearGradient
        style={styles.root}
        colors={[Colors.primary700, Colors.accent500]}
      >
        <ImageBackground
          source={require("./assets/images/background.png")}
          resizeMode="cover"
          style={styles.root}
          imageStyle={styles.backgroundImage}
          blurRadius={7}
        >
          <SafeAreaView style={styles.container}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
