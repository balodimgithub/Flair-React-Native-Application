import React, {useState, useEffect, useContext,createContext} from 'react';
import { getUserfunction } from '../lib/appwrite';


const GlobalContext = createContext();


export const useGlobalContext = () => useContext(GlobalContext)

export const GlobalProvider = ({children})=>{
    const [loginAuto, setLoginAuto] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
   
   //LIKESTATE VALUES
   


    useEffect(()=>{
     getUserfunction().then((response)=>{
        if(response){
            setLoginAuto(true);
            setUser(response)
        }else{
            setLoginAuto(false);
            setUser(null)
        }
     }).catch((error)=>{
        throw new Error(error)
     }).finally(()=>{
        setIsLoading(false)
     })
    },[])
 
return(
    
    <GlobalContext.Provider value={{
    loginAuto,setLoginAuto, user, setUser,setIsLoading
    }}>
        {children}
    </GlobalContext.Provider>
)
}