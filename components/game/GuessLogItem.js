import { Text, View, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

const GuessLogItem = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        #{props.roundNumber.toString().padStart(3, " ")}
      </Text>
      <Text style={styles.text}>
        Opponent's Guess: {props.number.toString().padStart(3, " ")}
      </Text>
    </View>
  );
};

export default GuessLogItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 5,
    borderWidth: 2,
    opacity: 0.65,
    backgroundColor: Colors.primary700,
    borderColor: Colors.primary800,
    borderRadius: 5,
  },
  text: {
    color: Colors.accent500,
    fontFamily: "open-sans",
  },
});
