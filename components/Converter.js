import React, { useEffect, useState } from "react";
import { TextInput } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import { Icon } from "react-native-elements";

const Converter = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [value, setValue] = useState(null);
  const [value2, setValue2] = useState(null);
  const [items, setItems] = useState([]);
  const [resText, setResText] = useState("");
  const [currency, setCurrency] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pickValue, setPickValue] = useState("");
  const [pickValue2, setPickValue2] = useState("");
  const [amount, setAmount] = useState("");

  const URL =
    "https://free.currconv.com/api/v7/convert?q=COP_USD&compact=ultra&apiKey=021487217d078ac60998";

  const convertCurrency = async () => {
    const res = await fetch(
      `https://free.currconv.com/api/v7/convert?q=${pickValue}_${pickValue2}&compact=ultra&apiKey=021487217d078ac60998`
      //https://free.currconv.com/api/v7/convert?q=COP_USD&compact=ultra&apiKey=021487217d078ac60998"
    );
    const data = await res.json();
    //const rest = pickValue + "_" + pickValue2;
    const subtotal = Object.values(data);
    const total = amount * subtotal;
    setResText("$" + total);
  };

  const formatItems = () => {
    console.log("formating", currency);
    if (items.length <= 0) {
      for (const i in currency) {
        //console.log("Imprimiendo", `${i}: ${currency[i].currencyName}`);
        items.push({
          label: `${currency[i].currencyName}`,
          value: `${currency[i].id}`,
        });
      }
    }
  };

  useEffect(() => {
    if (loading) {
      fetch(
        "https://free.currconv.com/api/v7/currencies?apiKey=021487217d078ac60998"
      )
        .then((response) => response.json())
        .then((data) => {
          //Successful response from the API Call
          setCurrency(data.results);
          //console.log("esta es", data.results);
          //console.log("Currency", currency);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    formatItems();
  }, [currency]);

  return (
    <View style={styles.containerItem}>
      <View style={styles.pickerContainer}>
        <TextInput
          style={styles.input}
          placeholder="Amount..."
          placeholderTextColor="#B0B0B0"
          onChangeText={(value) => {
            setAmount(value);
          }}
        ></TextInput>

        <DropDownPicker
          zIndex={3000}
          zIndexInverse={1000}
          searchable={true}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Select Currency"
          onChangeValue={(value) => {
            setPickValue(value);
          }}
          listMode="FLATLIST"
          showArrowIcon={false}
          style={styles.picker}
          textStyle={styles.pickerText}
          arrowIconStyle={styles.pickerIcon}
          searchTextInputStyle={styles.pickerSearch}
          listItemLabelStyle={{ padding: 10, zIndex: 2 }}
          itemSeparatorStyle={{ color: "#d1d1d170" }}
        />

        <View style={{ padding: 10 }}>
          <Icon name="repeat" type="feather" color="#fff" size={20}></Icon>
        </View>

        <DropDownPicker
          zIndex={2000}
          zIndexInverse={2000}
          searchable={true}
          open={open2}
          value={value2}
          items={items}
          setOpen={setOpen2}
          setValue={setValue2}
          setItems={setItems}
          placeholder="Select Currency"
          onChangeValue={(value) => {
            setPickValue2(value);
          }}
          listMode="FLATLIST"
          showArrowIcon={false}
          style={styles.picker}
          textStyle={styles.pickerText}
          arrowIconStyle={styles.pickerIcon}
          searchTextInputStyle={styles.pickerSearch}
          listItemLabelStyle={{ padding: 10, zIndex: 1 }}
          itemSeparatorStyle={{ color: "#d1d1d170" }}
        />

        <TouchableHighlight
          style={styles.button}
          onPress={async () => {
            await convertCurrency();
          }}
          underlayColor="#fff"
        >
          <Text style={styles.buttonText}>Convert</Text>
        </TouchableHighlight>

        <Text style={styles.resultText}>{resText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerItem: {
    padding: 10,
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
  pickerContainer: {
    width: "100%",
    padding: 10,
  },
  input: {
    color: "#A4A9B6",
    backgroundColor: "#252831",
    borderRadius: 15,
    width: "100%",
    paddingHorizontal: 20,
    height: 40,
    textAlign: "center",
  },
  pickerText: {
    color: "#A4A9B6",
    backgroundColor: "#252831",
  },
  pickerSearch: {
    color: "#A4A9B6",
    backgroundColor: "#1E2126",
    borderWidth: 0,
    padding: 10,
    height: 40,
  },
  pickerIcon: {
    //top: -15,
    //left: 10,
    color: "#ffffff",
  },
  picker: {
    color: "#A4A9B6",
    backgroundColor: "#252831",
    borderRadius: 15,
    width: "100%",
    height: 40,
    padding: 10,
    textAlign: "center",
    marginVertical: 20,
  },
  pickerItem: {
    color: "#fff",
    backgroundColor: "#252831",
  },
  button: {
    backgroundColor: "#2847bf",
    color: "#fff",
    borderRadius: 15,
    height: 60,
    textAlign: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    marginVertical: "center",
    textAlign: "center",
    padding: 12,
  },
  resultText: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    margin: 20,
  },
});

export default Converter;
