import React, { useCallback, useEffect } from "react";
import { View, Image } from "react-native";
import * as SplashScreen from "expo-splash-screen";

import { NavigationContainer } from "@react-navigation/native";
import BottomTab from "./components/navigation/bottomTab.jsx";

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
      const address = await Location.reverseGeocodeAsync({
        latitude: currentlocation.coords.latitude,
        longitude: currentlocation.coords.longitude,
      });
      global.currentLocation = currentlocation;
      global.address = address;
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

  return (
    <View style={globalStyles.container} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <BottomTab />
      </NavigationContainer>
    </View>
  );
}
