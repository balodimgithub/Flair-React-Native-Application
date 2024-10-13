import { StyleSheet, Text, View, FlatList,Image, RefreshControl } from 'react-native';
import React, {useState, useEffect} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';
import { images } from '../../constants';
import SearchInput from '../../components/SearchInput';
import Trending from '../../components/Trending';
import EmptyState from '../../components/EmptyState';
import { getPost  } from '../../lib/appwrite';
import { useAppwrite } from '../../lib/useAppWrite';
import VideoCard from '../../components/VideoCard';
import { getLatestVideos } from '../../lib/appwrite';
import { useGlobalContext } from '../../GlobalContext/GlobalContext';


const Home = () => {
const [refresh,setRefresh] = useState(false);
const {data : post, refetch} = useAppwrite(getPost);
const {data : TrendyPost} = useAppwrite(getLatestVideos);
const {user} = useGlobalContext()

const onRefresh = async()=> {
   setRefresh(true)
    await refetch()
  setRefresh(false)
 
}

  return (
  <SafeAreaView className="bg-primary h-full">
    <FlatList 
    data={post}
   keyExtractor={(item)=> item.$id}
    renderItem={({item})=>(
       <VideoCard video ={item} item = {item} />
    )}
    ListHeaderComponent={()=>(
      <View className ="px-4 my-6 space-y-6">
        <View className="justify-between items-start flex-row mb-6">
          <View>
      <Text className="text-sm font-medium font-pbold text-gray-100">Welcome to Aora</Text>
      <Text className="text-2xl font-semibold text-white">{user?.Username}</Text>
      </View>
      <View className="mt-1.5">
        <Image source={images.logoSmall}
         resizeMode="contain"
         className="w-9 h-10"/>
      </View>
      </View>
 <SearchInput />
 <View className="flex-1 w-full pt-5 pb-8 ">
  <Text className="text-gray-100 font-pblack text-lg mb-3">Latest Videos</Text>
  <Trending post={TrendyPost}/>
 </View>
      </View>
    
  )}
  ListEmptyComponent={()=>(
   <EmptyState
   title="No videos found"
   subtitle = "Be the first to create a video"
   />
  )}
  refreshControl={<RefreshControl refresh={refresh} onRefresh={onRefresh}/>}
    />
     <StatusBar backgroundColor='#FFA001' style=''/>
  </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})