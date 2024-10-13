import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, {useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FieldForm from '../../components/FieldForm';
import { Video, ResizeMode } from 'expo-av';
import { icons } from '../../constants';
import CustomButton from '../../components/CustomButton';
import * as DocumentPicker from "expo-document-picker";
import { router } from 'expo-router';
import { createVideo } from '../../lib/appwrite';
import { useGlobalContext } from '../../GlobalContext/GlobalContext';
import * as ImagePicker from "expo-image-picker"
const Create = () => {
const {user} = useGlobalContext()

  const [form, setForm] = useState({
    title: "",
    video : null,
    thumbnail : null,
    prompt: ""
  })

  //FUNCTION TO GET THE THUMBNAIL OR IMAGE INTO THE APPS UI FROM THE SYSTEM UI FOR GETTING
  //PHOTOS AND VIDEOS
  const openPicker = async(selectPicker)=> {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes : selectPicker === "image" ? ImagePicker.MediaTypeOptions.Images
    : ImagePicker.MediaTypeOptions.Videos,
    aspect : [4,3],
    quality : 1
  })
 if(!result.canceled){
  if(selectPicker === "image"){
    setForm({...form, thumbnail: result.assets[0]})
   }
   if(selectPicker === "video"){
    setForm({...form, video : result.assets[0]})
   }
 }
  }



const submit = async()=> {
  if(!form.title || !form.prompt || !form.video || !form.thumbnail){
   return Alert.alert("Please fill in all the fields")
    }
    setUpload(true)
    try{
      await createVideo({
        ...form, userId : user.$id
      })
     Alert.alert("Success:","Post uploaded successfully", )
     router.push("/Home");
    }catch(error){
   throw new Error(error)
    }finally{
       setForm({
        title: "",
        video : null,
        thumbnail : null,
        prompt: ""
       });
       setUpload(false);
    }
  }
  const [upload, setUpload] = useState(false);



  return (
    <SafeAreaView className="bg-primary h-full">
     <ScrollView className="px-4 my-6">
<Text className="text-2xl text-white font-semibold">Upload Video</Text>
<FieldForm title="Title"
value={form.title}
handleChangeText={(e)=> {
  setForm({
    ...form, title: e
  })
}}
placeholder="Give your video a catchy title"
otherStyles="mt-10"/>
<View className="mt-7 space-y-2">
<Text className="text-base text-gray-100 font-medium">Upload video</Text>
<TouchableOpacity onPress={()=> openPicker("video")}>
  {form.video ? (
    <Video source={{uri : form.video.uri}} className="w-full h-64 rounded-2xl" resizeMode={ResizeMode.COVER} 
    isLooping/>
  ): (
    <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
    <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
   <Image source={icons.upload} resizeMode="contain" className="w-1/2 h-1/2"/>
    </View>
    </View>
  )}
</TouchableOpacity>
</View>

<View className="mt-7 space-y-2">
<Text className="text-base text-gray-100 font-medium">Thumbnail image</Text>
<TouchableOpacity onPress={()=> openPicker("image")}>
  {form.thumbnail? (
    <Image source={{uri : form.thumbnail.uri}} className="w-full h-64 rounded-2xl" resizeMode= "cover"/>
  ): (
    <View className="w-full h-16 px-4 bg-black-100 bprder-2 border-black-200 space-x-2 
    rounded-2xl justify-center items-center flex-row">
   <Image source={icons.upload} resizeMode="contain" className="w-5 h-5"/>
 <Text className="text-sm font-medium text-gray-100">
  Choose a file</Text>
    </View>
  )}
</TouchableOpacity>
</View>

<FieldForm title="AI Prompt"
value={form.prompt}
handleChangeText={(e)=> {
  setForm({
    ...form, prompt : e
  })
}}
placeholder="Share your video prompt"
otherStyles="mt-7"/>

<CustomButton title="Submit & Publish"
  handlePress={submit}
  containerStyle="mt-7"
  isLoading={upload}
  />
     </ScrollView>
    </SafeAreaView>
  )
}

export default Create

