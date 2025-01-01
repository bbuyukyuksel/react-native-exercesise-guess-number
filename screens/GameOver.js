import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

import Title from "../components/ui/Title";
import Colors from "../constants/colors";
import PrimaryButton from "../components/ui/PrimaryButton";

const GameOver = (props) => {
  const { width, height } = useWindowDimensions();

  let imageSize = width < 380 ? 150 : 300;
  imageSize = height < 480 ? 100 : imageSize;

  let imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };

  return (
    <View style={styles.root}>
      <Title>Game Over</Title>
      <View style={[styles.imageContainer, imageStyle]}>
        <Image
          style={styles.image}
          source={require("../assets/images/success.png")}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Your phone needed{" "}
          <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to
          guess the number{" "}
          <Text style={styles.highlight}>{props.userNumber}</Text>.
        </Text>
      </View>
      <PrimaryButton onPress={props.onStartNewGame}>NEW GAME</PrimaryButton>
    </View>
  );
};

export default GameOver;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    margin: 20,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    marginHorizontal: 20,
  },
  highlight: {
    color: Colors.primary500,
    fontFamily: "open-sans-bold",
  },
});
