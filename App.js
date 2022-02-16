import 'react-native-gesture-handler';

import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { MyStack } from './src/components/home/Home';


function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Phan Thanh Cong</Text>
      <Text>anhdangcode.com</Text>
    </View>
  );
}

export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "About") {
              iconName = focused ? "person" : "person-outline";
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={MyStack} />
        <Tab.Screen name="About" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    // <NavigationContainer>
    //   <Tab.Navigator
    //     screenOptions={({ route }) => ({
    //       tabBarIcon: ({ focused, color, size }) => {
    //         let iconName;
    //         if (route.name === "Home") {
    //           iconName = focused ? "home" : "home-outline";
    //         } else if (route.name === "User") {
    //           iconName = focused ? "person" : "person-outline";
    //         }
    //         // You can return any component that you like here!
    //         return <Ionicons name={iconName} size={size} color={color} />;
    //       },
    //       tabBarActiveTintColor: "tomato",
    //       tabBarInactiveTintColor: "gray",
    //       headerShown: false,
    //     })}
    //   >
    //     <Tab.Screen name="Home" component={Home} />
    //     <Tab.Screen name="User" component={SettingsScreen} />
    //   </Tab.Navigator>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
