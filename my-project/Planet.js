import React, { useState, useEffect } from "react";
import { View, Text, Modal, Button, TextInput, ScrollView } from "react-native";
import styles from "./styles";
import Swipeable from "./Swipeable";
import PlanetDetail from "./PlanetDetail";

function mapItems(items) {
  return items.map((item) => ({
    id: item.uid,
    name: item.name,
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

export default function Planet({ navigation }) {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetch("https://www.swapi.tech/api/planets")
      .then((resp) => resp.json())
      .then(({ results }) => {
        const mapped = mapItems(results);
        setItems(mapped);
      })
      .catch((err) => console.error("Fetch failed:", err));
  }, []);

  const handleSubmit = (e) => {
    setSearchTerm(e.nativeEvent.text);
    setModalVisible(true);
  };

  const handleSwipe = (id, name) => {
    navigation.navigate("PlanetDetail", { id, name });
  };

  return (
    <View style={styles.container}>
      <Input
        label="Search Planet"
        placeholder="Enter a planet name"
        returnKeyType="search"
        onSubmitEditing={handleSubmit}
      />

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalInner}>
            <Text> {searchTerm}</Text>
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
