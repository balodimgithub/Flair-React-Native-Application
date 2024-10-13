import { View, Text,Image, TouchableOpacity, Alert } from 'react-native';
import React, {useEffect, useState} from 'react';
import { icons } from '../constants';
import { Video, ResizeMode } from 'expo-av';
import IconMenuLike from './IconMenuLike';
import { bookmarkVideo } from '../lib/appwrite';
import { likesVideo } from '../lib/appwrite';
import { useGlobalContext } from '../GlobalContext/GlobalContext';
import { useAppwrite } from '../lib/useAppWrite';
import { checkLikedVideo } from '../lib/appwrite';
import { getCurrentPostDocument } from '../lib/appwrite';

const VideoCard = ({item,video : {Title, Thumbnail,  Propmt, Creator : {Username, Avatar, $id}}}) => {
    const [play, setPlay] = useState(false);
    const {user} = useGlobalContext()
    // const {data : likes} = useAppwrite(()=> checkLikedVideo(Title))
     const [likeState, setLikeState] = useState({
    id : item.$id,  likes : "Like",
   })
  
  //console.log(item);
  //const returnLikedPost = (item)=> {
    // return item = likeState.likes === "Unlike";
 // }
const getUserLikes = (item, user)=> {


  }


  const [showBookmark, setShowBookmark] = useState({
    id : item.$id  ,item : item, 
    userLikedVideo : getUserLikes(item)
    })
 //console.log(showBookmark);
    
    //console.log(showBookmark.userLikedVideo);
//GET THE VIDEOS LIKED
//console.log(likes[3]);
//console.log(item.Like[0])
   const getLikes = async()=> {
       if(likeState.likes === "Like"){
       await likesVideo(Title, user.$id)

      // Checking the like state
       if(likesVideo){
       setLikeState({
        likes : "Like"
       })
     }
     }else if(likeState.likes === "Unlike"){
       console.log("Unlike Function ready to run")
      }
    }
    useEffect(()=>{
        getCurrentPostDocument(Title, user.$id, setLikeState)
        if(getCurrentPostDocument) getUserLikes(item, user);
     },[likesVideo])
    // useEffect(()=> {
    //  const fetchData = (item)=> {
      //  if(item.Like){
    // setLikeState("Unlike")
     //   }
     // }
    // })

    // GET THE VIDEO BOOKMARKED
   // const getTitle = async()=> {
      //await bookmarkVideo(Title, $id)
      //if(bookmarkVideo){
       // setLikeState({
       //   likes : "Like",
       //   Bookmark : "Bookmarked"
       // })
     // }else{
      //  Alert.alert("ERROR:","Failed to bookmark this post to your saved videos")
     // }
//}


  return (
    <View className="flex flex-col items-center px-4 mb-14">
        <View className="flex-row gap-3 items-start mb-8">

        <View className="items-center flex-row flex-1">
            <View className="w-[46px] h-[46px] rounded-lg border-2 border-secondary justify-center items-center">
                <Image className="w-full h-full rounded-lg" source={{uri : Avatar}} resizeMode='cover'/>
 </View>
 <View className="justify-center flex-1 ml-3 gap-y-1">
   <Text className="text-white text-sm font-semibold" numberOfLines={1}>{Username}</Text> 
   <Text className="text-xs text-gray-100 font-bold" numberOfLines={1}>{Title}</Text>
 </View>
        </View>
<IconMenuLike likeValue={likeState.likes}
handleLikes={(e)=> getLikes(e)}
containerStyling="pt-2 flex-row gap-4 relative"
 menuBarStyling="w-5 h-5"
 
/>
        </View>
   {play ? (
    <Video className="w-full h-60 bg- rounded-xl mt-3" source={{uri : item.Video }}
    useNativeControls shouldPlay resizeMode={ResizeMode.CONTAIN} 
    onPlaybackStatusUpdate={(status)=> {
     if(status.didJustFinish){
      setPlay(false);
     }
    }}/>
   ): (
   <TouchableOpacity activeOpacity={0.7}
   onPress={()=>setPlay(true)}
    className="w-full h-60 rounded-xl mt-3 relative justify-center items-center">
    <Image className="w-full h-full rounded-xl mt-3" resizeMode="cover" source={{uri: Thumbnail}} />
    <Image source={icons.play} className="w-12 h-12 absolute top-20" resizeMode="contain"/>
   </TouchableOpacity>
   )}
    <View className="flex justify-end mt-5">
      <Text className="text-sm text-gray-100 font-pbold font-medium">{`Likes: ${item.Like ? item.Like.length : 0}`}</Text>
    </View>
    </View>
  )
}

export default VideoCard