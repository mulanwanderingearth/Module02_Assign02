import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import styles from "./styles";

function mapItems(items) {
  return items.map((item) => ({
    key: item.uid,      
    value: item.title  
  }));
}

export default function Films({ navigation }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://www.swapi.tech/api/films/")
      .then((resp) => resp.json())
      .then(({ results }) => {
    
        const mapped = mapItems(results);
        setData(mapped);
      })
      .catch((err) => console.error("Fetch failed:", err));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.value}</Text>
        )}
      />
    </View>
  );
}
