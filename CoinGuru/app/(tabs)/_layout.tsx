import { Tabs } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#01B175",
        tabBarStyle: {
          backgroundColor: "#15161A",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Rates",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign
              name="areachart"
              size={24}
              color={color}
              style={{
                transform: [{ scale: focused ? 1.3 : 1 }],
                elevation: focused ? 8 : 0,
              }}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="calculator"
        options={{
          title: "Exchange",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign
              name="calculator"
              size={24}
              color={color}
              style={{
                transform: [{ scale: focused ? 1.3 : 1 }],
                elevation: focused ? 8 : 0,
              }}
            />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
