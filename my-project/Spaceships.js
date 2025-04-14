import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Modal, Button,TextInput } from "react-native";
import styles from "./styles";

function mapItems(items) {
  return items.map((item) => ({
    key: item.uid,      
    value: item.name     
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

export default function Spaceships({ navigation }) {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  

  useEffect(() => {
    fetch("https://www.swapi.tech/api/starships/")
      .then((resp) => resp.json())
      .then(({ results }) => {
        const mapped = mapItems(results);
        setData(mapped);
      })
      .catch((err) => console.error("Fetch failed:", err));
  }, []);
  const handleSubmit = (e) => {
    setSearchTerm(e.nativeEvent.text);
    setModalVisible(true);
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
                  <Text>You entered: {searchTerm}</Text>
                  <Button title="Close" onPress={() => setModalVisible(false)} />
                </View>
              </View>
            </Modal>
      
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.value}</Text>
        )}
      />
    </View>
  );
}

