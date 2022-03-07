import React,{useEffect,useRef,useState} from 'react'
import { View,StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import TrackPlayer,{usePlaybackState} from 'react-native-track-player'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
export default function Controller({onNext,onPrv,theme}) {
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
                return <Icon name="pause" color={theme.PRIMARY_TEXT_COLOR} size={45}/>;
            case 'paused':
                    return <Icon name="play" color={theme.PRIMARY_TEXT_COLOR} size={45}/>;
            default:
                return <ActivityIndicator size={45} color={theme.PRIMARY_TEXT_COLOR}/>;
        }
    }
    const onPlayPause=()=>{
        if(playBackState === "playing" || playBackState === 3){
            TrackPlayer.pause();
        }else if(playBackState ==='paused' || playBackState === 2){
            TrackPlayer.play();
        }
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>{onPrv()}} style={styles.btn}>
                <Icon name="skip-previous" color={theme.PRIMARY_TEXT_COLOR} size={38}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> onPlayPause()} style={[styles.btn,{width: 100,height:100,borderRadius:50,backgroundColor: 'orange',marginHorizontal:15}]}>
                {renderPlayPauseBtn()}
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{onNext()}} style={styles.btn}>
                <Icon name="skip-next" color={theme.PRIMARY_TEXT_COLOR} size={38}/>
            </TouchableOpacity>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'center',
        width:'80%',
        height: 100,
        alignItems:'center',
        marginHorizontal:'10%'
    },
    btn:{
        width: 50,
        height:50,
        borderRadius:25,
        alignItems:'center',
        justifyContent:'center'
    }
})