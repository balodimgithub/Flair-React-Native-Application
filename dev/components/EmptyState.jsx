import { View, Text, Image} from 'react-native';
import React from 'react';
import { images } from '../constants';
import { router } from 'expo-router';
import CustomButton from './CustomButton';


const EmptyState = ({title, subtitle}) => {
  return (
    <View className="w-full justify-center items-center px-4">
        <Image className="w-[217px] h-[215px]" source={images.empty} resizeMode="contain"/>

     
          <View className="flex flex-col gap-2">
          <Text className="text-xl font-semibold text-center  text-white">{title}</Text>
      <Text className="text-sm text-center font-medium font-pbold text-gray-100">{subtitle}</Text>
      </View>
      <CustomButton title="Create Video"
      handlePress={()=> {router.push("/Create")}}
      containerStyle="w-full my-5"
      />
    </View>
  )
}

export default EmptyState