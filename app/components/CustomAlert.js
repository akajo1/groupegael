import React,{useState} from 'react'
import { View, Text,Dimensions, TouchableOpacity } from 'react-native'
import * as Animatable from 'react-native-animatable';
const {width,height} = Dimensions.get('screen');
export default function CustomAlert({title='titre',texte='info',tbgColor='#000',tcolor='#fff',bgcolor='#fff',color="#000",onAlert,alert}) {
    const [display, setdisplay] = useState(alert)

    const changeDisplay = ()=>{
        setdisplay(!alert)
        onAlert(false)
    }
    return (
        display ?
        <View style={{position:'absolute',width,height,zIndex:99,top:0,left:0,justifyContent:'center',alignItems:'center'}}>
            <Animatable.View animation="bounceIn" style={{backgroundColor: bgcolor,width: width- 80,borderRadius:20}}>
                <Text style={{color:tcolor,backgroundColor: tbgColor,borderTopRightRadius:20,borderTopLeftRadius:20,padding:10,textAlign:'center'}}>{title}</Text>
                <Text style={{color,padding:10,textAlign:'center'}}>{texte}</Text>
                <View>
                    <TouchableOpacity onPress={()=> changeDisplay('none')}>
                        <View style={{alignItems:'center'}}>
                        <Text style={{backgroundColor: tbgColor,color:tcolor,width:width/3,textAlign:'center',borderRadius:20,marginBottom:10,padding:10}}>D'accord</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
        :
        null
    )
}
