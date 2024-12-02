import React, { useState } from "react";
import { useAuth } from "./auth-context";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (username && password) {
      try {
        const savedUsername = await AsyncStorage.getItem("username");
        const savedPassword = await AsyncStorage.getItem("password");

        if (savedUsername === username && savedPassword === password) {
          login();
          router.push("/(tabs)/rates");
        } else {
          Alert.alert("Erro", "Nome de usuário ou senha inválidos.");
        }
      } catch (error) {
        Alert.alert("Erro", "Ocorreu um erro ao verificar as credenciais.");
      }
    } else {
      Alert.alert("Erro", "Por favor, preencha ambos os campos!");
    }
  };

  const handleSignUp = () => {
    router.push("/sign-up");
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
        <AntDesign name="user" size={24} color="#fff" />
        <Text style={styles.title}>Profile</Text>
      </View>
      <View style={styles.loginContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor={"#777"}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor={"#777"}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <MaterialIcons name="login" size={24} color="#fff" />
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>
          Don't have an account? Sign Up
        </Text>
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
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#01B175",
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#424347",
    fontSize: 18,
    color: "#fff",
  },
  loginButton: {
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
  signUpButton: {
    flexDirection: "row",
    backfaceVisibility: "hidden",
    alignSelf: "center",
  },
  signUpButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
