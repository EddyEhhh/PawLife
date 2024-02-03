import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeTab from '../homeTab';
import SettingTab from '../settingTab';
import PawTab from '../pawTab';
import SosTab from '../sosTab';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeTab} />
      <Tab.Screen name="Sos" component={SosTab} />
      <Tab.Screen name="Paw" component= {PawTab} />
      <Tab.Screen name="Settings" component={SettingTab} />
    </Tab.Navigator>
  );
};

export default BottomTab;