import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const LogisticStorage = ({ navigation }: any) => {
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
      <Pressable
        onPress={() => {
          navigation.navigate("LogisticStorageData");
        }}
      >
        <Text>Logistic Storage Renderer</Text>
      </Pressable>
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
