import React,{useEffect,useState} from 'react'
import { View, Text, ScrollView, FlatList,StyleSheet,Dimensions } from 'react-native'
import Trainings from '../components/Training'
import ItemDownload from '../components/ItemTraining'
import Style from '../styles'
import * as Animatable from 'react-native-animatable';
import {Courses} from '../apis/endpoint.api'

const {width,height}= Dimensions.get('screen')


export default function Training(props) {
   

    const cours=[{id:1},{id:2},{id:3}]
  
    return (
        <View style={[Style.container_fluid,{flexDirection:'row'}]}>
           <View style={styles.leftBar}>
           <Text style={[styles.textRotate]}>FORMATIONS</Text>

           </View>
           <View style={Style.rightPart}>
                   <Animatable.View animation="fadeInRight" style={{flex:1}}>
                   <View style={Style.menu}>
                   <Animatable.Text animation="bounceIn" style={[Style.menuActive,{marginLeft: 0, marginBottom: 10}]}>FORMATIONS</Animatable.Text>

                       
                   </View>
                   <ScrollView>
                     <View style={{flex:1,flexDirection:'row',flexWrap:'wrap'}}>
                     {cours.map((item)=> <Trainings  item={item} key={item.id} {...props}/>)}
                   </View>
                   </ScrollView>
                  
                   </Animatable.View>
                
           </View>
        </View>
    )
}

const styles= StyleSheet.create({
  textRotate:{
     
      transform: [{ rotate: '-90deg'},{translateY:-130},{translateX:100}],
      fontSize: 40,
      width: 300,
      color: 'rgba(252,252,255,0.18)',
      fontWeight:'bold',
      fontFamily:'GOTHIC'
      
      
  },
  leftBar:{
      width: Dimensions.get('screen').width / 9.4,
      height: Dimensions.get('screen').height,
      justifyContent:'center',
      alignContent:'center',
      position:'relative'
  },
})
