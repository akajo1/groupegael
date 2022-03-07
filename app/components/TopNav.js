import React from 'react'
import { View, Text,Image,Dimensions, TouchableOpacity } from 'react-native'
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/FontAwesome5'
const {width,height} = Dimensions.get('screen');
export default function TopNav({navigation,isConnect,theme}) {

    return (
        <View style={{width,padding: 10,flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:10,borderBottomWidth:1,borderBottomColor: theme.secondBorderColor}}>
            <Animatable.View  animation="bounceIn">
              <Image source={theme.logo_principal} resizeMode="cover" style={{width:80, height:40}} />
            </Animatable.View>
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={()=> navigation.navigate('bible')}>
                <Icon name="bible" color={theme.second_text_color} size={22} style={{marginRight:20}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> navigation.navigate('download')}>
                <Icon name="play" color={theme.second_text_color} size={22} style={{marginRight:20}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> isConnect ? navigation.navigate('profil') : navigation.navigate('login')}>
                <Icon name="user" color={theme.second_text_color} size={22}/>
            </TouchableOpacity>
            </View>
        </View>
    )
}
