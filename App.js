import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  StatusBar,
  Image,
} from "react-native";
import CoinItem from "./components/CoinItem";
import Converter from './components/Converter';

import "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator(); //Instanciando el Drawer Navigator

//Pantallas
function HomeScreen() {
  const [coins, setCoins] = useState([]); //Se agrega arreglo
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  //COnsultando la API
  const loadData = async () => {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=300&page=1&sparkline=false"
    );
    const data = await res.json();
    //console.log(data);
    //Llenando arreglo con el resultado del fetch
    setCoins(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#141414" />
      <View style={styles.header}>
      <TextInput
          style={styles.searchInput}
          placeholder="Search Coin..."
          placeholderTextColor="#d1d1d1"
          onChangeText={(text) => setSearch(text)}
        />
        <View
          style={{
            position: "absolute",
            zIndex: 1,
            right: 10,
          }}
        >
          <Icon name="search" type="feather" color="#B0B0B0" size={20} padding={10}></Icon>
        </View>
        {/*<Image source={require("./assets/logo.png")} style={styles.logo} />*/}
        
      </View>
      <FlatList
        style={styles.list}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={async () => {
          setRefreshing(true);
          await loadData();
          setRefreshing(false);
        }}
        //Creación del filtro
        data={coins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        )}
        renderItem={({ item }) => (
          //<Text>{ item.name }</Text>
          <CoinItem coin={item} />
        )}
      />
    </View>
  );
}

function ConverterScreen() {
  return (
    <View style={styles.container}>
      <Converter />
    </View>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#252831",
            width: 240,
            drawerStatusBarAnimation: "fade",
          },
          headerStyle: {
            backgroundColor: "#17191D",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerTitle: () => (
            <Image
              source={require("./assets/logo.png")}
              style={{ width: 160, height: 40 }}
            />
          ),
          drawerItemStyle: {
            borderRadius: 50,
            paddingHorizontal: 10,
          },
          drawerActiveTintColor: "#fff",
          drawerActiveBackgroundColor: "#1E2126",
          drawerInactiveTintColor: "#B0B0B0"
        }}
      >
        <Drawer.Screen name="Coin List" component={HomeScreen} options={
          {
            drawerIcon: () => (
              <Icon name="list" type="feather" color="#fff" size={20}></Icon>
              )
          }
        } />
        <Drawer.Screen name="Coin Converter" component={ConverterScreen} options={
          {
            drawerIcon: () => (
              <Icon name="dollar-sign" type="feather" color="#fff" size={20}></Icon>
              )
          }
        } />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#1E2126",
    color: "#ffffff",
    alignItems: "center",
    flex: 1,
  },
  logo: {
    width: 120,
    height: "auto",
    paddingTop: 10,
  },
  title: {
    color: "#fff",
    marginTop: 10,
    fontSize: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 10,
    marginBottom: 20,
  },
  searchInput: {
    color: "#A4A9B6",
    backgroundColor: "#252831",
    borderRadius: 15,
    width: "100%",
    paddingHorizontal: 20,
    height: 40,
    textAlign: "left",
  },
  list: {
    width: "90%",
  },
  drawer: {
    backgroundColor: "#1E2126",
  },
});

export default App;
