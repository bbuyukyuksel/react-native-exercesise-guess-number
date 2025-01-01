import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  FlatList,
  useWindowDimensions,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Title from "../components/ui/Title";
import Number from "../components/game/Number";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, exclude) {
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;
  if (randomNumber === exclude) {
    return generateRandomBetween(min, max, exclude);
  }
  return randomNumber;
}

const [initMinBoundary, initMaxBoundary] = [1, 100];
let [minBoundary, maxBoundary] = [1, 100];

const Game = ({ userNumber, onGameOver, onUpdateRoundsNumber }) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(initMinBoundary, initMaxBoundary, userNumber),
  );
  const [guessRounds, setGuessRounds] = useState([]);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (currentGuess === userNumber) {
      onUpdateRoundsNumber(guessRounds.length);
      onGameOver();
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBoundary = initMinBoundary;
    maxBoundary = initMaxBoundary;
  }, []);

  function nextGuessHandler(direction) {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    setGuessRounds((prev) => [currentGuess, ...prev]);

    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }

    setCurrentGuess(
      generateRandomBetween(minBoundary, maxBoundary, currentGuess),
    );
  }

  let content = (
    <>
      <Card>
        <View style={styles.numberContainer}>
          <Number>{currentGuess}</Number>
        </View>
        <InstructionText>
          Is this number greater or lower than your number?
        </InstructionText>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.button}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
              <Ionicons name="add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );

  if (width > 500) {
    content = (
      <>
        <InstructionText>
          Is this number greater or lower than your number?
        </InstructionText>

        <View style={styles.buttonContainerWide}>
          <View style={styles.button}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.numberContainerWide}>
            <Number>{currentGuess}</Number>
          </View>
          <View style={styles.button}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
              <Ionicons name="add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={styles.container}>
      <Title>Oppenent's Screen</Title>
      {content}
      <View style={styles.flatListContainer}>
        <FlatList
          data={guessRounds}
          keyExtractor={(item) => item}
          renderItem={(item) => (
            <GuessLogItem
              style={styles.logText}
              key={item.index}
              roundNumber={guessRounds.length - item.index}
              number={item.item}
            ></GuessLogItem>
          )}
        />
      </View>
    </View>
  );
};
export default Game;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  buttonContainerWide: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    flex: 1,
  },
  numberContainer: {
    marginVertical: 10,
  },
  numberContainerWide: {
    flex: 1,
  },
  flatListContainer: {
    flex: 1,
    marginTop: 20,
    width: "100%",
  },
  logText: {
    fontFamily: "open-sans",
    fontSize: 12,
    color: "white",
    textAlign: "center",
  },
});
