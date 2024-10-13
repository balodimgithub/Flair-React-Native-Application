import {useState, useEffect} from "react";
import { Alert } from "react-native";



export const useAppwrite = (fn)=>{
// USESTATES
    const [data, setData] = useState([]);
const [isLoading, setIsLoading] = useState(true);

 //FETCHDATA() TO RETRIEVE VIDEO COLLECTION
const fetchData = async()=> {
    setIsLoading(true);
    try{
     const response = await fn();
     if(response){
       setData(response);
      // console.log(response)
     }
    }catch(error){
   Alert.alert("ERROR:", error.message)
 }
  finally{
    setIsLoading(false);
  
  }
}
useEffect(()=> {
fetchData();
     },[])

 const refetch = ()=> fetchData();
    return {data, refetch, isLoading}
}
