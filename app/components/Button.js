// app/components/List.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity // like a button, onPress
} from "react-native";

const Button = ({ onClick, children }) => (
  <View style={styles.button}>
    <TouchableOpacity onPressOut={onClick}>
      <Text>{children}</Text>
    </TouchableOpacity>
  </View>
);
const styles = StyleSheet.create({
  button: {
    marginRight: 10
  }
});
export default Button;
