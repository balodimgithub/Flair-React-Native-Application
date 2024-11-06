import { ScrollView,StyleSheet, Text, FlatList, View, VirtualizedList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUserLikedDocument } from '../../lib/appwrite';
import { getAllVideo } from '../../lib/appwrite';
import { useGlobalContext } from '../../GlobalContext/GlobalContext';
import { useAppwrite } from '../../lib/useAppWrite';
import { getPost } from '../../lib/appwrite';
import { getTitleVideo } from '../../lib/appwrite';
import VideoCard from '../../components/VideoCard';

const Bookmark = () => { 
 const {data :post} = useAppwrite(getPost);
const {bookmarkTitle, setBookmarkTitle} = useGlobalContext()
 //console.log(bookmarkTitle);
 
 const getData = post.filter((userBookmark, index)=> {
  //console.log(userBookmark.Title.includes(bookmarkTitle[index]))
  return userBookmark.Title.includes(bookmarkTitle[index])
  })

 //console.log(getData);

//console.log(like);
 //////FUNCTION TO HELP BOOKMARK WITH

//console.log(getBookMarkVideo);
//console.log(user);
return (
  <SafeAreaView className ="bg-primary flex flex-col  h-full">
     <Text className="pl-[20px] mb-4 text-base font-pbold text-gray-400">{`Total: ${getData.length}`}</Text>
       <FlatList  data={getData}
keyExtractor={(item)=> item.$id}
renderItem={({item})=> (
   <VideoCard classname="mt-[20px]" video={item} item ={item} iconView={false}/>
  )} />

    </SafeAreaView>
  )
}

export default Bookmark

