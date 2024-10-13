import { Text, View, ScrollView, Image, Alert} from 'react-native';
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import {images} from "../../constants";
import FieldForm from '../../components/FieldForm';
import CustomButton from '../../components/CustomButton';
import { Link,router } from 'expo-router';
import { CreateUser } from '../../lib/appwrite';
import { useGlobalContext } from '../../GlobalContext/GlobalContext';


const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {setUser, setLoginAuto} = useGlobalContext();
    const [form, setForm] = useState({
        email : '',
        password : "",
        username : "",
    })
   const Submit = async()=> {
    if(form.email=== "" || !form.username === ""  || !form.password=== ""){
      Alert.alert("ERROR: Please fill in all the field")
    }
    setIsSubmitting(true);
    try{
   const result = await CreateUser(form.email, form.password,form.username);
   setUser(result)
   setLoginAuto(true)
      Alert.alert("Account Created successfully");
     router.replace("/Home");
    }
   catch(error){
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



      <FieldForm title="Username"
      value ={form.username}
      handleChangeText={(e)=> setForm({
        ...form, username : e })}
        otherStyles="mt-10"
      />
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
      title = "Sign Up"
      handlePress = {Submit}
      isLoading={isSubmitting}
      containerStyle="mt-7"
      />

      <View className ="justify-center items-center pt-5 gap-2 flex-row">
        <Text className="text-lg font-semibold text-gray-100">Have an account?</Text>
    <Link href="/SignIn" className='text-secondary text-lg font-semibold' >Sign In</Link>
      </View>
      </View>
      </ScrollView>
     </SafeAreaView>
  )
}

export default SignUp;

