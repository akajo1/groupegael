import React from 'react'
import { View, Text,Image,TouchableOpacity,StyleSheet,Dimensions,ImageBackground} from 'react-native'
import Style from '../styles';
import * as Animatable from 'react-native-animatable'
import now from './moment'
const {width,height}= Dimensions.get('screen')


import ImageLoad from './ImageLoad'

export default function MeditationItem(props) {
    const item = props.item;
    const theme = props.theme
  
    return (
       
         <TouchableOpacity onPress={()=> props.navigation.navigate(props.type,{item:item})}>
            <Animatable.View animation="fadeInRight" style={{width: width/2,marginHorizontal:5}}>
            <ImageLoad defaultImageSource={require('../assets/default-thumb.png')} source={{uri:'https://api.groupegael.com/storage/images/'+item.picture}} style={{width: width/2,height: height/4.2,borderRadius:5}} resizeMode='cover' />

        <Text style={{color:theme.second_text_color,fontFamily:'GOTHIC', fontWeight:'bold', fontSize:16, marginTop: 5,width: width/2.1}}>{item.titre.substr(0,40)}</Text>
        <Text style={{color:theme.second_text_color}}>il y a {now(item.updated_at).fromNow(now.locale())}</Text>
        </Animatable.View>
       </TouchableOpacity>
    )
}
