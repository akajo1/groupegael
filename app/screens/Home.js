import React,{useState,useEffect} from 'react'
import { View, Text,StyleSheet,Image, ImageBackground,Dimensions, Alert, TouchableOpacity} from 'react-native'
import GetLoading from '../components/GetLoading';
import TabNav from '../components/TabNav'
import TopNav from '../components/TopNav';
import Explore from './Explore';
import Ministere from './Ministere';
import More from './More';
import Tchattings from './Tchattings';
import Trainings from './Trainings';
import {connect} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
const {width,height}= Dimensions.get('screen')
function Home(props) {
  const theme= props.theme
  const user = props.connexion
  const [page, setpage] = useState('ministries');
  const [loading, setLoading] = useState(true);
  const [notification, setnotification] = useState({title:undefined,body:undefined,image:undefined})

  const onchangepage=(nom)=>{
    setpage(nom)
  }
  if(notification.title !== undefined){
    setTimeout(()=>{
      setnotification({title:undefined,body:undefined,image:undefined})
    },4000)
  }
  const setupCloudMessaging =  async ()=>{
    const token= await messaging().getToken();   
    let elements;
  fetch(
     'https://app.api.groupegael.com/AppId.php?id='+user.id +'&token='+token,
     {
       method: 'POST',
       headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(elements),
     },
   )  
  }
  useEffect(()=>{
    messaging().onMessage(async remoteMessage => {
      console.log(JSON.stringify(remoteMessage))
    setnotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      image: remoteMessage.notification.android.imageUrl,
      data: remoteMessage.data
    });
    })
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        JSON.stringify(remoteMessage) ,
      );
      setnotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        image: remoteMessage.notification.android.imageUrl,
        data: remoteMessage.data
      });
     
    });
    messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          JSON.stringify(remoteMessage),
        );
        setnotification({
          title: remoteMessage.notification.title,
          body: remoteMessage.notification.body,
          image: remoteMessage.notification.android.imageUrl,
          data: remoteMessage.data
        });
     
        
      } 
    });
  },[]) 

  useEffect(() => {
    setupCloudMessaging()
}, [])

  useEffect(() => {
    setLoading(false)
   
  }, [])
  const activePage = ()=>{
    if(page == 'ministries') return <Ministere  {...props}/>;
    else if(page == "musiques") return <Explore {...props}/>;
    else if(page == "formations") return <Trainings {...props}/>;
    else if(page == "communautes") return <Tchattings {...props}/>;
    else if(page == "plus") return <More {...props}/>;
  }
  return (
    <>
    {
      notification.title !==undefined ?  <View style={{width, height:height/7.5, backgroundColor:'#bd7905ea',position:'absolute',top:0,left:0,zIndex:5,padding:15}}>
        
      
         
        <Text style={{color:'#fff',fontSize:16,fontWeight:'700'}}>GroupGael : {notification.title}</Text>
           <Text style={{color:'#fff'}}>{notification.body}</Text>
      
         </View> : null
    }
    <View style={{flex:1,backgroundColor: theme.bg_global}}>
      <TopNav {...props}/>
        {activePage()}
      <TabNav page={page} onchangePage={(nom)=> onchangepage(nom) } {...props}/>
    </View>
    </>
  )
}
const mapStateToProps = (state) => {
  return {
    connexion: state.connexionReducers.connecter,
    isConnect: state.connexionReducers.isConnect,
    theme: state.themeReducers.theme
  };
};
export default connect(mapStateToProps)(Home);