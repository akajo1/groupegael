import React,{useState,useEffect} from 'react'
import { View, Text,Dimensions, ScrollView } from 'react-native'
import { getTrainings } from '../apis/endpoint.api';
import GetLoading from '../components/GetLoading';
import Training from '../components/Training';
import {connect} from 'react-redux';
import { livresShimmer } from '../apis/matrix';
const {width,height}= Dimensions.get('screen')
function Trainings(props) {
    const [formation, setformation] = useState('');
    const [loading, setLoading] = useState(false);
    const theme = props.theme
    const getAllTrainings = ()=>{
        setLoading(true)
        getTrainings()
        .then((Response)=> Response.json())
        .then((response)=>{
            setLoading(false)
            if(response.success == 1){
                setformation(response.msg)
            }else setformation('');
        })
    }

    useEffect(() => {
        getAllTrainings()
        return () => {
            getAllTrainings()
        }
    }, [])
    return (
        <>
        <View style={{width,paddingHorizontal:10,marginBottom:height/14.5}}>
        <Text style={{fontSize:20,color:'#535763',textAlign:'right',marginBottom:20}}>Formations</Text>
        {
          loading ? livresShimmer(theme) :
          formation !='' ?
          <ScrollView contentContainerStyle={{flexDirection:'row',flexWrap:'wrap'}}>
              {
                  formation.map((item,index)=> <Training key={item.id} item={item}  {...props}/>)
              }
          </ScrollView>
          : <Text style={{color:'#fff',fontSize:20}}>Aucune formation en préparation pour le moment</Text>
      }
        </View>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
      download: state.toggleFavorite.favoritesPrestataire,
      theme: state.themeReducers.theme,
    };
  };
  export default connect(mapStateToProps)(Trainings);