import { View, Text, TextInput,TouchableOpacity, Image, Alert } from 'react-native';
import React, {useState} from 'react';
import { icons } from '../constants';
import { usePathname, router } from 'expo-router';

const SearchInput = ({intitialQuery}) => {
  const pathname = usePathname();
  const [query, setQuery] =  useState( intitialQuery || "");
   return(
    <View className="w-full px-4 h-16 bg-black-100 border-2 border-black-200 rounded-2xl
    focus:border-secondary flex-row items-center  space-x-4"> 
  <TextInput 
  className="mt-0.5  text-base text-white flex-1 font-bold" 
  placeholder ="Search for a video topic"
  placeholderTextColor="#CDCDE0"
  onChangeText={(e)=> {
    setQuery(e)
  }}
  value={query}
 />

 <TouchableOpacity onPress={()=>{
  if(!query){
   return Alert.alert("Missing query,", "Please input something to search for results across database" )
  }
  if(pathname.startsWith('/Search')){
    router.setParams({query})
  }else router.push(`/Search/${query}`)
 }}>
   <Image 
   source={icons.search}
   className="w-5 h-5 "/>
 </TouchableOpacity>
    </View>

   )
  
}

export default SearchInput