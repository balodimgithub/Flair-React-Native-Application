import { View, Text, SafeAreaView, FlatList } from 'react-native';
import React, {useEffect} from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useAppwrite } from '../../lib/useAppWrite';
import { SearchPost } from '../../lib/appwrite';
import EmptyState from '../../components/EmptyState';
import SearchInput from '../../components/SearchInput';
import VideoCard from '../../components/VideoCard';


const Search = () => {
  const {query} = useLocalSearchParams();
   const {data : post, refetch} = useAppwrite(()=>SearchPost(query));
    //To help get data back once query changes
useEffect(()=> {
    refetch()
   },[query])
    
     return (
      <SafeAreaView className="bg-primary  h-full">
        <FlatList 
        data={post}
       keyExtractor={(item)=> item.$id}
        renderItem={({item})=>(
           <VideoCard video ={item} item = {item}/>
        )}
        ListHeaderComponent={()=>(
          <View className ="px-4 my-20">
              <Text className="text-sm font-medium font-pbold text-gray-100">Search Result</Text>
          <Text className="text-2xl font-semibold text-white">{query}</Text>
          <View className="mt-6 mb-8 ">
          <SearchInput initialQuery={query}/>
          </View>
         
    
          </View>
        
      )}
      ListEmptyComponent={()=>(
       <EmptyState
       title={`The search "${query}" could not be found `}
       subtitle = "You can kindly search for something else"
       />
      )}
     
        />
       
      </SafeAreaView>
      )
    }
      
  
export default Search;