import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useQuery } from "react-query";

const targetLink = "https://imdb-api.com/en/API/Title/k_i8u4foz1/";

const MovieDetail = ({ route }: any) => {
  const { data, error, isLoading } = useQuery(route.params.id, async () => {
    const res = await fetch(targetLink + route.params.id);
    return await res.json();
  });

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error</Text>
      ) : (
        <View style={styles.movieContainer}>
          <Text style={styles.movieTitle}>{data.fullTitle}</Text>
          <Image
            style={styles.moviePoster}
            source={{ uri: route.params.image }}
          />
          <Text style={styles.movieRuntime}>{data.runtimeStr}</Text>
          <Text style={styles.moviePlot}>{data.plot}</Text>
        </View>
      )}
    </View>
  );
};

export default MovieDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  movieContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  moviePoster: {
    width: 200,
    height: 300,
  },
  movieRuntime: {
    fontSize: 15,
    marginBottom: 10,
  },
  moviePlot: {
    fontSize: 15,
    marginBottom: 10,
    textAlign: "justify",
    padding: 10,
  },
});
