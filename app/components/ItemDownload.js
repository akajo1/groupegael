import React,{useState,useRef,useCallback} from 'react'
import { View,Text,TouchableOpacity,Platform,Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import RNFetchBlob from 'rn-fetch-blob'
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { getDowload } from '../apis/endpoint.api';
const {width,height}= Dimensions.get('screen')
function ItemDownload(props) {
  const item=props.item;
  const theme = props.theme;
  const android = RNFetchBlob.android
  const [loading, setLoading]= useState(false);
 
  const downloadFile = ()=>{
    if( props.currentDownload.length > 0){
      if(props.currentDownload.findIndex((i)=> i.id ==item.id)!=-1){
        return <View style={{justifyContent:'center',alignItems:'center',width:34}}>
          
          <Text style={{color:theme.PRIMARY_TEXT_COLOR,fontSize:16,marginTop:4}}>{
             props.currentDownload.length > 0 && props.currentDownload.map((itemv)=> (itemv.id == item.id) && Math.round(itemv.progress)+' %')
          }</Text>
        </View>
      }
      else{
        return <Icon name={(props.download.findIndex((i)=> i.id ==item.id)!=-1) ?"check-circle" : "download" }  size={26} color={ theme.second_text_color}/>

      }
    }else{
      return <Icon name={(props.download.findIndex((i)=> i.id ==item.id)!=-1) ?"check-circle" : "download" }  size={26} color={ theme.second_text_color}/>

    }


  }
  
  const songs=[];
  if(props.album !=''){
    props.songs.forEach(element => {
      songs.push({
        id: element.id,
      url: 'https://api.groupegael.com/storage/sons/'+element.url, 
      title: element.titre,
      artist: '',
      album: props.album.titre,
      genre: null,
      date: null, 
      artwork: (element.picture != null) ? 'https://api.groupegael.com/storage/images/'+element.picture : 'https://api.groupegael.com/storage/images/'+props.album.picture,
      lyrics: element.lyrics,
      description: element.song_description
      })
    });
  }

  const download= ()=>{
    const action = {
      type: 'ADD_DOWNLOAD',
      value: {id:item.id,progress:0},
    };
   
    props.dispatch(action);

    RNFetchBlob
    .config({
      fileCache : true,
      appendExt:'mp3'
      
    })
    .fetch('GET', 'https://api.groupegael.com/storage/sons/'+item.url)
    .progress( async (received, total) => {
      const actioning = {
        type: 'PROGRESSING',
        value: {id: item.id, progress: (received / total) * 100},
      };
     
     await props.dispatch(actioning);
    
    })
    .then((res) => {
    
      const action = {
        type: 'ADD_FAVORITE',
        value: {  
          id: item.id, 
          url: res.path(), 
          title: item.titre,
          artist: '',
          album: props.album.titre,
          genre: null,
          date: null, 
          artwork: (item.picture != null) ? 'https://api.groupegael.com/storage/images/'+item.picture : 'https://api.groupegael.com/storage/images/'+props.album.picture,
          lyrics: item.lyrics,
          description: item.song_description
        },
      };
      props.dispatch(action);
      getDowload(props.connexion.id,item.id)
      

    })
    .catch((errorMessage, statusCode) => {
      console.log(statusCode,errorMessage)
    })
  }
  const changesong=(song)=>{
    props.onsong(song)
  }


    return (
        <Animatable.View animation="fadeInDown" style={{flex:1,marginVertical:2, flexDirection:'row',alignItems:'center',marginHorizontal:20,paddingVertical: 15,borderBottomColor:'#34393E',borderBottomWidth:1}}>
           
            <Text style={{color: theme.PRIMARY_TEXT_COLOR,fontWeight:'bold',paddingHorizontal:5}}>{props.position}.</Text>
            <View>
            <TouchableOpacity onPress={()=>props.navigation.navigate('reader',{id: item.id,album:props.album,songs: songs, index: props.index})}>
                <Text style={{fontWeight:'500',color: theme.second_text_color,fontSize:18,width: width/2,paddingHorizontal:10}}>{item.titre}</Text>
                
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={()=>  (props.download.findIndex((i)=> i.id ===item.id)==0) ? {} : (props.currentDownload.findIndex((k)=> k.id === item.id) == 0) ? {} : download()} style={{marginRight:20}}>
            {
              (props.download.findIndex((i)=> i.id ==item.id)!=-1) ? 
               <Icon name={(props.download.findIndex((i)=> i.id ==item.id)!=-1) ?"check-circle" : "download" }  size={26} color={ theme.second_text_color}/> 
               :
               downloadFile()
              
            }
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>props.navigation.navigate('reader',{id: item.id,album:props.album,songs: songs, index: props.index})}>
              <Icon name={props.song != '' ? props.song.songs[props.song.indexes].id == item.id ? 'pause' : "play" : 'play'} size={26} color={ theme.second_text_color}/>
            </TouchableOpacity>
            
        </Animatable.View>
    )
}

const mapStateToProps = (state) => {
  return {
    connexion: state.connexionReducers.connecter,
    isConnect: state.connexionReducers.isConnect,
    download: state.toggleFavorite.favoritesPrestataire,
    theme: state.themeReducers.theme,
    currentDownload: state.CurrentDownload.downloads,
    song: state.PlayerSong.song,
  };
};
export default connect(mapStateToProps)(ItemDownload);