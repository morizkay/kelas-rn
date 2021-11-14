import React from "react";
import { StyleSheet, Text, View } from "react-native";

const LogisticDetail = ({ route }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.logisticItem}>{route.params.item}</Text>
      <View style={styles.logisticAreaContainer}>
        <Text style={styles.logisticAreaProvince}>{route.params.province}</Text>
        <Text style={styles.logisticAreaCity}>{route.params.city}</Text>
      </View>
    </View>
  );
};

export default LogisticDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",

    padding: 20,
  },
  logisticItem: {
    fontSize: 20,
    fontWeight: "bold",
  },
  logisticAreaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  logisticAreaProvince: {
    fontSize: 16,
    fontWeight: "bold",
  },
  logisticAreaCity: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
