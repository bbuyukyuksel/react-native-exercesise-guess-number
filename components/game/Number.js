import { View, Text, StyleSheet, Dimensions } from "react-native";
import Colors from "../../constants/colors";

const Number = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{children}</Text>
    </View>
  );
};

export default Number;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.accent500,
    padding: deviceWidth < 380 ? 12 : 16,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    fonsFamily: "open-sans-bold",
    color: Colors.accent500,
    fontSize: deviceWidth < 380 ? 16 : 24,
  },
});
