import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, {useState} from 'react';
import { TextInput } from 'react-native';
import {icons} from "../constants";

const FieldForm = ({title, handleChangeText, value, placeholder, otherStyles, ...props}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-6 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-medium">{title}</Text>
      <View className="w-full px-4 h-16 bg-black-100 border-2 border-black-200 rounded-2xl
      focus:border-secondary items-center flex-row"> 
    <TextInput 
    className="text-base text-white flex-1 font-semibold" 
    placeholder ={placeholder}
    placeholderTextColor="#7b7b8b"
    onChangeText={handleChangeText}
    value={value}
    secureTextEntry={title === "Password" && !showPassword}/>

    {title === "Password" && (
        <TouchableOpacity onPress={()=>setShowPassword(!showPassword)}>
            <Image source ={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6"/>
        </TouchableOpacity>
    )}
      </View>
    </View>
  )
}

export default FieldForm