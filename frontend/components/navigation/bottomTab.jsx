import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../homeTab";
import SettingScreen from "../settingTab";
import PawScreen from "../pawTab";
import PawAddScreen from "../pawAddTab";
import PawEditScreen from "../pawEditTab";
import SosScreen from "../sosTab";
import VetPalScreen from "../vetPalTab";
import TeleScreen from "../teleTab";
import TeleDetailsScreen from "../teleDetailsTab";
import TelePaymentScreen from "../telePaymentTab";

import Octicons from "react-native-vector-icons/Octicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="VetPalScreen" component={VetPalScreen} />
      <Stack.Screen name="TeleScreen" component={TeleScreen} />
      <Stack.Screen name="TeleDetailsScreen" component={TeleDetailsScreen} />
      <Stack.Screen name="TelePaymentScreen" component={TelePaymentScreen} />
    </Stack.Navigator>
  );
};
const SosStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SosScreen" component={SosScreen} />
      <Stack.Screen name="VetPalScreen" component={VetPalScreen} />
    </Stack.Navigator>
  );
};
const PawStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="PawScreen" component={PawScreen} />
      <Stack.Screen name="PawAddScreen" component={PawAddScreen} />
      <Stack.Screen name="PawEditScreen" component={PawEditScreen} />
    </Stack.Navigator>
  );
};
const SettingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SettingsScreen" component={SettingScreen} />
    </Stack.Navigator>
  );
};

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: "#7BDFF2",
        tabBarShowLabel: false,
        tabBarInactiveTintColor: "#164348",
        tabBarActiveTintColor: "#FFFFFF",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <Octicons name="home" style={{ color: color, fontSize: 15 }} />
            );
          },
        }}
      />
      <Tab.Screen
        name="SOS"
        component={SosStack}
        options={{
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <MaterialIcons
                name="sos"
                style={{ color: color, fontSize: 20 }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Paw"
        component={PawStack}
        options={{
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <Ionicons name="paw" style={{ color: color, fontSize: 20 }} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingStack}
        options={{
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <Ionicons
                name="settings-outline"
                style={{ color: color, fontSize: 20 }}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
