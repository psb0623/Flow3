import React from 'react';
import { Text, StyleSheet, View, SafeAreaView, StatusBars } from 'react-native';
import * as GoogleSignIn from 'expo-google-sign-in'

// import * as Firebase from 'firebase'
// import "firebase/auth"
// import "firebase/database"
// import "firebase/firestore"
// import "firebase/storage"



export default class AuthScreen extends React.Component {
    // firebaseConfig = {
    //     apiKey: "aAIzaSyCB6aQPogJrz3-8Xm6-hGDreX0RjndNGz4",
    //     authDomain: "patternize-1642320697379.firebaseapp.com",
    //     databaseURL: "https://project-id.firebaseio.com",
    //     projectId: "patternize-1642320697379",
    //     storageBucket: "patternize-1642320697379.appspot.com",
    //     messagingSenderId: "1094569404009",
    //     appId: "1:1094569404009:android:17cfb5c02bbd210d4864f8",
    //     measurementId: "299766868"
    // };    
    
    
    state = { user: null};

    componentDidMount() {
        this.initAsync();
    }

    initAsync = async() => {
        await GoogleSignIn.initAsync({
            clientId:'1094569404009-jld5nvnbjfntoc9206o37quqjdlsr5r8.apps.googleusercontent.com',
        })
        this._syncUserWithStateAsync()
    }

    _syncUserWithStateAsync = async() => {
        const user = await GoogleSignIn.signInSilentlyAsync()
        this.setState({user})
    }

    signOutAsync = async () => {
        await GoogleSignIn.signOutAsync()
        this.setState({user:null})
    }

    signInAsync = async () => {
        try {
            await GoogleSignIn.askForPlayServicesAsync();
            const { type, user } = await GoogleSignIn.signInAsync();
            if (type === 'success') {
            this._syncUserWithStateAsync();
            }
        } catch ({ message }) {
            alert('login: Error:' + message);
    }
    };

    onPress = () => {
        if (this.state.user) {
            this.signOutAsync();
        } else {
            this.signInAsync();
        }
    };

    render() {
        return ( 
        <View style={styles.detailContainer}>
            <Text style = {styles.title} onPress={this.onPress}>Toggle Auth</Text>
        </View>
        ) 
            
    }
    
    
}
const styles = StyleSheet.create({
    listHeader: {
      backgroundColor: '#eee',
      color: "#222",
      height: 44,
      padding: 12
    },
    detailContainer: {
      paddingHorizontal: 20,
      marginTop:100
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      paddingTop: 10
    },
    message: {
      fontSize: 14,
      paddingBottom: 15,
      borderBottomColor: "#ccc",
      borderBottomWidth: 1
    },
    dp:{
      marginTop: 32,
      paddingHorizontal: 24,
      flexDirection: 'row',
      justifyContent: 'center'
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
      flexDirection: 'row',
      justifyContent: 'center'
    },
    buttonContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
      flexDirection: 'row',
      justifyContent: 'center'
    }
  });
