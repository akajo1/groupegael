import React,{useState,useEffect, useLayoutEffect} from 'react'
import { StyleSheet, Text, View,Dimensions, TouchableOpacity} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/FontAwesome5'

const  {width,height}= Dimensions.get('screen')
const Chap = (props) => {
    const [lv,setlv]= useState('')

    const livres = ()=>{
        let str = [];
     for(let i in props.route.params.verse.chapter){
         str.push(props.route.params.verse.chapter[i])
      }
      setlv(str)
    }
    useLayoutEffect(()=>{
        livres()
    },[])
    
    return (
        <SafeAreaView>
             <TouchableOpacity onPress={()=> props.navigation.goBack()} style={{position:'absolute',top:10,left:20,zIndex:2}}>
                <View >
                        <Icon name="chevron-left" size={30}/>
                </View>
            </TouchableOpacity>
            <Text style={{fontSize:22,fontWeight:'700',textAlign:'center',paddingVertical:15}}>{props.route.params.livre}</Text>
            <TouchableOpacity onPress={()=> props.navigation.navigate('bible')} style={{position:'absolute',top:20,right:20,zIndex:2}}>
                <View >
                        <Text style={{textDecorationLine:'underline'}}>{props.route.params.liv}</Text>
                </View>
            </TouchableOpacity>
           <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{width}} style={{height: height-160}}>
           {
                lv.length > 0 && lv.map((item,index)=> <View style={{flexDirection:'row',paddingHorizontal:10,paddingVertical:2,flexWrap:'wrap'}}>
                <Text style={{fontSize:18,width:width-30,textAlign:'justify'}}>{item.verse_nr}. {item.verse}</Text>
                </View>)
            }
           </ScrollView>
       </SafeAreaView>
    )
}

export default Chap

const styles = StyleSheet.create({})
