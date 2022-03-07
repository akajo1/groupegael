import React,{useState,useEffect, useLayoutEffect} from 'react'
import { StyleSheet, Text, TouchableOpacity, View,Dimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import bible from '../apis/bible.json'
import Icon from 'react-native-vector-icons/FontAwesome5'
const {width,height}=Dimensions.get('screen')
const liv = [
    '','Genèse','Exode','Lévitique','Nombres','Deutéronome','Josué','Juges','Ruth','1 Samuel','2 Samuel','1 Rois','2 Rois','1 Chroniques','2 Chroniques',
    'Esdras','Néhémie','Esther','Job','Psaumes','Proverbes','Ecclésiaste','Cantique','Esaïe','Jérémie','Lamentations','Ezéchiel','Daniel',
    'Osée','Joël','Amos','Abdias','Jonas','Michée','Nahum','Habacuc','Sophonie','Aggée','Zacharie','Malachie','Matthieu','Marc','Luc','Jean','Actes','Romains','1 Corinthiens','2 Corinthiens',
    ' Galates','Ephésiens','Philippiens','Colossiens','1 Thessalonicien','2 Thessalonicien','1 Timothée','2 Timothée','Tite','Philémon',
    'Hébreux','Jacques','1 Pierre','2 Pierre','1 Jean','2 Jean','3 Jean','Jude','Apocalypse'
]
const Bible = (props) => {
    const [myBible,setMyBible]=useState(bible)
    const [livre,setlivre]=useState([])
    //console.log("version ", myBible.version[1].book)
   const livres = ()=>{
       let str = [];
    for(let i in myBible.version){
        str.push(liv[i])
     }
     setlivre(str)
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
            <Text style={{fontWeight:'700',fontSize:22,textAlign:'center',paddingTop:15,paddingBottom:5}}>Ma bible</Text>
            <Text style={{textAlign:'center'}}>Ls1910</Text>
            <ScrollView showsVerticalScrollIndicator={false} style={{height: height-180}}>
            {
                livre.length > 0 && livre.map((item,index)=> <TouchableOpacity onPress={()=> props.navigation.navigate('verse',{livre: item,id:index})}>
                    <View style={{flex:1,padding:10,borderBottomColor:'#ccc',borderBottomWidth:1}}>
                    <Text style={{fontSize:20}}>{item}</Text>
                    </View>
                </TouchableOpacity>)
            }
            </ScrollView>
        </SafeAreaView>
    )
}

export default Bible

const styles = StyleSheet.create({})
