import React from 'react'
import { View, Text, TouchableOpacity,ImageBackground,Dimensions } from 'react-native'
import Style from '../styles'
import ImageLoad from './ImageLoad'
import * as Animatable from 'react-native-animatable';
const {width,height}= Dimensions.get('screen');
export default function Livre(props) {
    const theme = props.theme
    return (
        <TouchableOpacity
        onPress={()=>props.navigation.navigate('livre',{item: props.item})} 
        style={[Style.livre,{width: width/2.6,height: height/3,shadowColor:'#ccc',marginHorizontal:6, shadowOffset:{width:10,height:10},shadowOpacity:5,shadowRadius: 5}]}
        >
                    <Text style={{color:'#000',backgroundColor:'#ff8f00', padding:5,position:'absolute',top:0,zIndex:10,borderBottomRightRadius:15,fontWeight:'700'}}>{(props.item.price !='0.00') ? props.item.price+' $' : 'Gratuit'} </Text>
                    <Animatable.View animation="fadeInRight">
                    <ImageLoad defaultImageSource={require('../assets/default-thumb.png')} source={{uri:'https://api.groupegael.com/storage/images/'+props.item.picture}} style={{width: width/2.6,height: height/3.8,shadowOffset:{width:10,height:10},shadowOpacity:5,shadowRadius: 5, borderRadius:5}} resizeMode='cover' />


<Text style={{color: theme.second_text_color,textAlign:'center',fontWeight:'bold'}}>{(props.item.titre.length > 30) ? props.item.titre.substr(0,30)+'...' : props.item.titre }</Text>
                    </Animatable.View>
        
        </TouchableOpacity>
    )
}

