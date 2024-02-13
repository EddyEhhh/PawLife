import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeTab from "../homeTab";
import SettingTab from "../settingTab";
import PawTab from "../pawTab";
import SosTab from "../sosTab";
import VetPalTab from "../vetPalTab";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeTab}
        options={{
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <Image
                style={{ width: size, height: size }}
                source={require("../../assets/tabsIcon/home.png")}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Sos"
        component={SosTab}
        options={{
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <Image
                style={{ width: size, height: size }}
                source={require("../../assets/tabsIcon/sos.png")}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Paw"
        component={PawTab}
        options={{
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <Image
                style={{ width: size, height: size }}
                source={require("../../assets/tabsIcon/paw.png")}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={VetPalTab}
        options={{
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <Image
                style={{ width: size, height: size }}
                source={require("../../assets/tabsIcon/settings.png")}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
