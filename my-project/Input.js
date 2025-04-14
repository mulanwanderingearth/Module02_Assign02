import React from "react";
import { View, Text, TextInput } from "react-native";
import styles from "./styles";

export default function Input(props) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{props.label}</Text>
      <TextInput style={styles.input} {...props} />
    </View>
  );
}
