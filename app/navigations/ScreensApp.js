import 'react-native-gesture-handler';
import React, {useContext,useState,useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import Login from '../screens/Login';
import SignIn from '../screens/SignIn';
import {connect} from 'react-redux';
import Home from '../screens/Home';
import Worship from '../screens/Worship';
import Meditation from '../screens/Meditation';
import Profil from '../screens/Profil';
import Telechargement from '../screens/Telechargement';
import ReaderLivre from '../screens/ReaderLivre';
import TrainingView from '../screens/TrainingView';
import Reader from '../screens/Reader';
import BookReader from '../screens/BookReader';
import { AuthContext } from '../apis/AuthProvider';
import {postUserSocial} from '../apis/endpoint.api'
import About from '../screens/About';
import Activity from '../screens/Activity';
import Reglage from '../screens/Reglage';
import TchatRoom from '../screens/TchatRoom';
import Bible from '../screens/Bible';
import Verse from '../screens/Verse';
import Chap from '../screens/Chap';
import Worships from '../screens/Worships';
import Meditations from '../screens/Meditations';
const Stack = createStackNavigator();

const ScreensApp = (props)=>{
    const {user,setUser} = useContext(AuthContext);
    const [initializing,setInitializing] = useState(true)
    const myForm={}

    function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
      if(user !=null){
        myForm.name= user.displayName
        myForm.email=user.email
        myForm.phone=user.phoneNumber
        myForm.typeconnection='firebase'
        myForm.picture = user.photoURL
    
        postUserSocial(myForm)
        .then((response)=> response.json())
        .then((response)=>{
          if(response.success == 1){
            const action = {
              type: 'CONNEXION_REUSSI',
              value: response.msg,
            };
           
            props.dispatch(action);
            props.navigation.navigate('home');
          }
        })
        .catch((error)=>{
          console.log(error)
        })
      }
    }

    
  
  
  
    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
     
    }, [])
    if (initializing) return null;
   
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="home" component={Home}  />
        <Stack.Screen name="worship" component={Worship}  />
        <Stack.Screen name="meditation" component={Meditation}  />
        <Stack.Screen name="profil" component={Profil}  />
        <Stack.Screen name="download" component={Telechargement}  />
        <Stack.Screen name="livre" component={ReaderLivre}  />
        <Stack.Screen name="train" component={TrainingView}  />
        <Stack.Screen name="reader" component={Reader}  />
        <Stack.Screen name="bookreader" component={BookReader}  />
        <Stack.Screen name="about" component={About}  />
        <Stack.Screen name="activity" component={Activity}  />
        <Stack.Screen name="login" component={Login}  />
        <Stack.Screen name="signin" component={SignIn} />
        <Stack.Screen name="reglage" component={Reglage} />
        <Stack.Screen name="tchat" component={TchatRoom} />
        <Stack.Screen name="bible" component={Bible} />
        <Stack.Screen name="verse" component={Verse} />
        <Stack.Screen name="chap" component={Chap} />
        <Stack.Screen name="worships" component={Worships} />
        <Stack.Screen name="meditations" component={Meditations} />
      </Stack.Navigator>
    )
  }
  
  
  const mapStateToProps = (state) => {
    return {
      connexion: state.connexionReducers.connecter,
      isConnect: state.connexionReducers.isConnect,
    };
  };
   export default connect(mapStateToProps)(ScreensApp);