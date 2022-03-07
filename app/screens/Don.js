import React from 'react'
import { View,Image,StyleSheet,TouchableOpacity} from 'react-native'
import {Title} from 'react-native-paper'
import Style from '../styles'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function Don(props) {
    return (
        <View style={[Style.container_fluid,{alignItems:'center',justifyContent:'center'}]}>
       
            <View style={{...StyleSheet.absoluteFill}}>
                <Image source={require('../assets/bg.png')} />
            </View>
            <TouchableOpacity onPress={()=> props.navigation.goBack()} style={{position:'absolute',top: 40, left: 20}}>
            <Icon name="arrow-left" color="white" size={32} />
            </TouchableOpacity>
            <Image source={require('../assets/logo_ministries.png')} style={{width: 200, height: 100, marginBottom: 30}}/>
          <Title style={Style.titre}>Bientôt disponible</Title>
        </View>
    )
}
