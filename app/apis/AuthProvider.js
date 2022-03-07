import React, { createContext,useState,useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
export const AuthContext = createContext()

export const AuthProvider = (props)=>{
    const [user, setUser]=useState(null)
    useEffect(() => {
        GoogleSignin.configure({
          webClientId : "782632994882-hkrtv1rc7nkc1viq12fa1urfn2p15cpn.apps.googleusercontent.com"
        });
       
      }, []);
    return(
        <AuthContext.Provider
            value={{
                user,
                setUser,
                logout: async()=>{
                    try{
                        await auth().signOut();
                    }catch(error){
                        console.log(error)
                    }
                },
                onGoogleButtonPress :  async ()=> {
                    try{
                        // Get the users ID token
                        const { idToken } = await GoogleSignin.signIn();

                        // Create a Google credential with the token
                        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

                        // Sign-in the user with the credential
                        await auth().signInWithCredential(googleCredential);

                    }catch(error){
                    console.log({error})
                    }
                },
                onFacebookButtonPress : async ()=>{
                    try {
                        // Attempt login with permissions
                        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

                        if (result.isCancelled) {
                            throw 'User cancelled the login process';
                        }

                        // Once signed in, get the users AccesToken
                        const data = await AccessToken.getCurrentAccessToken();

                        if (!data) {
                            throw 'Something went wrong obtaining access token';
                        }

                        // Create a Firebase credential with the AccessToken
                        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

                        // Sign-in the user with the credential
                        await auth().signInWithCredential(facebookCredential);

                    } catch (error) {
                        console.log(error)
                    }
                },
                
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}