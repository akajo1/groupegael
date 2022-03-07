import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const Verset = ({elm,navigation,route}) => {
  
    return (
        <TouchableOpacity onPress={()=> navigation.navigate('chap',{livre:'Chapitre '+(elm.index+1),verse:elm.item,liv: route.params.livre})}>
            <View style={{flex:1,padding:10,borderBottomWidth:1,borderBottomColor:'#cecece'}}>
            <Text style={{fontSize:18}}>Chapitre {elm.index+1}</Text>
        </View>
        </TouchableOpacity>
    )
}

export default Verset
