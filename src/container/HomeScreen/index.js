import React, { useEffect, useRef, useState } from "react";
import {TouchableOpacity,View,Text, ScrollView,Image, FlatList, Dimensions}from "react-native";
import styles from "./style";
import VideoRecorder from "react-native-beautiful-video-recorder/lib";
import CameraRoll from "@react-native-community/cameraroll"
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createThumbnail } from "react-native-create-thumbnail";
const HomeScreen=()=>{
    const [datas,setData]=useState(null);
    const cameraRef = useRef(null);
    const saveData=async(newVideo)=>{
      const path=await AsyncStorage.getItem('videopath')// get the previous video path from local storage 
      if (path!=null) {
        var pathObj = JSON.parse(path);//convert the json string path to array object
        pathObj.push({uri:newVideo})
        var arr=[];
        for (let i = 0; i < pathObj.length; i++) {
           //get the thumbnail image based from the videopath
          var getpath=await createThumbnails(pathObj[i].uri)
          arr.push({uri:getpath.path})
        }
        setData(arr)//local state to manage the thumbnail images
        AsyncStorage.setItem('videopath',JSON.stringify(pathObj)) //save the path to the local storage
      }else{
        var pathObj=[{
          uri:newVideo
        }];
        const arr=[];
        for (let i = 0; i < pathObj.length; i++) {
           //get the thumbnail image based from the videopath 
          var getpath=await createThumbnails(pathObj[i].uri)
          arr.push({uri:getpath.path})
        }
        setData(arr)//local state to manage the thumbnail images
        AsyncStorage.setItem('videopath',JSON.stringify(pathObj))//save the path to the local storage
      }
    }
    const videoRecord = async () => {
      //function for enable the eamera
       if( cameraRef && cameraRef.current ) {
         cameraRef.current.open({ maxLength: 30 },(data) => {
           console.log('captured data', data); // data.uri is the file path
           CameraRoll.save(data.uri)// save the video to the phone storage
           saveData(data.uri);// save the video path to local storage
         });
       }
    }

    const createThumbnails=async(uri)=>{
      //function for getThumnail with 5 second from the video
      var path=await createThumbnail({
        url: uri,
        timeStamp: 5000,
      })
        .then(response => {
          return response;
        })
        .catch(err => console.log({ err }));
        return path;
    }
    const getVideo=async()=>{
      const path=await AsyncStorage.getItem('videopath')
      const pathObj=JSON.parse(path)
      var arr=[]
      for (let i = 0; i < pathObj.length; i++) {
        //get the thumbnail image based from the videopath
        var getpath=await createThumbnails(pathObj[i].uri)
        arr.push({uri:getpath.path})
      }
      setData(arr)//local state to manage the thumbnail images
    }

    
    useEffect(()=>{
      //intial getvideos from local storage
      getVideo();
      
    },[])
    return(
        <View style={styles.container}>
          {
            datas===null?
            <>
          <View style={styles.nodataContainer}>
              <Text style={styles.nodataText}>Video's are not available{'\n'}Please Click the Video Button to add videos</Text>
          </View>
            </>:<View style={{flex:1}}>
                <FlatList
                data={datas}
                contentContainerStyle={{paddingVertical:20}}
                // keyExtractor={item=>item}
                renderItem={({item})=>(
                  <View style={{padding:3}}>
                      <Image
                  source={{uri:item.uri}}
                  style={{width:Dimensions.get('screen').width/2,height:Dimensions.get('window').width/2}}
                  />
                  </View>
                  )}
                  numColumns={2}
                />
                
                
            </View>
          }
        
          <VideoRecorder ref={cameraRef} type={"front"}/>
          <TouchableOpacity style={styles.videorecordButton}
          onPress={()=>{
            videoRecord();
          }}
          >
              <Icon
              name="videocam"
              size={30}
              color="#fff"
              />
          </TouchableOpacity>
       
        </View>
    );
}
export default HomeScreen;