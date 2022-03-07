import React,{useState,useEffect} from 'react'
import { View, Text,TouchableOpacity,Dimensions, ActivityIndicator} from 'react-native'
import ImageLoad from './ImageLoad'
import Icon from 'react-native-vector-icons/FontAwesome'
import SoundPlayer from 'react-native-sound-player'
import {connect} from 'react-redux';
import TrackPlayers,{usePlaybackState} from 'react-native-track-player'
const {width,height}= Dimensions.get('screen')
function TrackPlayer({read,dispatch}) {  

  const playBackState= usePlaybackState();
    const [isPlaying, setIsPlaying]= useState("loading");
    useEffect(() => {
        if(playBackState ==='playing' || playBackState === 3){
           setIsPlaying("playing");
        }else if(playBackState ==='paused' || playBackState === 2){
            setIsPlaying("paused");
        }else{
            setIsPlaying("loading");
        }
    }, [playBackState])

    const renderPlayPauseBtn=()=>{
      switch (isPlaying) {
          case 'playing':
              return <Icon name="pause" size={22} color="white"/>;
          case 'paused':
                  return <Icon name="play" size={22} color="white"/>;
          default:
              return <ActivityIndicator size={24} color="#fff"/>;
      }
  }
  const onPlayPause= ()=>{
      if(playBackState === "playing" || playBackState === 3){
         TrackPlayers.pause();
      }else if(playBackState ==='paused' || playBackState === 2){
         TrackPlayers.play();
      }
  }
  const onStop= ()=>{
    TrackPlayers.stop();
    const action_two ={
      type:'STOP'
    }
    dispatch(action_two)


  }
    return (
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',position:'absolute',zIndex:99,bottom:75,width:width-20,paddingHorizontal:20,backgroundColor:'orange',paddingVertical:5,borderRadius:20,left:10,right:10}}>
            <TouchableOpacity onPress={()=>{}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <ImageLoad defaultImageSource={require('../assets/default-thumb.png')} source={{uri: read.artwork}} style={{width: 40,height: 40,borderRadius:20,marginRight:10}} resizeMethod="auto" resizeMode="cover" />
            <Text style={{color:'#fff'}}>{read.title}</Text>
                </View>
            </TouchableOpacity>
           <View style={{flexDirection:'row',alignItems:'center',}}>
           <TouchableOpacity onPress={()=> onPlayPause()} style={{marginRight:20}}>
            
            {renderPlayPauseBtn()}
          
            </TouchableOpacity>
           

            <TouchableOpacity onPress={()=> onStop()}>
          
          <Icon name="window-close" size={22} color="white"/>
          </TouchableOpacity>
           </View>
           
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
      song: state.PlayerSong.song,
      
    };
  };
  export default connect(mapStateToProps)(TrackPlayer);
