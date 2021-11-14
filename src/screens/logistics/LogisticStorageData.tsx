import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const LogisticStorageData = ({ route }: any) => {
  const [logisticData, setLogisticData] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(true);

  const getData = async (key: string) => {
    const data = await AsyncStorage.getItem(key);
    if (data) {
      const newItem = { key, data: JSON.parse(data) };
      console.log({ newItem });
      setLogisticData((prevState: any) => [...prevState, newItem]);
    }
  };

  console.log(logisticData);

  React.useEffect(() => {
    AsyncStorage.getAllKeys().then((keys) => {
      keys.forEach((key) => {
        getData(key);
      });
    });
  }, []);

  return (
    <View>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          <Text>XXX</Text>
        </View>
      )}
    </View>
  );
};

export default LogisticStorageData;

const styles = StyleSheet.create({});
