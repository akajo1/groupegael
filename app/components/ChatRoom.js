import React,{useState,useEffect} from 'react'
import { View, Text, TextInput, TouchableOpacity,ScrollView, Image,Dimensions } from 'react-native'
import style from '../styles'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { getMessaging, imageURI, sendMessaging } from '../apis/endpoint.api';
const {width,height} = Dimensions.get('screen');
import now from '../components/moment';
const ChatRoom = ({info,user}) => {
    const [messages, setMessages] = useState('');

    const getAllMessages = async ()=>{
        await getMessaging(info)
            .then((response)=> response.json())
            .then((response)=>{
                if(response.success ==1){
                    setMessages(response.msg)
                }else setMessages('')
            })
   }
   

     useEffect(() => {
        const interval = setInterval(() => {
           getAllMessages()
          }, 500);
         
        
    }, [])
      
    return (
        <>
          {
                   messages !='' && messages.map((item,index)=>
                   <View key={index} style={{padding:5,borderRadius:10,marginVertical:5,display:'flex',alignItems:(item.user == user ? 'flex-end': 'flex-start')}}>
                   
                   <View style={{backgroundColor:(item.user == user ? '#155ce0': '#e09915'),paddingHorizontal:10,paddingVertical:5,borderRadius:10}}>
                   <Text style={{color:'#000000',fontWeight:'700',fontSize:14,textAlign:'left'}}>{ (item.user == user ? 'Vous': item.nom_user)}</Text>
                   <Text style={{color:'#fff',fontWeight:'700',fontSize:15,textAlign:'left'}}>{item.content}</Text>
                   <Text style={{color:'#000',fontWeight:'700',fontSize:10,textAlign:'right',marginTop:10}}><Icon name="clock"/> il y a {now(item.date).fromNow(now().locale())} </Text>
                   </View>
                   </View>)
               }
        </>
    )
}

export default ChatRoom
