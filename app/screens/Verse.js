import React,{useState,useEffect, useLayoutEffect} from 'react'
import { StyleSheet, Text, View,Dimensions, TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import bible from '../apis/bible.json'
import Verset from '../components/Verset'
import Icon from 'react-native-vector-icons/FontAwesome5'
const {width,height}=Dimensions.get('screen')
const Verse = (props) => {
    const [myBible,setMyBible]=useState(bible)
   const [chap,setchap]= useState([])

   const livres = ()=>{
    let str = [];
 for(let i in myBible.version[props.route.params.id + 1].book){
     str.push(myBible.version[props.route.params.id + 1].book[i])
  }
  setchap(str)
}
useLayoutEffect(()=>{
    livres()
},[])

  
    return (
        <SafeAreaView>
             <TouchableOpacity onPress={()=> props.navigation.goBack()} style={{position:'absolute',top:20,left:20,zIndex:2}}>
                <View >
                        <Icon name="chevron-left" size={30}/>
                </View>
            </TouchableOpacity>
            <Text style={{fontSize:22,fontWeight:'700',textAlign:'center',paddingVertical:15}}>{props.route.params.livre}</Text>
            <FlatList
                data={chap}
                style={{height: height-160}}
                renderItem={(item,index)=> <Verset key={index} elm={item} chap={chap} {...props}/>}
            />
        </SafeAreaView>
    )
}

export default Verse

const styles = StyleSheet.create({})
