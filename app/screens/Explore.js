import React,{useState,useEffect} from 'react'
import { View, Text,Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import Style from '../styles'
import * as Animatable from 'react-native-animatable';
import { Albums, getChants, getLivres, last_album } from '../apis/endpoint.api';
import Album from '../components/Album';
import ItemDownload from '../components/ItemDownload';
import GetLoading from '../components/GetLoading';
import Livre from '../components/Livre';
import TrackPlayers from '../components/TrackPlayer';
import {connect} from 'react-redux';
import TrackPlayer,{Event} from 'react-native-track-player';
import { albumShimmer, livresShimmer } from '../apis/matrix';

const {width,height}= Dimensions.get('screen')
function Explore(props) {
    const theme = props.theme
    const [page, setPage]= useState('musique')
    const [album,setAlbum]= useState('');
    const [last,setLast]= useState('');
    const [songs,setSongs]= useState('');
    const [song,setSong]= useState('');
    const [livres,setlivres]= useState('');
    const [lasted,setLasted] = useState('');
    const [loadingL,setloadingL] = useState(true);
    const [loadingA,setloadingA] = useState(true);

    const navigate= (item)=>{
        setPage(item)
    }
    const onChangeAlbum= (id)=>{
        album.forEach(element => {
            if(element.id == id){
                setLasted(element)
                getAllChansons(element.id)
            }
        });
    }
   
    const getAllAlbums =async ()=>{
        setloadingA(true)
      await  Albums()
        .then((response)=>response.json())
        .then((response)=>{
            setloadingA(false)
            if(response.success == 1){
                setAlbum(response.msg)
            }else{
                setAlbum('')
            }
        })
    }
    const getLasted = ()=>{
        last_album()
        .then((response)=> response.json())
        .then((response)=>{
            if(response.success == 1){
                setLast(response.msg)
                getAllChansons(response.msg.id)
            }else{
                setLast('')
            }
        })
    }
    const getAllChansons = (id)=>{
        getChants(id)
        .then((response)=>response.json())
        .then((response)=>{
            if(response.success == 1){
                setSongs(response.msg)
            }else{
                setSongs('')
            }
        })
    }
    const getAllLivres = async ()=>{
        setloadingL(true)
        await getLivres()
        .then((response)=> response.json())
        .then((response)=>{
            setloadingL(false)
            if(response.success == 1){
                setlivres(response.msg)
              
            }else{
                setlivres('')
            }
        })
    }
   

    const pageView = (theme)=>{
        return(
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={()=>navigate('musique')}>
                <Text  style={[{marginLeft: 0,color: (page == 'musique') ? '#ff8f00' : theme.second_text_color , marginBottom: 10, fontSize: 24,marginLeft: 30,fontWeight: 'bold'}]}>ALBUM</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigate('livre')}>
                <Text style={[{color: (page == 'livre') ? '#ff8f00' : theme.second_text_color , marginBottom: 10, fontSize: 24,marginLeft: 30,fontWeight: 'bold',marginRight: 20}]}>LIVRE</Text>
            </TouchableOpacity>
            </View>
        )
    }
    const containView = (theme)=>{
        if(page=='musique'){
           if(loadingA === true){
              return  albumShimmer(theme)
           }else{
            if(album !=''){
                return (
                   <>
                   <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                       {
                            album.map((item)=> <Album item={item} onChangeAlbum={(id)=>onChangeAlbum(id)} {...props}/>)
                       }
                   </ScrollView>
                   <Animatable.View animation="fadeInRight" style={{marginTop:10,borderBottomWidth:1,borderBottomColor: theme.secondBorderColor,paddingBottom:10}}>
                       <Text style={{color: theme.PRIMARY_TEXT_COLOR,fontSize:22}}>{(lasted !='') ? lasted.titre : last.titre}</Text>
                       <Text style={{color:'#ff8f00',fontSize:14,textTransform:'uppercase'}}>{(lasted !='') ? lasted.auteur : last.auteur}</Text>
                   </Animatable.View>
                   {getMusiques()}
                   </>
                )
            }
           }
        }
        if(page=='livre'){
           if(loadingL == true){
               return livresShimmer(theme)
           }else{
            if(livres !=''){
                return (
                    <>
                    <ScrollView contentContainerStyle={{flexDirection:'row',flexWrap:'wrap'}}>
                        {livres.map((item)=><Livre key={item.id} item={item} {...props}/>)}
                    </ScrollView>
                    </>
                )
            }
           }
        }
    }

    const getMusiques = ()=>{
        if(songs !=''){
            return (
               <ScrollView showsVerticalScrollIndicator={false}>
                   {
                        songs.map((item,index)=> <ItemDownload key={index} index={index} item={item} album={(lasted !='') ? lasted : last} songs={songs} position={index+1} {...props} onsong={(out)=> changeSong(out)}/>)
                   }
               </ScrollView>
            )
        }
        return <Animatable.Text animation="shake" style={{color:theme.PRIMARY_TEXT_COLOR,marginTop:20}}>Aucune chanson ajouter à cet album</Animatable.Text>
    }
const goNext= ()=>{
    if((props.song.indexes +1) * width >= 0){
        TrackPlayer.setupPlayer().then(async () => {
          await TrackPlayer.reset()
          await TrackPlayer.add([props.song.songs[props.song.indexes +1]])
          TrackPlayer.play();
          isPlayerReady.current = true;
        });
      }
}
 

    useEffect(() => {
        getAllAlbums()
        return () => {
            getAllAlbums()
        }
    }, []);
    useEffect(() => {
        getLasted()
        return () => {
            getLasted()
        }
    }, []);

    useEffect(() => {
        getAllLivres()
        return () => {
            getAllLivres()
        }
    }, []);
    
    
    return (
        <>
        <View style={{width,paddingHorizontal:10,marginBottom:height/14.5}}>
        <Text style={{fontSize:20,color:'#535763',textAlign:'right'}}>Album & Livre</Text>
        {pageView(theme)}
        {containView(theme)}
        
        </View>
        {
            props.song !='' && <TrackPlayers read={props.song.songs[props.song.indexes]}/>
        }
        </>
    )
}


const mapStateToProps = (state) => {
    return {
      song: state.PlayerSong.song,
      
    };
  };
  export default connect(mapStateToProps)(Explore);