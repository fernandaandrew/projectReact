import React, {useContext} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DetailLaporanScreen from '../screens/DetailLaporanScreen';
import FormLaporanScreen from '../screens/FormLaporanScreen';
import FormEditLaporanScreen from '../screens/FormEditLaporanScreen';
import {AuthContext} from '../context/AuthContext';
import SplashScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const {userInfo, splashLoading} = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CONTENT" component={ContentNavigator} options={{headerShown: false}}/>
        <Stack.Screen
          name="LOGIN"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="REGISTER"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const ContentNavigator=()=>{
  return(
    <Stack.Navigator>
      <Stack.Screen name="HOME" component={HomeScreen} />
      <Stack.Screen name="DETAILLAPORAN" component={DetailLaporanScreen} />
      <Stack.Screen name="UBAHLAPORAN" component={FormEditLaporanScreen} />
      <Stack.Screen name="TAMBAHLAPORAN" component={FormLaporanScreen} />
    </Stack.Navigator>
  )
}
export default Navigation;