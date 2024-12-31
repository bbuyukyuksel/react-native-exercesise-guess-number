import { Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

const InstructionText = (props) => {
  return (
    <Text style={{ ...styles.text, ...props.style }}>{props.children}</Text>
  );
};

export default InstructionText;

const styles = StyleSheet.create({
  text: {
    fontFamily: "open-sans",
    fontSize: 14,
    color: Colors.accent500,
    textAlign: "center",
    marginVertical: 8,
  },
});
