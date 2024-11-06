
  import { Alert } from 'react-native';
import { Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';
  import { Account } from 'react-native-appwrite';
import { useAppwrite } from './useAppWrite';
  
 export const Config = {
    endpoint : "https://cloud.appwrite.io/v1",
    platform : "com.Flair.Aora",
    projectId : "66f1678100055eae33a1",
    databaseId : "66f16b9b003bd5ec7b92",
    userCollectionId : "66f16d9a001ec0deff87",
    videoCollectionId : "66f16e0f000e68360551",
    storageId : "66f1742200378e552545"
 }

 const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId,
} = Config
// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(Config.endpoint) // Your Appwrite Endpoint
    .setProject(Config.projectId) // Your project ID
    .setPlatform(Config.platform) // Your application ID or bundle ID.
;

const account =  new Account(client);
const avatar = new Avatars(client);
const database = new Databases(client)
const storage = new Storage(client)
export async function CreateUser(email, password, username) {
    try {
      const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        username
      );
  
      if (!newAccount) throw Error;
  
      const avatarUrl = avatar.getInitials(username);
  
      await SignUp(email, password);
  
      const newUser = await database.createDocument(
        Config.databaseId,
        Config.userCollectionId,
        ID.unique(),
        {
          AccountId: newAccount.$id,
          Email: email,
          Username: username,
          Avatar: avatarUrl,
        }
      );
  
      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  }

export const SignUp = async(email,password)=> {
try {
    const session = await account.createEmailPasswordSession(email, password);
    console.log(session);
    return session;
} catch (error) {
    console.log(error);
    throw new Error(error);
}
}
//Getting the account function to know the state of the function,
export const getUserfunction = async()=> {
    try{
    const currentAccount = await account.get();
    if(!currentAccount) throw Error;
    const currentUser = await database.listDocuments(
        Config.databaseId,
        Config.userCollectionId,
        [Query.equal('AccountId', currentAccount.$id)]
  )
  if(!currentUser) throw Error;
  return currentUser.documents[0];
}catch(error){
  throw new Error(error);
}
}

// THIS IS USED TO DISPLAY THE ALREADY GOTTEN POSTS
// AND PUTS THE NEWEST POST AT THE FRONTLINE OF THE POST
export const getPost = async()=>{
    try{
    const post = await database.listDocuments(databaseId,
       videoCollectionId,
       [Query.orderDesc("$createdAt")]) 
    return post.documents
    }catch(error){
     throw new Error(error);
    }
  
}


//THIS IS USED TO GET THE TRENDING POSTS
export const getLatestVideos = async()=>{
    try{
    const post = await database.listDocuments(
        databaseId, 
        videoCollectionId,
        [Query.orderDesc("$createdAt", Query.limit(7))]
    )
    return post.documents
    }catch(error){
     throw new Error(error);
    }
  
}

// THIS IS TO SEARCHN FOR THE POSTS IN THE DATABASE THROUGH THE USE OF
//USELOCALSTORAGEPARAMS() AND USEPATHNAME()
export const SearchPost = async(query)=>{
  try{
  const post = await database.listDocuments(
      databaseId, 
      videoCollectionId,
      [Query.search("Title",query )]
  )
  return post.documents
  }catch(error){
   throw new Error(error);
  }

}


//TO REFRESH THE PAGE TO GET NEW UPDATED POSTS
export const getUserPost = async(userId)=>{
  try{
  const post = await database.listDocuments(
      databaseId, 
      videoCollectionId,
      [Query.equal('Creator', userId),  Query.orderDesc("$createdAt")])
  return post.documents;
  }catch(error){
   throw new Error(error);
  }

}


//THIS HELPS TO SIGN OUT OF THE CURRENT SESSION
export const signOut = async()=> {
  try {
    const session = await account.deleteSession("Current");
    return Alert.alert(session);
   } catch (error) {
   console.log(error);
     throw new Error(error)
  }
}
/// To handle if the file being uploaded is an image or video
const getFilePreview = async(fileId, type)=> {
  let fileUrl;
  try {
    if(type === "image"){
    fileUrl = storage.getFilePreview(storageId, fileId, 2000, 2000,"top", 100)
    }else if(type === "video"){
  fileUrl =   storage.getFileView(storageId, fileId)
    }else{
      throw new Error("Invalid file type")
    }
    if(!fileUrl) return Error;
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}


///To help upload the files after returning the fileUrl value, by using the createFile API to help upoad them online
const uploadFile = async(file, type)=>{
 if(!file) return;

  const asset= {
    name : file.fileName,
    type :  file.mimeType,
    size : file.fileSize,
    uri : file.uri
  }

  try{
   const uploadedFile = await storage.createFile(
    storageId, ID.unique(), asset
   )
   const fileUrl = await getFilePreview(uploadedFile.$id, type);
   return fileUrl;
  }catch(error){
     throw new Error(error)
  }
}



//TO UPLOAD THE THUMBNAIL FILE AND THE VIDEO FILE
export const createVideo = async(form)=> {
  try{
  const [thumbnailUrl, videoUrl] = await Promise.all([
    uploadFile(form.thumbnail, "image"), 
    uploadFile(form.video, "video")
  ])
  console.log(thumbnailUrl, videoUrl);
  const sendVideo = database.createDocument(databaseId, videoCollectionId,ID.unique(), {
    Title : form.title,
     Video : videoUrl,
     Thumbnail : thumbnailUrl,
     Prompt : form.prompt,
     Creator : form.userId
  })
  return sendVideo;
}catch(error){
  throw new Error(error);
}
}
export const getTitleVideo = async(title)=> {
  try {
    const reachTitle =  await database.listDocuments(databaseId, videoCollectionId, [Query.equal("Title", title)])
  //  console.log(reachTitle);
   return reachTitle;
  } catch (error) {
    throw new Error(error);
  }
}

//TO CHECK IF THE USER HAS SAVED THE VIDEO I.E CLICKED THE BOOKMARK BUTTON;
// export const bookmarkVideo = async(title, bookmarked)=> {
 // const checkTitle = await getTitleVideo(title);
 // console.log(checkTitle);
//console.log(checkTitle.documents[0].$id);
  //   if(!checkTitle) return;

 // try {
 // const data= {
   // Bookmark : [bookmarked]
 // }

// const reachBookMark = await database.updateDocument(databaseId, videoCollectionId, checkTitle.documents[0].$id, data)
   //  return reachBookMark;
  //} catch (error) {
   // throw new Error(error);
 // }
//}


//USEEFFECT MODE TO CHECK IF IT IS ALREADY BOOKMARKED
//export const checkBookmarkedVideo = async(title)=> {
  //const checkTitle = await getTitleVideo(title);
 // console.log(checkTitle.documents[0].$id);
   //  if(!checkTitle) return;  
  //try {
  // const checkSavedBookmark = await database.listDocuments(databaseId, videoCollectionId,
 //  [Query.search("Bookmark", checkTitle.documents[0].$id)]
 // ) 
 //return checkSavedBookmark;
 //} catch (error) {
  //  throw new Error(error)
// }
// }

 //BEGINNING OF THE LIKES FUNCTION
 export const likesVideo = async(title, user)=> {
  const checkTitle = await getTitleVideo(title);
  //console.log(checkTitle);
//console.log(checkTitle)
     if(!checkTitle) return;

  try {
    const LikeArray = checkTitle.documents[0].Like
    if(LikeArray == [] ){
      const data = [user];
 const videoLiked = await database.updateDocument(databaseId, videoCollectionId, checkTitle.documents[0].$id, {Like : data});
 return videoLiked;
    }
  else{
   // console.log("Not empty Array")
    let appendUser = LikeArray.push(user)
    console.log(LikeArray)
   const videoLiked = await database.updateDocument(databaseId, videoCollectionId, checkTitle.documents[0].$id, {Like : LikeArray});
   return videoLiked;
  }

  } catch (error) {
    throw new Error(error);
  }
}

 //USEEFFECT MODE
//export const getAllVideo = async(user)=> {
 //try {
 //const checkSavedLikes = await database.listDocuments(databaseId, videoCollectionId)
 //console.log(checkSavedLikes)
 //const likedVideos = checkSavedLikes.documents.filter(userSavedLike=>{
  //const getDoc = userSavedLike.Like && userSavedLike.Like.includes(user)
//  console.log(getDoc);
 // return getDoc
//})
//if(likedVideos == []){
   // console.log(true, likedVideos)
//}else{
 // console.log(false, likedVideos)
//}
//return likedVideos;
 //} catch (error) {
  //throw new Error(error)
// }
//}

// TO SEARCH FOR THE PARENT DOCUMENT OF THE POSTS LIKED
export const getCurrentPostDocument = async(title, user, setLikeState, setBookmarkTitle)=> {
  const checkTitle = await getTitleVideo(title);
  //console.log(title)
  if(checkTitle){
   checkTitle.documents[0].Like.forEach((element, index) => {   
   // console.log(element)
   let userId = element.$id;
   if(userId === user){
    setLikeState({
      Like : "Unlike"
    })
    if(title){
    //console.log(title)
   setBookmarkTitle(prevValue => ([...prevValue, title]))
   }
  }
    });
    
  }else{
    Alert.alert("ERROR:", "Couldn't verify likes")
  }
}


