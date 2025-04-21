// Swipeable.js
import React from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

export default function Swipeable({ onSwipe, name }) {
  function onScroll(e) {
    if (e.nativeEvent.contentOffset.x >= 200) {
      onSwipe(); 
    }
  }

  const scrollProps = {
    horizontal: true,
    pagingEnabled: true,
    scrollEventThrottle: 10,
    onScroll,
    showsHorizontalScrollIndicator: false,
  };

  return (
    <View style={styles.swipeContainer}>
      <ScrollView {...scrollProps}>
        <TouchableOpacity>
          <View style={styles.swipeItem}>
            <Text style={styles.swipeItemText}>{name}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.swipeBlank} />
      </ScrollView>
    </View>
  );
}
