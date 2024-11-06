import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import { useAppwrite } from '../../lib/useAppWrite';
import EmptyState from '../../components/EmptyState';
import SearchInput from '../../components/SearchInput';
import VideoCard from '../../components/VideoCard';
import { getUserPost } from '../../lib/appwrite';
import { useGlobalContext } from '../../GlobalContext/GlobalContext';
import { icons } from '../../constants';
import Infobox from '../../components/InfoBox';
import { signOut } from '../../lib/appwrite';
import { router } from 'expo-router';
import { checkLikedVideo } from '../../lib/appwrite';
const Profile = () => {
//The Global context va;ues
const {user, setUser,setLoginAuto} = useGlobalContext()
//console.log(user);
  const {data : post} = useAppwrite(()=>getUserPost(user.$id));

   //To help get data back once query changes

 const logout= async()=> {
   await signOut();
   setUser(null);
   setLoginAuto(false);
   router.replace("/SignIn");
 }
 
  return (
    <SafeAreaView className="bg-primary  h-full">
    <FlatList 
    data={post}
   keyExtractor={(item)=> item.$id}
    renderItem={({item})=>(
       <VideoCard video ={item} item = {item}/>
    )}
    ListHeaderComponent={()=>(
    <View className="w-full justify-center items-center mt-6 mb-20 px-4">
      
    <TouchableOpacity
     className="w-full items-end "
     onPress={logout}> 
      <Image source={icons.logout} className="w-6 h-6 mt-20" resizeMode="contain" />
    </TouchableOpacity>

    <View className="w-16 h-16 border border-secondary  rounded-lg justify-center items-center">
   <Image source={{uri : user?.Avatar}} className="w-[99%] h-[100%] rounded-lg" resizeMode='cover'/>
    </View>
    <Infobox title={user?.Username}
    containerStyles='mt-5'
    titleStyles="text-lg"
    />
    
    <View className="mt-5 flex-row">
    <Infobox title={post.length || 0}
    subtitle="Post"
    containerStyles='mt-5 mr-10'
    titleStyles="text-xl"
    />
    <Infobox title="1.2k"
    subtitle="Followers"
    containerStyles='mt-5'
    titleStyles="text-xl"
    />
    </View>


    </View>
    
  )}
  ListEmptyComponent={()=>(
   <EmptyState
   title={`The search could not be found `}
   subtitle = "You can kindly search for something else"
   />
  )}
 
    />
   
  </SafeAreaView>
  )
}

export default Profile;


