import React,{useState} from 'react'
import { View, Text,Dimensions } from 'react-native'
import Style from '../styles'
import * as Animatable from 'react-native-animatable';
import TopNavNext from '../components/TopNavNext';
import {connect} from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import Downloaded from '../components/Downloaded';
import TrackPlayers from '../components/TrackPlayer';
const {width,height} = Dimensions.get('screen');
function Telechargement(props) {
    const [down, setdown] = useState(props.download)
   const theme = props.theme
    return (
        <View style={[Style.container_fluid,{backgroundColor: theme.bg_global}]}>
             <TopNavNext {...props}/>
            <View style={{width,padding:10}}>
            <Text style={{color:'#ff8f00',fontSize:22}}>Mes Telechargements</Text>
            {
                down.length > 0 ?
                <ScrollView >
                    {
                        down.map((item,index)=> <Downloaded key={index} position={index+1} item={item} songs={down} {...props} index={index}/>)
                    }
                </ScrollView>
                :
                <Text style={{color:'white'}}>Aucun téléchargement pour le moment</Text>
            }
            
            </View>
            {
            props.song !='' && <TrackPlayers read={props.song.songs[props.song.indexes]}/>
        }
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
      download: state.toggleFavorite.favoritesPrestataire,
      theme: state.themeReducers.theme,
      song: state.PlayerSong.song,
    };
  };
  export default connect(mapStateToProps)(Telechargement);