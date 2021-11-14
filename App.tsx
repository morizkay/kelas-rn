// In App.js in a new project

import * as React from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { QueryClientProvider, QueryClient } from "react-query";
import LogisticHome from "./src/screens/logistics/LogisticHome";
import LogisticDetail from "./src/screens/logistics/LogisticDetail";
import MovieDetail from "./src/screens/movies/MovieDetail";
import MovieHome from "./src/screens/movies/MovieHome";
import PokemonDetail from "./src/screens/pokemons/PokemonDetail";
import PokemonHome from "./src/screens/pokemons/PokemonHome";
import HomeScreen from "./src/screens/Home";
import LogisticStorage from "./src/screens/logistics/LogisticStorage";
import LogisticStorageData from "./src/screens/logistics/LogisticStorageData";

const Stack = createNativeStackNavigator();

const apolloClient = new ApolloClient({
  uri: "https://graphql-pokeapi.graphcdn.app/",
  cache: new InMemoryCache(),
});
const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {},
    queries: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="LogisticStorageData">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
              name="LogisticHome"
              component={LogisticHome}
              options={{
                headerTitle: "Logistics",
              }}
            />
            <Stack.Screen
              name="LogisticDetail"
              component={LogisticDetail}
              options={{
                headerTitle: "Logistic's Detail",
              }}
            />
            <Stack.Screen
              name="LogisticStorage"
              component={LogisticStorage}
              options={{
                headerTitle: "Logistic's Storage",
              }}
            />
            <Stack.Screen
              name="LogisticStorageData"
              component={LogisticStorageData}
              options={{
                headerTitle: "Logistic's Storage Data Renderer",
              }}
            />

            <Stack.Screen
              name="MovieHome"
              component={MovieHome}
              options={{
                headerTitle: "Movies",
              }}
            />
            <Stack.Screen
              name="MovieDetail"
              component={MovieDetail}
              options={{
                headerTitle: "Movie's Detail",
              }}
            />
            <Stack.Screen
              name="PokemonHome"
              component={PokemonHome}
              options={{
                headerTitle: "Pokemons",
              }}
            />
            <Stack.Screen
              name="PokemonDetail"
              component={PokemonDetail}
              options={{
                headerTitle: "Pokemon's Detail",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </ApolloProvider>
  );
};

export default App;
