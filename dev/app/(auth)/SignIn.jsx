import { StyleSheet, Text, View, ScrollView, Image, Alert} from 'react-native';
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import {images} from "../../constants";
import FieldForm from '../../components/FieldForm';
import CustomButton from '../../components/CustomButton';
import { Link } from 'expo-router';
import {SignUp } from '../../lib/appwrite';
import { router } from 'expo-router';
import { useGlobalContext } from '../../GlobalContext/GlobalContext';
import { getUserfunction } from '../../lib/appwrite';

const SignIn = () => {
    const [form, setForm] = useState({
        email : '',
        password : "",
    })
    const {setUser, setLoginAuto} = useGlobalContext();
    
   const [isSubmitting, setIsSubmitting] = useState(false);

 const Submit = async()=> {
    try{
    if(!form.email|| !form.password){
      Alert.alert("ERROR: Please fill in all the fields")
    }else{
 await SignUp(form.email, form.password);
 const result = await getUserfunction()
 console.log(result);
  setUser(result);
   setLoginAuto(true);
      Alert.alert("Login successfully");
      setIsSubmitting(true);
      router.replace("/Home");
    }
  }catch(error){
  console.log(error);
  throw Error(error)
   }finally{
    setIsSubmitting(false);
   }
  }

 

  return (
     <SafeAreaView className="h-full bg-primary">
      <ScrollView>
      <View className ="w-full justify-center  min-h-[86vh] px-4 my-6">
      <Image source ={images.logo} className="w-[115px] h-[35px]" resizeMode ="contain" />
      <Text className='text-2xl text-white text-semibold mt-10 font-semibold'>Log in to Aora</Text>

      <FieldForm title="Email"
      value ={form.email}
      handleChangeText={(e)=> setForm({
        ...form, email : e })}
        otherStyles="mt-7"
        keyboardType="email-address"
      />
       <FieldForm title="Password"
      value ={form.password}
      handleChangeText={(e)=> setForm({
        ...form, password : e })}
        otherStyles="mt-7"
      />
      <CustomButton
      title = "Sign In"
      handlePress = {Submit}
      isLoading={isSubmitting}
      containerStyle="mt-7"
      />

      <View className ="justify-center items-center pt-5 gap-2 flex-row">
        <Text className="text-lg font-semibold text-gray-100">Don't have an account?</Text>
    <Link href="/SignUp" className='text-secondary text-lg font-semibold' >Sign Up</Link>
      </View>
      </View>
      </ScrollView>
     </SafeAreaView>
  )
}

export default SignIn;

const styles = StyleSheet.create({})