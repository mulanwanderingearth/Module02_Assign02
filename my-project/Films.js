import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import styles from "./styles";
import Swipeable from "./Swipeable";

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
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://www.swapi.tech/api/films")
      .then((resp) => resp.json())
      .then((json) => {
        const mapped = mapItems(json.result);
        setItems(mapped);
        setFilteredItems(mapped);
      })
      .catch((err) => console.error("Fetch failed:", err));
  }, []);

  const handleSearch = (text) => {
    setSearchTerm(text);
    if (!text) {
      setFilteredItems(items);
    } else {
      const filtered = items.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  };

  const handleSwipe = (id) => {
    setFilteredItems((prev) => prev.filter((item) => item.id !== id));
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Input
        label="Search Film"
        placeholder="Enter a film title"
        value={searchTerm}
        onChangeText={handleSearch}
      />
      <ScrollView>
        {filteredItems.map((item) => (
          <Swipeable
            key={item.id}
            name={item.name}
            onSwipe={() => handleSwipe(item.id)}
          />
        ))}
        {filteredItems.length === 0 && (
          <Text style={localStyles.noResult}>No results found.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const localStyles = StyleSheet.create({
  noResult: {
    textAlign: "center",
    color: "#888",
    marginTop: 30,
    fontSize: 18,
  },
});
