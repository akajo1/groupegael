import React from 'react'
import { View, Text, TouchableOpacity,ImageBackground,Dimensions } from 'react-native'
import Style from '../styles'
import ImageLoad from './ImageLoad'
import * as Animatable from 'react-native-animatable';

const {width,height}=Dimensions.get('screen')
export default function Album(props) {
    const item = props.item;
    const theme = props.theme

  return (
    <TouchableOpacity
    onPress={()=> props.onChangeAlbum(item.id)} 
    style={[Style.livre,{width: width/2.6,height: height/4,shadowColor:theme.second_text_color,marginHorizontal:6, shadowOffset:{width:10,height:10},shadowOpacity:5,shadowRadius: 5}]}
    >
  
          <Animatable.View animation="fadeInRight">
          <ImageLoad defaultImageSource={require('../assets/default-thumb.png')} source={{uri:'https://api.groupegael.com/storage/images/'+item.picture}} style={{width: width/2.6,height: height/5,shadowOffset:{width:10,height:10},shadowOpacity:5,shadowRadius: 5, borderRadius:10}} resizeMode='cover' />

<Text style={{color:'#ff8f00',fontWeight:'bold'}}>{item.titre}</Text>
<Text style={{color:theme.second_text_color,fontSize:12}}>{item.auteur}</Text>
              </Animatable.View>

    </TouchableOpacity>
    )
}
