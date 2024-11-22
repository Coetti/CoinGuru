import { Text, View, StyleSheet, Image, ToastAndroid } from "react-native";
import { useEffect, useState } from "react";
import CurrencyList from "../../components/CurrencyList";
import axios from "axios";
import { StatusBar } from "expo-status-bar";

export default function Rates() {
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
        "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.min.json",
        {
          headers: {
            "Cache-Control": "no-cache",
          },
        }
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
    const updatedCurrencies = currenciesData.map((currency) => {
      if (currency.symbol === "USD") return currency;

      const currencyName = String(currency.symbol).toLowerCase();
      const rate = data[currencyName];

      return {
        ...currency,
        rate: 1 / rate,
      };
    });

    setCurrenciesData(updatedCurrencies);
  };

  useEffect(() => {
    getExchangeRate();
    const interval = setInterval(() => {
      getExchangeRate();
    }, 24 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    getExchangeRate();
    ToastAndroid.show("Refreshed!", ToastAndroid.SHORT);
  };

  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.topbar}>
          <Image
            source={{ uri: "https://imgur.com/GIZ7DZ1.png" }}
            style={styles.logo}
          />
        </View>
        <CurrencyList
          currencies={currenciesData}
          date={fetchDate}
          handleRefresh={handleRefresh}
        />
      </View>
    </>
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
  text: {
    color: "#01B175",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
});
