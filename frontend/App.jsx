import React, {useCallback} from 'react';
import {View} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

import { NavigationContainer } from '@react-navigation/native';
import BottomTab from './components/navigation/bottomTab.jsx';

import globalStyles from './style/global.jsx';
import {useFonts} from 'expo-font'

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    'frank-regular' : require('./assets/fonts/FrankRuhlLibre-Regular.ttf')
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
        <BottomTab/>
      </NavigationContainer>
    </View>
  );
}
