import { View, StyleSheet, Text } from "react-native";
import { Link, Stack } from "expo-router";

export default function Index() {
  return (
    <>
      <Stack.Screen options={{ title: "Index", headerShown: false }} />
      <View>
        <Text>Index Page</Text>
        <Link href="/(tabs)/rates">Go to rates</Link>
      </View>
    </>
  );
}
