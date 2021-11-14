import React from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "react-native-modal";
import { nanoid } from "nanoid";

const logistics = [
  {
    id: 1,
    item: "Book",
    province: "DKI Jakarta",
    city: "Jakarta",
  },
  {
    id: 2,
    item: "Book",
    province: "West Java",
    city: "Bandung",
  },
];

const LogisticHome = ({ navigation }: any) => {
  const [data, setData] = React.useState(logistics);
  const [province, setProvince] = React.useState("");
  const [city, setCity] = React.useState("");
  const [isModalVisible, setModalVisible] = React.useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onSave = async () => {
    console.log(nanoid(), { province, city });

    try {
      await AsyncStorage.setItem(nanoid(), JSON.stringify({ province, city }));
      const keys = await AsyncStorage.getAllKeys();
    } catch (error) {}
    await toggleModal();
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.addDataButton} onPress={toggleModal}>
        <Text style={styles.addDataText}>Add New Data</Text>
      </Pressable>
      <Pressable
        style={styles.addDataButton}
        onPress={() => {
          navigation.navigate("LogisticStorage");
        }}
      >
        <Text style={styles.addDataText}>Async Storage</Text>
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
      {data.length === 0 ? (
        <View style={styles.containerOfDataEmpty}>
          <Text style={styles.textOfDataEmpty}>No Data</Text>
        </View>
      ) : (
        <View style={styles.containerOfData}>
          <FlatList
            style={styles.flatList}
            data={data}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  navigation.navigate("LogisticDetail", {
                    id: item.id,
                    item: item.item,
                    province: item.province,
                    city: item.city,
                  });
                }}
              >
                <View key={item.id} style={styles.containerOfDataItem}>
                  <Text style={styles.textOfDataItem}>{item.item}</Text>
                  <View style={styles.logisticArea}>
                    <Text style={styles.textOfDataProvince}>
                      {item.province} -{" "}
                    </Text>
                    <Text style={styles.textOfDataCity}>{item.city}</Text>
                  </View>
                </View>
              </Pressable>
            )}
            keyExtractor={(item) => item.id.toString()}
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
    width: "100%",
    height: 50,
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
});
