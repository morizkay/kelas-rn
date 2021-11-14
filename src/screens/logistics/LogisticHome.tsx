import React from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "react-native-modal";
import "react-native-get-random-values";
import { nanoid } from "nanoid";

const LogisticHome = ({ navigation }: any) => {
  const [province, setProvince] = React.useState("");
  const [city, setCity] = React.useState("");
  const [isModalVisible, setModalVisible] = React.useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [logisticData, setLogisticData] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(true);

  const getData = async (key: string) => {
    const data = await AsyncStorage.getItem(key);
    if (data) {
      const newItem = { key, data: JSON.parse(data) };
      setLogisticData((prevState: any) => [...prevState, newItem]);
    }
  };

  const deleteData = async (key: string) => {
    await AsyncStorage.removeItem(key);
    getAllKeys();
  };

  const getAllKeys = async () => {
    setLogisticData([]);
    setLoading(true);
    AsyncStorage.getAllKeys()
      .then((keys) => {
        keys.forEach((key) => {
          getData(key);
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    getAllKeys();
  }, []);

  const onSave = async () => {
    try {
      await AsyncStorage.setItem(nanoid(), JSON.stringify({ province, city }));
      getAllKeys();
    } catch (error) {}
    toggleModal();
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.addDataButton} onPress={toggleModal}>
        <Text style={styles.addDataText}>Add New Data</Text>
      </Pressable>
      <Pressable style={styles.addDataButton} onPress={getAllKeys}>
        <Text style={styles.addDataText}>Reload Data</Text>
      </Pressable>
      <Modal isVisible={isModalVisible}>
        <View style={styles.addDataModalContainer}>
          <View style={styles.addDataModalInputContainer}>
            <Text style={styles.addDataModalTextLabel}>Province's Name</Text>
            <TextInput
              style={styles.addDataModalTextInput}
              value={province}
              onChangeText={setProvince}
            />
          </View>
          <View style={styles.addDataModalInputContainer}>
            <Text style={styles.addDataModalTextLabel}>City's Name</Text>
            <TextInput
              style={styles.addDataModalTextInput}
              value={city}
              onChangeText={setCity}
            />
          </View>
          <View style={styles.addDataModalActionContainer}>
            <Pressable
              style={styles.addDataModalActionSaveButton}
              onPress={onSave}
            >
              <Text style={styles.addDataModalActionSaveButtonText}>SAVE</Text>
            </Pressable>
            <Pressable
              style={styles.addDataModalActionCancelButton}
              onPress={toggleModal}
            >
              <Text style={styles.addDataModalActionCancelButtonText}>
                CANCEL
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {logisticData.length === 0 ? (
        <View style={styles.containerOfDataEmpty}>
          <Text style={styles.textOfDataEmpty}>No Data</Text>
        </View>
      ) : loading ? (
        <Text>Loading...</Text>
      ) : (
        <View style={styles.containerOfData}>
          <FlatList
            style={styles.flatList}
            data={logisticData}
            renderItem={({ item }) => (
              <View key={item.id} style={styles.containerOfDataItem}>
                <Text style={styles.textOfDataItem}>{item.item}</Text>
                <View style={styles.logisticArea}>
                  <Text style={styles.textOfDataProvince}>
                    {item.data.province} -{" "}
                  </Text>
                  <Text style={styles.textOfDataCity}>{item.data.city}</Text>
                </View>
                <Pressable
                  style={styles.deleteItemButton}
                  onPress={() => deleteData(item.key)}
                >
                  <Text style={styles.deleteItemButtonText}>Delete Item</Text>
                </Pressable>
              </View>
            )}
            keyExtractor={(item) => item.key}
          />
        </View>
      )}
    </View>
  );
};

export default LogisticHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  containerOfData: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  containerOfDataEmpty: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  containerOfDataItem: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",

    padding: 10,
  },
  flatList: {
    flex: 1,
    width: "100%",
  },
  textOfDataEmpty: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textOfDataItem: {
    fontSize: 20,
    fontWeight: "bold",
  },

  logisticArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  textOfDataProvince: {
    fontSize: 15,
    fontWeight: "bold",
  },

  textOfDataCity: {
    fontSize: 15,
    fontWeight: "bold",
  },

  addDataButton: {
    width: "90%",
    height: 50,
    marginHorizontal: "5%",
    marginBottom: 10,
    borderWidth: 1,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  addDataText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  addDataModalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  addDataModalInputContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 10,
  },
  addDataModalTextLabel: {
    fontSize: 20,
    fontWeight: "bold",
  },
  addDataModalTextInput: {
    width: "100%",
    height: 50,
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    textAlign: "center",
    color: "#000",
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  addDataModalActionContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addDataModalActionSaveButton: {
    borderRadius: 10,
    width: 100,
    height: 50,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
  addDataModalActionSaveButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  addDataModalActionCancelButton: {
    borderRadius: 10,
    width: 100,
    height: 50,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  addDataModalActionCancelButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  deleteItemButton: {
    borderRadius: 10,
    width: 100,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
  deleteItemButtonText: {
    fontSize: 15,
    color: "#fff",
  },
});
