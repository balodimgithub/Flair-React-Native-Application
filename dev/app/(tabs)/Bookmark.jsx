import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUserLikedDocument } from '../../lib/appwrite';
import { getAllVideo } from '../../lib/appwrite';
import { useAppwrite } from '../../lib/useAppWrite';
import { useGlobalContext } from '../../GlobalContext/GlobalContext';
import { getAllUserLikedPost } from '../../lib/appwrite';
const Bookmark = () => { 
  const {user} = useGlobalContext()
const {data : userLike} = useAppwrite(()=>getAllUserLikedPost(user));
//const [getLikeId, setGetLikeId] = useState("")

console.log(userLike);
 //const triggerGetuserPost = async()=> {
 // await getUserLikedDocument()
 //}
 //useEffect(()=> {
 //getUserLikedDocument(allVideo, user);
//})
//console.log(allVideo)


  return (
    <View className="flex justify-center h-full bg-primary  items-center">
      <Text className="text-white">Bookmark</Text>
    </View>
  )
}

export default Bookmark

const styles = StyleSheet.create({})