import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const movies = [
  {
    id: "tt1196141",
    resultType: "Title",
    image:
      "https://imdb-api.com/images/original/MV5BMTg3NzQ2NDgyNF5BMl5BanBnXkFtZTcwMDc1NzIyMw@@._V1_Ratio0.7273_AL_.jpg",
    title: "Diary of a Wimpy Kid",
    description: "(2010)",
  },
  {
    id: "tt13834480",
    resultType: "Title",
    image:
      "https://imdb-api.com/images/original/MV5BZDYyMjI1OWQtYjhmMS00MmU4LWI1N2UtNzFlZGQ0MDE2ODEwXkEyXkFqcGdeQXVyODkzNTgxMDg@._V1_Ratio0.7727_AL_.jpg",
    title: "Diary of a Wimpy Kid",
    description: "(2021)",
  },
  {
    id: "tt13623944",
    resultType: "Title",
    image: "https://imdb-api.com/images/original/nopicture.jpg",
    title: "Diary of a Wimpy Kid",
    description: "(2021) (TV Series)",
  },
  {
    id: "tt2023453",
    resultType: "Title",
    image:
      "https://imdb-api.com/images/original/MV5BMWJhYmI1YzItNjAzNi00NjQ4LWEzN2YtMjY4Yzg0NmU1YWE1XkEyXkFqcGdeQXVyNzkzNTg4NjY@._V1_Ratio0.7273_AL_.jpg",
    title: "Diary of a Wimpy Kid: Dog Days",
    description: "(2012)",
  },
  {
    id: "tt1650043",
    resultType: "Title",
    image:
      "https://imdb-api.com/images/original/MV5BMTcxNDYwOTEzMl5BMl5BanBnXkFtZTcwOTA3MzY3NA@@._V1_Ratio0.7273_AL_.jpg",
    title: "Diary of a Wimpy Kid: Rodrick Rules",
    description: "(2011)",
  },
  {
    id: "tt6003368",
    resultType: "Title",
    image:
      "https://imdb-api.com/images/original/MV5BYmMyZDRlNDktMDVmMS00Mjc2LThkNTctZWEyMTY2MjVjZmY5XkEyXkFqcGdeQXVyNzAwMjYxMzA@._V1_Ratio0.7273_AL_.jpg",
    title: "Diary of a Wimpy Kid: The Long Haul",
    description: "(2017)",
  },
];

const MovieHome = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={movies}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              navigation.navigate("MovieDetail", {
                id: item.id,
                image: item.image,
              });
            }}
          >
            <View style={styles.item}>
              <Text style={styles.title}>
                {item.title} {item.description}
              </Text>
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: item.image }} />
              </View>
            </View>
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default MovieHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 300,
  },
  description: {
    fontSize: 16,
  },
});
