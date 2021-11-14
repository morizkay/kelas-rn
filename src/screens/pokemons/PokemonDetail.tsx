import { gql, useQuery } from "@apollo/client";
import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

const getPokemon = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      types {
        type {
          name
        }
      }
      message
      status
    }
  }
`;

const PokemonDetail = ({ route, navigation }: any) => {
  const { loading, error, data } = useQuery(getPokemon, {
    variables: { name: route.params.name },
  });
  return (
    <View style={styles.container}>
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error! {error.message}</Text>}
      {data && (
        <View style={styles.container}>
          <Image source={{ uri: route.params.image }} style={styles.image} />
          <Text style={styles.pokemonName}>{data.pokemon.name}</Text>
          <Text style={styles.pokemonName}>{data.pokemon.message}</Text>
          <Text style={styles.pokemonName}>{data.pokemon.status}</Text>

          {/*           <Text style={styles.pokemonAbilities}>Abilities</Text>
          <FlatList
            data={data.pokemon.abilities}
            renderItem={({ item }) => (
              <Text style={styles.pokemonAbility}>{item.ability.name}</Text>
            )}
            keyExtractor={(item) => item.ability.name}
          /> */}
          <Text style={styles.pokemonTypes}>Types</Text>
          <FlatList
            data={data.pokemon.types}
            renderItem={({ item }) => (
              <Text style={styles.pokemonType}>{item.type.name}</Text>
            )}
            keyExtractor={(item) => item.type.name}
          />
        </View>
      )}
    </View>
  );
};

export default PokemonDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  pokemonName: {
    fontSize: 20,
    textTransform: "capitalize",
    fontWeight: "bold",
  },
  pokemonAbilities: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  pokemonAbility: {
    fontSize: 20,
  },
  pokemonTypes: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  pokemonType: {
    textTransform: "capitalize",
    fontSize: 20,
  },
  pokemonMoves: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  pokemonMove: {
    fontSize: 20,
  },
});
