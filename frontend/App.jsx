import React, { useCallback, useEffect } from "react";
import { View, Image } from "react-native";
import * as SplashScreen from "expo-splash-screen";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./components/homeTab.jsx";
import VetPalScreen from "./components/vetPalTab.jsx";
import PawScreen from "./components/pawTab.jsx";
import SosScreen from "./components/sosTab.jsx";
import SettingScreen from "./components/settingTab.jsx";

import globalStyles from "./style/global.jsx";
import { useFonts } from "expo-font";

import * as Location from "expo-location";

SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant location permissions");
        return;
      }
      let currentlocation = await Location.getCurrentPositionAsync({});
      console.log(currentlocation);
    };
    getPermissions();
  }, []);

  const [fontsLoaded, fontError] = useFonts({
    "frank-regular": require("./assets/fonts/FrankRuhlLibre-Regular.ttf"),
    "frank-light": require("./assets/fonts/FrankRuhlLibre-Light.ttf"),
    "frank-medium": require("./assets/fonts/FrankRuhlLibre-Medium.ttf"),
    "frank-bold": require("./assets/fonts/FrankRuhlLibre-Bold.ttf"),
    "frank-black": require("./assets/fonts/FrankRuhlLibre-Black.ttf"),
    "arapey-italic": require("./assets/fonts/Arapey-Italic.ttf"),
    "arapey-regular": require("./assets/fonts/Arapey-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const HomeStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="VetPalScreen" component={VetPalScreen} />
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

  function TabNavigator() {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarIcon: ({ size, focused, color }) => {
              return (
                <Image
                  style={{ width: size, height: size }}
                  source={require("./assets/tabsIcon/home.png")}
                />
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
                <Image
                  style={{ width: size, height: size }}
                  source={require("./assets/tabsIcon/sos.png")}
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
                <Image
                  style={{ width: size, height: size }}
                  source={require("./assets/tabsIcon/paw.png")}
                />
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
                <Image
                  style={{ width: size, height: size }}
                  source={require("./assets/tabsIcon/settings.png")}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <View style={globalStyles.container} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </View>
  );
}
