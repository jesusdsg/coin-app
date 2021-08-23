import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const CoinItem = ({ coin }) => {
  return (
    <View style={styles.containerItem}>
      <View style={styles.coinNames}>
        <Image style={styles.image} source={{ uri: coin.image }} />
        <View style={styles.containerNames}>
          <Text style={styles.text}>{coin.name}</Text>
          <Text style={styles.textSymbol}>{coin.symbol}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.textPrice}>$ {coin.current_price}</Text>
        {/* Validando que el precio esté por encima de 0 y se le agrega el color dependiendo el caso*/}
        <Text
          style={[
            styles.pricePercentage,
            coin.price_change_percentage_24h > 0
              ? styles.priceUp
              : styles.priceDown,
          ]}
        >
          $ {coin.price_change_24h}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerItem: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  coinNames: {
    flexDirection: "row",
  },
  image: {
    width: 30,
    height: 30,
  },
  text: {
    color: "#fff",
  },
  textSymbol: {
    color: "#434343",
    textTransform: "uppercase",
  },
  containerNames: {
    marginLeft: 10,
  },
  textPrice: {
    color: "#fff",
    textAlign: "right",
  },
  pricePercentage: {
    color: "#fff",
  },
  priceUp: {
    color: "#258448",
  },
  priceDown: {
    color: "#862A2A",
  },
});

export default CoinItem;
