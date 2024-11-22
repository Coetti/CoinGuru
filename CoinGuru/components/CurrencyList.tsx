import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const CurrencyList = ({ currencies, date, handleRefresh }) => {
  const [coinCount, setCoinCount] = useState(0);
  const showToast = () => {
    setCoinCount((prev) => prev + 1);
    ToastAndroid.show("Total Coins: $" + coinCount + "!", ToastAndroid.SHORT);
  };
  const day = String(date).slice(8, 10);
  const month = String(date).slice(5, 7);
  const year = String(date).slice(0, 4);
  const formattedDate = `${day}/${month}/${year}`;

  return (
    <View style={styles.container}>
      <View style={styles.date}>
        <FontAwesome6 name="calendar-days" size={24} color="#fff" />
        <Text style={styles.title}>{`- ${formattedDate}`}</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
          <MaterialCommunityIcons
            name="refresh-circle"
            size={30}
            color="#01B175"
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={currencies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.icon }} style={styles.icon} />
            <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.symbol}>{item.symbol}</Text>
            </View>
            <Text style={styles.rate}>${item.rate.toFixed(2)}</Text>
          </View>
        )}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={showToast}>
          <FontAwesome6 name="plus" size={20} color="#fff" />
          <Text style={styles.addButtonText}>Add Coin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    gap: 0,
  },
  date: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 0,
    gap: 10,
    backgroundColor: "#202125",
    alignSelf: "center",
    borderRadius: 5,
    padding: 5,
    borderColor: "#01B175",
    borderWidth: 2,
    width: "70%",
  },
  refreshButton: {
    backfaceVisibility: "hidden",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#424347",
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    gap: 10,
  },
  icon: {
    width: 40,
    height: 40,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  symbol: {
    fontSize: 14,
    color: "#68696D",
  },
  rate: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#01B175",
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    maxHeight: 50,
    marginTop: 30,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#01B175",
    borderRadius: 5,
    justifyContent: "center",
    width: "35%",
    height: 50,
  },
  addButtonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "bold",
  },
});

export default CurrencyList;
