import React from 'react'
import { View, Text,Image, TouchableOpacity,ImageBackground,Dimensions} from 'react-native'
import Style from '../styles'
import ImageLoad from './ImageLoad'
const {width,height} = Dimensions.get('screen')
export default function Training(props) {
    const item = props.item;
    const theme = props.theme

    return (
        <View  style={{marginBottom:10}}>
                        <Text style={{color:'#000',backgroundColor:'#ff8f00', padding:5,position:'absolute',top:0,zIndex:10,borderBottomRightRadius:15,fontWeight:'700'}}>{(item.price !='0.00') ? item.price+' $' : 'Gratuit'} </Text>

            <TouchableOpacity onPress={()=> props.navigation.navigate('train',{cours: item})}
            style={{width: width/2.6,height: height/3.6,shadowColor:theme.PRIMARY_TEXT_COLOR,marginHorizontal:6, shadowOffset:{width:10,height:10},shadowOpacity:5,shadowRadius: 5}}>
            
         <ImageLoad defaultImageSource={require('../assets/default-thumb.png')} source={{uri:'https://api.groupegael.com/storage/images/'+item.picture}} style={{width: width/2.6,height: height/3.7}} resizeMode='cover' />
            </TouchableOpacity>
        <Text style={{color:theme.PRIMARY_TEXT_COLOR,fontFamily:'GOTHIC', fontWeight:'bold', fontSize:16, marginTop: 0,marginBottom:5,paddingLeft:5,width:width/2.6}}>{item.titre}</Text>
        </View>
    )
}


