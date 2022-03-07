import React, { useEffect,useState } from 'react'
import { View, Text,TouchableOpacity,Alert  } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function UserInteraction(props) {
    const item= props.item;
    const type= props.type;
    const count= props.likes.length
    const like= props.like;
    const theme= props.theme;
    const form = {
        meditation_id:'',
        worship_id:'',
        user_id: props.connexion.id ,
    };
    if(type=='meditation'){
        form.meditation_id=item.id
    }
    else if (type=='worship'){
        form.worship_id=item.id
    }
  
   

    const test = ()=>{
        fetch(
            'https://app.api.groupegael.com/post_like.php',
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(form),
            },
          )
            .then((response) => response.json())
            .then((responseJson) => {
              if(responseJson.success == 1){
                  props.onActu()
              }
              
          })
            .catch((error) => {
              Alert.alert(
                'Alerte',
                "Vérifier l'état de votre connexion internet" + error,
                [
                  {
                    text: 'OK',
                  },
                ],
                {
                  cancelable: false,
                },
              );
            });
    }
    return (
        <View style={{flexDirection:'row', marginLeft: 20}}>
            <View style={{flexDirection:'row',marginRight: 20}}>
              
            {
              like ? 
            <>
             <TouchableOpacity onPress={()=> props.isConnect ? test() : props.navigation.navigate('login')}>
             <View style={{flexDirection:'row'}}>
               <Icon name="thumbs-up" color="orange" size={22} style={{marginRight: 5}}/>
            <Text style={{color: theme.PRIMARY_TEXT_COLOR}}>{count}</Text>
            </View>
             </TouchableOpacity>
            </>
              :
              <TouchableOpacity onPress={()=> props.isConnect ? test() : props.navigation.navigate('login')}>
                <View style={{flexDirection:'row'}}>
                <Icon name="thumbs-up" color={theme.second_text_color} size={22} style={{marginRight: 5}}/>
            <Text style={{color: theme.PRIMARY_TEXT_COLOR}}>{count}</Text>
                </View>
           
            </TouchableOpacity>
            }
            </View>
            
        </View>
    )
}
