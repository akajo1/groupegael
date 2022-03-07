import React from 'react'
import { View, Text,Image,StyleSheet, TouchableOpacity,ImageBackground,Dimensions} from 'react-native'
import Style from '../styles';
import * as Animatable from 'react-native-animatable'
import ImageLoad from './ImageLoad'
const {width,height}= Dimensions.get('screen')
export default function AllWorship(props) {
    const item = props.item;
    const theme = props.theme
  
    return (
       <TouchableOpacity onPress={()=> props.navigation.navigate(props.type,{item: item})}>
            <Animatable.View animation="fadeInRight" style={{width: width/2.2}}>
               
        <ImageLoad defaultImageSource={require('../assets/default-thumb.png')} source={{uri:'https://api.groupegael.com/storage/images/'+item.picture}} style={{width: width/2.4,height: height/4.2,borderRadius:5}} resizeMethod="auto" resizeMode="cover" />
        <Text style={{color: theme.second_text_color,fontFamily:'GOTHIC', fontWeight:'bold', fontSize:16, marginTop: 5}}>{item.titre}</Text>
        <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}  >
            <Text style={{color: theme.second_text_color}}>Du {item.spreading_time}</Text>
        </View>
        </Animatable.View>
       </TouchableOpacity>
    )
}
