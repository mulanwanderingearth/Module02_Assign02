import React, { useState, useEffect } from "react";
import { View, Text, Modal, TextInput, ScrollView } from "react-native";
import styles from "./styles";
import Swipeable from "./Swipeable";
import LazyImage from "./LazyImage";
import Button from "./Button";

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
  const [imageSource, setImageSource] = useState(null);
  const remote = "https://reactnative.dev/img/tiny_logo.png";

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
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    setSearchTerm(name);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <LazyImage
          style={styles.lazyImage}
          resizeMode="contain"
          source={imageSource}
        />
        <Button
          label="Load Remote"
          onPress={() => {
            setImageSource({ uri: remote });
          }}
        />
      </View>

      <Input
        label="Search Planet"
        placeholder="Enter a planet name"
        returnKeyType="search"
        onSubmitEditing={handleSubmit}
      />

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalInner}>
            <Text>{searchTerm}</Text>
            <Button label="Close" onPress={() => setModalVisible(false)} />
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
