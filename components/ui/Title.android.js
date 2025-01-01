import { Text, StyleSheet, Platform } from "react-native";
import colors from "../../constants/colors";

const Title = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    color: colors.accent500,
    textAlign: "center",
    padding: 16,
    borderWidth: Platform.select({ ios: 1, android: 2 }),
    borderColor: colors.accent500,
    borderRadius: 8,
    boxShadow: `0 0 4px ${colors.accent500}`,
    shadowOpacity: 1,
    maxWidth: "80%",
    width: 300,
  },
});
