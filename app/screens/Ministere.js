import React,{useState,useEffect} from 'react'
import { View, Text,Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import { Meditations, Worships } from '../apis/endpoint.api';
import GetLoading from '../components/GetLoading';
import MeditationItem from '../components/MeditationItem';
import WorshipItem from '../components/WorshipItem';
import * as Animatable from 'react-native-animatable';
import { meditationShimmer, worshipShimmer } from '../apis/matrix';
import Icon from 'react-native-vector-icons/FontAwesome5'
import {connect} from 'react-redux';
const {width,height}= Dimensions.get('screen')
 function Ministere(props) {
    const theme = props.theme
    const [worship, setworship] = useState('');
    const [medit, setmedit] = useState('');
    const [loadingM, setLoadingM] = useState(false);
    const [loadingW, setLoadingW] = useState(false);

    const getAllWorship = async ()=>{
        setLoadingW(true)
       await Worships()
        .then((response)=> response.json())
        .then((response)=>{
            setLoadingW(false)
            if(response.success==1){
                setworship(response.msg)
            }else{
                setworship('')
            }
        })
    }

    const getAllMeditation =async ()=>{
        setLoadingM(true)
       await Meditations()
        .then((response)=> response.json())
        .then((response)=>{
            setLoadingM(false)
            if(response.success==1){
                setmedit(response.msg)
            }else{
                setmedit('')
            }
        })
    }
    const getWorship = ()=>{
        if(loadingW === true){
         return  worshipShimmer(theme)
        }else{
            if(worship !=''){
                return <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {worship.map((item)=> <WorshipItem key={item.id} type="worship" item={item} {...props}/>)}
                <TouchableOpacity onPress={()=> props.navigation.navigate('worships')}>
                    <View style={{width: 150, height:height/4.2,justifyContent:'center',alignItems:'center'}}>
                        <Icon name="arrow-right" size={22} color='#fff'/>
                        <Text style={{color:'#fff'}}>Voir plus</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
            }
        }
        
     
        return  <Text style={{color:'#fff',fontSize:16}}>Aucune adoration ajouter pour le moment</Text>
    }
    const getMeditation = ()=>{
        if(loadingM === true){
            return  meditationShimmer(theme)
           }else{
               if(medit !=''){
                   return  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                   {medit.map((item)=> <MeditationItem key={item.id} type="meditation" item={item} {...props}/>)}
                   <TouchableOpacity onPress={()=> props.navigation.navigate('meditations')}>
                    <View style={{width: 150, height:height/4.2,justifyContent:'center',alignItems:'center'}}>
                        <Icon name="arrow-right" size={22} color='#fff'/>
                        <Text style={{color:'#fff'}}>Voir plus</Text>
                    </View>
                </TouchableOpacity>
               </ScrollView>
               }
           }
      
        return <Text style={{color:'#fff',fontSize:16}}>Aucune méditation ajouter pour le moment</Text>
    }
    useEffect(() => {
        getAllWorship()
        return () => {
            getAllWorship()
        }
    }, [])

    useEffect(() => {
        getAllMeditation()
        return () => {
            getAllMeditation()
        }
    }, [])
  
    return (
        <>
        <View style={{width,paddingHorizontal:10,marginBottom:height/14.5}}>
        <Animatable.Text animation="fadeInRight" style={{fontSize:20,color:'#535763',textAlign:'right'}}>Ministères</Animatable.Text>
        <Text style={{fontSize:24,color:'#ffa000',textTransform:'uppercase',fontWeight:'700',marginBottom:15}}>Adorations</Text>
            {getWorship()}

        <Text style={{fontSize:24,color:'#ffa000',textTransform:'uppercase',fontWeight:'700',marginVertical:15}}>Méditations</Text>
            {getMeditation()}
        </View>
       </>
    )
}

const mapStateToProps = (state) => {
    return {
    theme: state.themeReducers.theme,
    };
  };
  export default connect(mapStateToProps)(Ministere);