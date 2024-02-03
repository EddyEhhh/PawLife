import {Text, View} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

import BottomTab from './components/navigation/bottomTab.jsx';

import styles  from './style/global.jsx';

export default function App() {
  return (
    <NavigationContainer>
      <View style = {styles.container}>
        <BottomTab/>
      </View>
    </NavigationContainer>
  );
}


