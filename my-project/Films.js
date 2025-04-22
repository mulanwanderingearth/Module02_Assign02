import React, { useState, useEffect } from "react";
import { View, Text, Modal, Button, TextInput, ScrollView } from "react-native";
import styles from "./styles";
import Swipeable from "./Swipeable";
import Animated, { FadeInDown } from 'react-native-reanimated';

function mapItems(items) {
  return items.map((item) => ({
    id: item.uid,
    name: item.properties.title,
  }));
}

function Input(props) {
  return (
    <View style={styles.textInputContainer}>
      <Text style={styles.textInputLabel}>{props.label}</Text>
      <TextInput style={styles.textInput} {...props} />
    </View>
  );
}

export default function Films({ navigation }) {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetch("https://www.swapi.tech/api/films")
      .then((resp) => resp.json())
      .then((json) => {
        const mapped = mapItems(json.result);
        setItems(mapped);
      })
      .catch((err) => console.error("Fetch failed:", err));
  }, []);

  const handleSubmit = (e) => {
    setSearchTerm(e.nativeEvent.text);
    setModalVisible(true);
  };

  const handleSwipe = (id, name) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    setSearchTerm(name);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Input
        label="Search Film"
        placeholder="Enter a film title"
        returnKeyType="search"
        onSubmitEditing={handleSubmit}
      />

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalInner}>
          <Animated.View entering={FadeInDown.duration(1000)}>
        <Text>{searchTerm}</Text>
      </Animated.View>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <ScrollView>
        {items.map((item) => (
          <Swipeable
            key={item.id}
            name={item.name}
            onSwipe={() => handleSwipe(item.id, item.name)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
