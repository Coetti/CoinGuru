import React, { useEffect } from "react";
import { useAuth } from "../auth-context";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Profile() {
  const [user, setUser] = React.useState({});
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };
  async function fetchUser() {
    const savedUsername = await AsyncStorage.getItem("username");
    const savedPassword = await AsyncStorage.getItem("password");
    return { savedUsername, savedPassword };
  }
  useEffect(() => {
    const getUserData = async () => {
      const userData = await fetchUser();
      setUser(userData);
      console.log(userData);
    };
    getUserData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <Image
          source={{ uri: "https://imgur.com/GIZ7DZ1.png" }}
          style={styles.logo}
        />
      </View>
      <View style={styles.header}>
        <AntDesign name="user" size={24} color="#fff" />
        <Text style={styles.title}>Profile</Text>
      </View>
      <View style={styles.userProfile}>
        <Image
          style={styles.avatar}
          source={{
            uri: "https://imgur.com/sy6Oe5c.png",
          }}
        />
        <Text style={styles.name}>{user.savedUsername}</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <MaterialIcons name="logout" size={24} color="#fff" />
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
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
  userProfile: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    alignSelf: "center",
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
    textAlign: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  logoutButton: {
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
});
