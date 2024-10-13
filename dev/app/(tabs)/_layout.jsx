import { Tabs, Redirect } from 'expo-router';
import React from 'react';
import {View, Text,Image} from "react-native";
import {icons} from "../../constants"

export default function TabLayout() {
  const TabIcon = ({color, name, focused, icon})=> (
    <View className="flex flex-col items-center justify-center gap-[3px]">
    <Image source={icon}
    resizeMode='contain'
    tintColor={color}
    className="w-6 h-6"/>
    <Text style={{color : color}} className={`${focused ? "font-bold " : "font-[sans-serif] text-black"}`}>{name}</Text>
    </View>
)

  return (
   <>
   <Tabs screenOptions={{
    tabBarShowLabel : false,
    tabBarActiveTintColor : "#FFA001",
    tabBarInActiveTintcolor : "CDCDE0",
    tabBarStyle : {
      backgroundColor : "#161622",
      borderTopWidth : 1,
      borderTopColor : "#232533",
      height: 84
    }
   }}
   >

    
    <Tabs.Screen name='Home'
    options={{
      title : "Home",
      headerShown : false,
      tabBarIcon : ({color, focused}) => (
    <TabIcon name="Home"
    color={color}
    focused= {focused}
    icon ={icons.home}/>
      )
    }}/>

<Tabs.Screen name='Bookmark'
    options={{
      title : "Bookmark",
      headerShown : false,
      tabBarIcon : ({color, focused}) => (
    <TabIcon name="Bookmark"
    color={color}
    focused= {focused}
    icon ={icons.bookmark}/>
      )
    }}/>

<Tabs.Screen name='Create'
    options={{
      title : "Create",
      headerShown : false,
      tabBarIcon : ({color, focused}) => (
    <TabIcon name="Create"
    color={color}
    focused= {focused}
    icon ={icons.plus}/>
      )
    }}/>

<Tabs.Screen name='Profile'
    options={{
      title : "Profile",
      headerShown : false,
      tabBarIcon : ({color, focused}) => (
    <TabIcon name="Profile"
    color={color}
    focused= {focused}
    icon ={icons.profile}/>
      )
    }}/>
   </Tabs>
   
   </>
  );
}
