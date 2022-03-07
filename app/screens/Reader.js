import React,{useEffect,useState,useRef} from 'react'
import { View, Text, ImageBackground,Dimensions, FlatList,Animated} from 'react-native'
import Controller from '../components/Controller'
import CoverList from '../components/CoverList'
import Sliders from '../components/Sliders'
import TopNavNext from '../components/TopNavNext'
import TrackPlayer,{Event} from 'react-native-track-player';
import {connect} from 'react-redux';
const {width,height} = Dimensions.get('screen')

 function Reader(props) {
   const theme= props.theme;
  const {songs,id,index} = props.route.params;
  const scrollX = useRef(new Animated.Value(0)).current;
  const [indexes, setindex] = useState(index);
  const [chants,setchants]= useState('')
  const Slider = useRef(null)
  const isPlayerReady= useRef(false)
  const renderItem = ({item})=>{
    return <CoverList key={item.id} item={item} image={item.artwork}/>
  }
  const playlist = {
    songs,
    indexes
  }

  useEffect(() => {
    scrollX.addListener(({value})=>{
      const indexed = Math.round(value / width)
      setindex(indexed)
    });
    
  

    TrackPlayer.setupPlayer().then(async () => {
   
      await TrackPlayer.add([songs[indexes]])
      await TrackPlayer.play();
      const action = { type: "ADD_SONG", value: playlist }
        props.dispatch(action)
      isPlayerReady.current = true;

      await TrackPlayer.updateOptions({
        stopWithApp: false,
        alwaysPauseOnInterruption: true,
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
      });

        //add listener on track change
        TrackPlayer.addEventListener(Event.PlaybackTrackChanged, async (e) => {
          console.log('song ended', e);
  
          const trackId = (await TrackPlayer.getCurrentTrack()) - 1; //get the current id
  
          console.log('track id', trackId, 'index', index.current);
  
          if (trackId !== index.current) {
            setSongIndex(trackId);
            isItFromUser.current = false;
  
            if (trackId > index.current) {
              goNext();
            } else {
              goPrv();
            }
            setTimeout(() => {
              isItFromUser.current = true;
            }, 200);
          }
  
          // isPlayerReady.current = true;
        });
  
        //monitor intterupt when other apps start playing music
        TrackPlayer.addEventListener(Event.RemoteDuck, async (e) => {
          // console.log(e);
          if (e.paused) {
            // if pause true we need to pause the music
            await TrackPlayer.pause();
          } else {
            await TrackPlayer.play();
          }
        });
      });
  

    return ()=>{
      scrollX.removeAllListeners();
    }

    
   
  }, [])
  

  useEffect(() => {
    if (isPlayerReady.current) {
      TrackPlayer.skip(songs[indexes].id)
    }
    
  }, [indexes])
  const goNext=()=>{
    
    Slider.current.scrollToOffset({
        offset: (indexes + 1) * width,
    })
   if((indexes+1) <= songs.length -1){
    TrackPlayer.setupPlayer().then(async () => {
      await TrackPlayer.reset()
      await TrackPlayer.add([songs[indexes +1]])
      TrackPlayer.play();
      isPlayerReady.current = true;
    });
   }
    
    
}
const goPrv=()=>{
    Slider.current.scrollToOffset({
        offset: (indexes - 1) * width,
    })
    if((indexes -1) * width >= 0){
      TrackPlayer.setupPlayer().then(async () => {
        await TrackPlayer.reset()
        await TrackPlayer.add([songs[indexes -1]])
        TrackPlayer.play();
        isPlayerReady.current = true;
      });
    }
    
}


  return (
    <View style={{flex:1,backgroundColor: theme.bg_global}}>
            

      <TopNavNext {...props} texte="Album & Musique"/>
     <View style={{height:height/2.2}}>
     <FlatList
     ref={Slider}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      data={songs}
      initialScrollIndex={indexes}
      renderItem={renderItem}
      onScroll={Animated.event([{nativeEvent:{contentOffset:{x : scrollX}}}],{userNativeDriver: true})}
      
      />
     </View>
      <Text style={{color: theme.PRIMARY_TEXT_COLOR,marginLeft:35,fontSize:26,fontWeight:'700',marginTop:15}}>{songs[indexes].title}</Text>
      <Text style={{color:'#949393',marginLeft:35,marginTop:5}}>{songs[indexes].album}</Text>
    <Sliders {...props}/>
      <Controller onNext={goNext} onPrv={goPrv} {...props}/>
     
    </View>
  )
}


const mapStateToProps = (state) => {
  return {
    theme: state.themeReducers.theme,
    song: state.PlayerSong.song,
  };
};
export default connect(mapStateToProps)(Reader);