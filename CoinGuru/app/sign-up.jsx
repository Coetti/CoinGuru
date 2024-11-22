import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    if (username && password) {
      try {
        // Salva os dados
        await AsyncStorage.setItem("username", username);
        await AsyncStorage.setItem("password", password);

        Alert.alert("Sucesso!", "Conta criada com sucesso!");

        router.push("/login");
      } catch (error) {
        Alert.alert("Erro", "Ocorreu um erro ao salvar suas informações.");
      }
    } else {
      Alert.alert("Erro", "Por favor, preencha ambos os campos!");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <Text style={styles.title}>Sign Up</Text>
      </View>
      <View style={styles.formContainer}>
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
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.loginLink}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.loginLinkText}>
          Already have an account? Log In
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  signUpButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#01B175",
    borderRadius: 5,
    justifyContent: "center",
    alignSelf: "center",
    width: "35%",
    height: 50,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  loginLink: {
    marginTop: 20,
    alignSelf: "center",
  },
  loginLinkText: {
    color: "#fff",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
