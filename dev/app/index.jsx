import { Text, View, ScrollView, Image} from 'react-native';
import {router, Redirect} from "expo-router"
import React, {useState} from 'react';
import {StatusBar} from "expo-status-bar";
import { SafeAreaView } from 'react-native-safe-area-context';
import {images} from "../constants";
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../GlobalContext/GlobalContext';

const App = () => {
  const [isSubmitting] = useState(false);

const {loginAuto, isLoading } = useGlobalContext();

if(!isLoading && loginAuto) return<Redirect href="/Home"/>
  return (
   <SafeAreaView className="bg-primary h-full">
<ScrollView contentContainerStyle={{height : "105%"}}>
 <View className="px-4 w-full justify-center items-center min-h-[85vh]">
  <Image source={images.logo}
  className="w-[130px] h-[84px]"
  resizeMode='contain'/>
  <Image source={images.cards} className="max-w-[380px] w-full h-[300px]"/>
 <View className='relative mt-5'>
  <Text className="text-3xl text-center  text-white font-bold">
    Discover Endless Possibilities with {""}
    <Text className="text-secondary-200">Aora</Text></Text>
 <Image source={images.path} 
    className="absolute -bottom-2 -right-8 w-[136px] h-[15px]"
    resizeMode ="contain"/>
 </View> 
 <Text className="text-sm font-[sans-serif] text-center text-gray-100 mt-7">
  Where Creativity meets innovations: embark on a journey with limitless exploration with Aora
  </Text>

  <CustomButton
  title ="Continue with email"
  handlePress={()=>router.push("/SignIn")}
  containerStyle= "w-full mt-7"
  isLoading={isSubmitting}
  
  />
 </View>
</ScrollView>
<StatusBar backgroundColor='#FFA001' style="light"/>
   </SafeAreaView>
  )
}

export default App

