import React, {useState, useEffect, useContext,createContext} from 'react';
import { getUserfunction } from '../lib/appwrite';
import { getPost } from '../lib/appwrite';
import {useAppwrite} from "../lib/useAppWrite";



const GlobalContext = createContext();


export const useGlobalContext = () => useContext(GlobalContext)

export const GlobalProvider = ({children})=>{
    const [loginAuto, setLoginAuto] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [bookmarkTitle, setBookmarkTitle] = useState([])
    
    
   
 





 
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
        bookmarkTitle, setBookmarkTitle,  
        loginAuto,setLoginAuto, user, setUser,setIsLoading
        
        
    }}>
        {children}
    </GlobalContext.Provider>
)
}