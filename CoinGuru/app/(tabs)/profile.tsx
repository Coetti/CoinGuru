import React from "react";
import { useAuth } from "../auth-context";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Profile() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/login"); // Redireciona para a página de login
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={{
          uri: "https://via.placeholder.com/150", // URL da foto do usuário (substitua por dinâmica se necessário)
        }}
      />
      <Text style={styles.name}>John Doe</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
