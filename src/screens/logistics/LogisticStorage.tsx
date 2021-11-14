import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const LogisticStorage = ({ route }: any) => {
  const [logisticData, setLogisticData] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(true);

  const getData = async (key: string) => {
    const data = await AsyncStorage.getItem(key);
    if (data) {
      const newItem = { key, data: JSON.parse(data) };
      setLogisticData((prevState: any) => [...prevState, newItem]);
    }
  };

  React.useEffect(() => {
    AsyncStorage.getAllKeys()
      .then((keys) => {
        keys.forEach((key) => {
          getData(key);
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <View>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          <FlatList
            data={logisticData}
            renderItem={({ item }) => (
              <View style={styles.containerOfData}>
                <Text style={styles.textOfData}>{item.key}</Text>
                <Text style={styles.textOfData}>{item.data.province}</Text>
                <Text style={styles.textOfData}>{item.data.city}</Text>
              </View>
            )}
            keyExtractor={(item) => item.key}
          />
        </View>
      )}
    </View>
  );
};

export default LogisticStorage;

const styles = StyleSheet.create({
  containerOfData: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  textOfData: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
