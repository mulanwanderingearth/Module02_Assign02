// PlanetDetail.js
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function PlanetDetail({ route }) {
  const { id } = route.params;
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    fetch(`https://www.swapi.tech/api/planets/${id}`)
      .then((res) => res.json())
      .then((json) => setDetail(json.result.properties));
  }, [id]);

  if (!detail) return <Text style={{ padding: 20 }}>Loading...</Text>;

  const fields = [
    { label: "Climate", key: "climate" },
    { label: "Diameter", key: "diameter" },
    { label: "Gravity", key: "gravity" },
    { label: "Population", key: "population" },
    { label: "Terrain", key: "terrain" },
    { label: "Surface Water", key: "surface_water" },
    { label: "Rotation Period", key: "rotation_period" },
    { label: "Orbital Period", key: "orbital_period" },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{detail.name}</Text>
      <View style={styles.infoBlock}>
        {fields.map((f) => (
          <View style={styles.row} key={f.key}>
            <Text style={styles.label}>{f.label}:</Text>
            <Text style={styles.value}>{detail[f.key]}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f8ff",
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#2a3b4c",
    textAlign: "center",
    letterSpacing: 1,
  },
  infoBlock: {
    marginTop: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 18,
  },
  label: {
    fontWeight: "600",
    color: "#4b6cb7",
    width: 130,
    fontSize: 17,
  },
  value: {
    color: "#222",
    fontSize: 17,
    flex: 1,
  },
});
