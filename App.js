/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import type {Node} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import SplashScreen from './src/container/SplashScreen';
import HomeScreen from './src/container/HomeScreen';
const App: () => Node = () => {
  const [initial,setintial]=useState('splash') 
  useEffect(()=>{
    setTimeout(() => {
      setintial('home')
    }, 2000);
  },[])
  return (
    <>
      {
        initial==="splash"?<><SplashScreen/></>:<><HomeScreen/></>
      }
    </>
  );
};
export default App;
