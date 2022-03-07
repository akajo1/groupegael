import React from 'react'
import { View, Text,Image,Dimensions, TouchableOpacity } from 'react-native'
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/FontAwesome5'
const {width,height} = Dimensions.get('screen');
export default function TopNavNext({navigation,texte='retourner',theme}) {
    
    return (
        <View style={{width,padding: 10,flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:10,borderBottomWidth:1,borderBottomColor: theme.borderColor}}>
            
            <TouchableOpacity onPress={()=> navigation.goBack()}>
            <View style={{flexDirection:'row'}}>
                <Icon name="arrow-left" color={theme.PRIMARY_TEXT_COLOR} size={22} style={{marginRight:20}}/>
                <Text style={{color: theme.PRIMARY_TEXT_COLOR}}>{texte}</Text>
                </View>
            </TouchableOpacity>
           
            
            <Animatable.View  animation="bounceIn">
              <Image source={theme.logo_principal} resizeMode="cover" style={{width:80, height:40}} />
            </Animatable.View>
        </View>
    )
}
