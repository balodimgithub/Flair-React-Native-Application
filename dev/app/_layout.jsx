import {StyleSheet, Text, View} from "react-native";
import React, { useEffect } from "react";
import { Slot, Stack, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import {GlobalProvider} from '../GlobalContext/GlobalContext';

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
   const [FontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
   })
   useEffect(()=>{
    if(error) throw error;
    if(FontsLoaded) SplashScreen.hideAsync()
   }, [FontsLoaded, error])
if(!FontsLoaded && !error) return null;

return (
  <GlobalProvider>
  <Stack screenOptions={{
    headerStyle : {
      backgroundColor: '#FFA001'
    },
    headerTintColor : "#000",
    headerTitleStyle : {
      fontWeight : 'bold'
    }
  }}>
 <Stack.Screen name ="index" options={{headerShown : false}}   />
 <Stack.Screen name ="(auth)" options={{headerShown : false}}   />
 <Stack.Screen name ="(tabs)" options={{headerShown : false}}   />
 <Stack.Screen name ="Search/[query]" options={{headerShown : false}}   />
    </Stack>
</GlobalProvider>
    
  );
}
