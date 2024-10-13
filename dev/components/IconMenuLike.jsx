import {TouchableOpacity,Image, View, Text, TouchableWithoutFeedback, TouchableHighlight } from 'react-native'
import React, {useEffect, useState} from 'react';
import { icons } from '../constants';
import { useGlobalContext } from '../GlobalContext/GlobalContext';



const IconMenuLike = ({likeValue,   handleLikes,containerStyling,  menuBarStyling, ProfileStyling, bookmarkStyling, }) => {
    const [menu, setMenu] = useState(false);
  const {likeState} = useGlobalContext()


const menuConfig = ()=> {
    if(menu === false){
     setMenu(true)
    }else{
      setMenu(false);
    }
}



  return (
    <View className={containerStyling}>
    <View onTouchStart={menuConfig}
     className="">
    <Image source={icons.menu} className={menuBarStyling} resizeMode="contain"/>
    </View>
    {menu && (
 <View className="absolute z-0 right-7 w-[150px]  px-2  bg-gray-500 flex flex-col  h-10 justify-center  items-start">
   <TouchableOpacity className="w-full" onPress={handleLikes}>
  <Text className="text-gray-100 font-pbold ">{likeValue}</Text>
  </TouchableOpacity>
 
 </View>
  )}
 
</View>
  
  )
}

export default IconMenuLike;