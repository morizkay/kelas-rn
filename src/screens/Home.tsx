import React from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("LogisticHome")}
      >
        <Text style={styles.buttonText}>Logistic's Data</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("MovieHome")}
      >
        <Text style={styles.buttonText}>Movie's Data</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("PokemonHome")}
      >
        <Text style={styles.buttonText}>Pokemon's Data</Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#00a680",
  },
  buttonText: {
    fontSize: 20,
    textTransform: "capitalize",
    color: "#fff",
  },
});
