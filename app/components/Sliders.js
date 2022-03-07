import React from 'react'
import { StyleSheet, Text, View,Dimensions } from 'react-native'
import TrackPlayer, {useProgress} from 'react-native-track-player';
import  Slider from '@react-native-community/slider'
const {width,height}= Dimensions.get('screen');
export default function Sliders(props) {
    const theme = props.theme;
    const {position,duration}=useProgress();
    const formatTime=(sec)=>{
        let minutes= Math.floor(sec/60);
        let seconds = Math.ceil(sec - minutes * 60);

        if(seconds < 10) seconds = `0${seconds}`;
        return `${minutes}:${seconds}`;
    }
    const handleChange=(val)=>{
        TrackPlayer.seekTo(val)
    }
    return (
        <View style={{alignItems:'center',width, marginTop:25}}>
       <Slider
                style={{width:width/1.2,height:20}}
                minimumValue={0}
                maximumValue={duration}
                value={position}
                minimumTrackTintColor='orange'
                maximumTrackTintColor={theme.PRIMARY_TEXT_COLOR}
                onSlidingComplete={handleChange}
                thumbTintColor="orange"
            />
        <View />
        <View style={{width:width/1.3,justifyContent:'space-between',flexDirection:'row',marginTop:10}}>
          <Text style={{color:theme.second_text_color}}>{formatTime(position)}</Text>
          <Text style={{color:theme.second_text_color}}>{formatTime(duration)}</Text>
        </View>
        
    </View>
        
        
    )
}

const styles = StyleSheet.create({
    timeContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:40,
        marginTop: -20
    }
})
