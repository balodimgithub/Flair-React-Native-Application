import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native';
import React, {useState} from 'react';
import * as Animatable from "react-native-animatable";
import { icons } from '../constants';
import {Video, ResizeMode} from "expo-av";

const zoomIn ={
  0:{
    scale : 0.9
  },
  1: {
    scale : 1.1
  }
}

const zoomOut = {
  0:{
    scale : 1.1
  },
  1 : {
    scale : 0.9
  }
}

// ITEM TO  ACTUALLY BE RENDERED  IN TRENDING FLATLIST COMPONENT
const TrendingItem = ({activeItem, item})=> {
  const [play, setPlay] = useState(false);

   return (
    <Animatable.View className="mx-4"
    animation={activeItem === item.$id ? zoomIn : zoomOut}
    duration={500}>
     {play ? (
  <Video className="w-52 h-72 bg-white/10 rounded-[35px] mt-3" source={{uri : item.Video}}
  useNativeControls shouldPlay resizeMode={ResizeMode.CONTAIN} 
  onPlaybackStatusUpdate={(status)=> {
   if(status.didJustFinish){
    setPlay(false);
   }
  }}/>
  ) : (
    <TouchableOpacity className="relative justify-center  items-center"
    activeOpacity={0.7}
    onPress={()=> setPlay(true)}>
 <ImageBackground  source={{uri : item.Thumbnail}} className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
 resizeMode="cover"/>
 <Image source={icons.play} className="w-12 h-12 absolute" resizeMode="contain"/>
    </TouchableOpacity>
  )}
    </Animatable.View>
   )
}

//TRENDING COMPONENT RENDERED IN THE HOME COMPONENT
const Trending = ({post}) => {
const [activeItem, setActiveItem] = useState(post[1]);

const viewableItemsChanged = ({viewableItems})=> {
  if(viewableItems.length > 0){
    setActiveItem(viewableItems[0].key)
  
  }
}

  return (
    <FlatList data={post}
    keyExtractor={(item)=> item.$id}
    renderItem={({item})=> (
<TrendingItem activeItem={activeItem} item ={item}/>
  )} 
  onViewableItemsChanged={viewableItemsChanged}
  viewabilityConfig={{
    itemVisiblePercentThreshold: 70
  }}
  contentOffset={{x : 170}}
  horizontal/>
)
}

export default Trending