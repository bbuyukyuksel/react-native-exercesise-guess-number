import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

const Number = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{children}</Text>
    </View>
  );
};

export default Number;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.accent500,
    padding: 10,
    // marginHorizontal: "35%",
    borderRadius: 10,
    // marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    fonsFamily: "open-sans-bold",
    color: Colors.accent500,
    fontSize: 32,
  },
});
