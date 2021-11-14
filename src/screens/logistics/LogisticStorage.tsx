import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const LogisticStorage = () => {
  const [keys, setKeys] = React.useState<any[]>();

  const getAllData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      setKeys(keys);
    } catch (e) {
      // error reading value
    }
  };

  React.useEffect(() => {
    getAllData();
  }, []);
  return (
    <View>
      {keys &&
        keys.map(
          (
            key:
              | boolean
              | React.ReactChild
              | React.ReactFragment
              | React.ReactPortal
              | null
              | undefined
          ) => {
            return (
              <View>
                <Text>{key}</Text>
              </View>
            );
          }
        )}
    </View>
  );
};

export default LogisticStorage;

const styles = StyleSheet.create({});
