import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome6 } from "@expo/vector-icons";

export default function Calculator() {
  const [inputCurrency, setInputCurrency] = useState("USD");
  const [outputCurrency, setOutputCurrency] = useState("EUR");
  const [amount, setAmount] = useState("");
  const [convertedValue, setConvertedValue] = useState(0);

  const [fetchDate, setFetchDate] = useState("");
  const [currenciesData, setCurrenciesData] = useState([
    {
      id: "1",
      name: "United States Dollar",
      symbol: "USD",
      icon: "https://imgur.com/Cz3fAzu.png",
      rate: 1,
    },
    {
      id: "2",
      name: "Euro",
      symbol: "EUR",
      icon: "https://imgur.com/i1blsIm.png",
      rate: 0,
    },
    {
      id: "3",
      name: "Brazilian Real",
      symbol: "BRL",
      icon: "https://imgur.com/tud0oh2.png",
      rate: 0,
    },
    {
      id: "4",
      name: "Bitcoin",
      symbol: "BTC",
      icon: "https://imgur.com/XssIIKG.png",
      rate: 0,
    },
    {
      id: "5",
      name: "British Pound",
      symbol: "GBP",
      icon: "https://imgur.com/QzHNUMq.png",
      rate: 0,
    },
    {
      id: "6",
      name: "Chinese Yuan",
      symbol: "CNY",
      icon: "https://imgur.com/09VYYQ1.png",
      rate: 0,
    },
  ]);

  async function getExchangeRate() {
    try {
      const response = await axios.get(
        "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.min.json"
      );
      if (response && response.data) {
        updateCurrencyRates(response.data.usd);
        setFetchDate(response.data.date);
      }
    } catch (error) {
      console.error("Erro ao obter a taxa de câmbio", error);
      return 1;
    }
  }

  const updateCurrencyRates = (data) => {
    const updatedCurrencies = [...currenciesData];
    for (let currency of updatedCurrencies) {
      if (currency.symbol !== "USD") {
        const currencyName = String(currency.symbol).toLowerCase();

        const rate = data[currencyName];

        currency.rate = 1 / rate;
        console.log(currencyName, currency.rate);
      }
    }

    setCurrenciesData(updatedCurrencies);
  };

  useEffect(() => {
    getExchangeRate();
    const interval = setInterval(() => {
      getExchangeRate();
    }, 24 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const handleConvert = () => {
    const inputRate =
      currenciesData.find((c) => c.symbol === inputCurrency)?.rate || 1;
    const outputRate =
      currenciesData.find((c) => c.symbol === outputCurrency)?.rate || 1;

    if (!amount || isNaN(parseFloat(amount))) {
      alert("Please enter a valid amount");
      return;
    }

    const result = (parseFloat(amount) * inputRate) / outputRate;
    setConvertedValue(result);
  };

  const handleSwap = () => {
    setInputCurrency(outputCurrency);
    setOutputCurrency(inputCurrency);
    setConvertedValue(0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <Image
          source={{ uri: "https://imgur.com/GIZ7DZ1.png" }}
          style={styles.logo}
        />
      </View>
      <View style={styles.header}>
        <FontAwesome6 name="calculator" size={24} color="#fff" />
        <Text style={styles.title}>Exchange</Text>
      </View>

      <Text style={styles.label}>From:</Text>
      <Picker
        selectedValue={inputCurrency}
        style={styles.picker}
        onValueChange={(itemValue) => setInputCurrency(itemValue)}
      >
        {currenciesData.map((currency) => (
          <Picker.Item
            key={currency.id}
            label={currency.name}
            value={currency.symbol}
          />
        ))}
      </Picker>

      <TouchableOpacity style={styles.swapButton} onPress={handleSwap}>
        <FontAwesome6 name="arrows-rotate" size={20} color="#fff" />
        <Text style={styles.buttonText}>Swap</Text>
      </TouchableOpacity>

      <Text style={styles.label}>To:</Text>

      <Picker
        selectedValue={outputCurrency}
        style={styles.picker}
        onValueChange={(itemValue) => setOutputCurrency(itemValue)}
      >
        {currenciesData.map((currency) => (
          <Picker.Item
            key={currency.id}
            label={currency.name}
            value={currency.symbol}
          />
        ))}
      </Picker>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter amount"
          value={amount}
          onChangeText={setAmount}
        />
        <TouchableOpacity style={styles.convertButton} onPress={handleConvert}>
          <FontAwesome6 name="circle-dollar-to-slot" size={20} color="#fff" />
          <Text style={styles.buttonText}>Exchange</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.resultContainer}>
        <FontAwesome6 name="coins" size={20} color="#01B175" />
        <Text style={styles.resultTitle}>Result</Text>
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>
            {convertedValue ? convertedValue.toFixed(10) : "N/A"}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#15161A",
    justifyContent: "flex-start",
    padding: 20,
  },
  topbar: {
    flex: 1,
    backgroundColor: "#15161A",
    maxHeight: 60,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  logo: {
    height: 60,
    width: 360,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 0,
    gap: 10,
    backgroundColor: "#202125",
    width: "60%",
    alignSelf: "center",
    borderRadius: 5,
    padding: 5,
    borderColor: "#01B175",
    borderWidth: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  label: {
    color: "#01B175",
    marginVertical: 10,
    fontWeight: "bold",
    fontSize: 20,
  },

  picker: {
    backgroundColor: "#202125",
    color: "#fff",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    gap: 20,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    width: "40%",
    height: 50,
    textAlign: "center",
    borderColor: "#01B175",
    borderWidth: 2,
    color: "#15161A",
    fontSize: 18,
    fontWeight: "bold",
  },
  convertButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#01B175",
    borderRadius: 5,
    justifyContent: "center",
    width: "35%",
    height: 50,
    gap: 10,
  },
  swapButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#01B175",
    borderRadius: 5,
    justifyContent: "center",
    alignSelf: "center",
    width: "35%",
    height: 50,
    gap: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  resultContainer: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  resultTitle: {
    color: "#01B175",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
  resultBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    borderColor: "#01B175",
    borderWidth: 2,
  },
  resultText: {
    color: "#15161A",
    fontSize: 18,
    fontWeight: "bold",
  },
});
