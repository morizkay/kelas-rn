import { gql } from "@apollo/client";
import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useQuery } from "@apollo/client";

const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      results {
        url
        name
        image
      }
    }
  }
`;

const gqlVariables = {
  limit: 9,
  offset: 0,
};

const PokemonHome = ({ navigation }: any) => {
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: gqlVariables,
  });
  return (
    <View style={styles.container}>
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error! {error.message}</Text>}
      {data && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data.pokemons.results}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                navigation.navigate("PokemonDetail", {
                  name: item.name,
                  image: item.image,
                })
              }
            >
              <View style={styles.pokemonContainer}>
                <Image
                  style={styles.pokemonImage}
                  source={{ uri: item.image }}
                />
                <Text style={styles.pokemonName}>{item.name}</Text>
              </View>
            </Pressable>
          )}
          keyExtractor={(item) => item.url}
        />
      )}
    </View>
  );
};

export default PokemonHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  pokemonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
  },
  pokemonName: {
    textTransform: "capitalize",
    fontSize: 20,
    margin: 10,
  },
  pokemonImage: {
    width: 100,
    height: 100,
  },
});
