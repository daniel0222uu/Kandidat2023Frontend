import { StatusBar } from 'expo-status-bar';
import { View} from 'react-native';
import React, {useState, useEffect} from "react";
import BottomNavigation from "./assets/navigation/BottomNavigation";
import LoginScreen from "./assets/screens/LoginScreen";
import { NavigationContainer } from '@react-navigation/native';
import CompetenceScreen from "./assets/screens/CompetenceScreen";
import RegisterScreen from "./assets/screens/RegisterScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";




export default function App() {

    const [loggedIn, setLoggedIn] = useState(false);
    const updateLoggedInState = (value) => {
        console.log("update LoggedInState called in App.js with the value", value);
        setLoggedIn(value);
        if(value === false ){
            setFirstTimeLoggingIn(false);
            AsyncStorage.removeItem("@token");
        }
    };
    const loggedOut = (value) => {
        setLoggedIn(value);
    }

    const [registerStatus, setRegisterStatus] = useState(false);
    const updateRegisterStatus = (value) => {
        setRegisterStatus(value);
    };

    const [firstTimeLoggingIn, setFirstTimeLoggingIn] = useState(false);

    const [userInfo, setUserInfo] = useState({
        userID: 1,
        firstName: "Victoria",
        lastName: "Berinder",
        education: "Civilingenjör i System I teknik och samhälle",
        userEmail: "vickan@mail.com",
        university: "Uppsala Universitet",
        semester: 5,
    });

    const onChangeUserData = (data) => {
        setUserInfo(data);
    }

    const updateFirstTimeLoggingIn = (value) => {
        setFirstTimeLoggingIn(value);
    }

    const updateUserInfo = (value) => {
        setUserInfo(value);
        console.log("updateUserInfo called in app.js with the value", userInfo);
        console.log("the value we get sent updateUserInfo in app.js is, ", value);
    }


    function finished(){
        console.log("finshed called in app.js");
        setLoggedIn(true);
    }

    useEffect( () =>{
        console.log("userInfo was changed in App.js to : ", userInfo)
        setLoggedIn(true);
        }, [userInfo]
    )


    const sendingToken = async (token) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/authWithToken", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: token
                }),
            });
            const data = await response.json();
            let userDataTemp = await data.userInfo;
            onChangeUserData(userDataTemp);
            updateUserInfo(userDataTemp);
            console.log("authenticateUser called in App.js with the value", userDataTemp);
            updateLoggedInState(true);
        } catch (error) {
            console.error(error);
        }
    };


    const authWithToken = async () => {
        try {
            const value = await AsyncStorage.getItem('@token')
            if(value !== null) {
                console.log(value)
            }
            sendingToken(value);
        } catch(e) {
            console.log(e);

        }
    }



    //useState(() => {
    //    console.log("fetch Jobs called")
    //     authWithToken();
    // }, []); Kommenterar bort så denna inte ska fucka.

    const clearToken = async () => {
        try {
            await AsyncStorage.removeItem('@token');
            if(value !== null) {
                console.log(value)
            }
            sendingToken(value);
        } catch(e) {
            console.log(e);

        }
    }




    return (



        <View className="flex-1">
            {loggedIn ? (
                <BottomNavigation userInfo={userInfo}
                                  isLoggedOut={updateLoggedInState}

                />
            ) : registerStatus ? (
                <RegisterScreen
                    updateRegisterState={updateRegisterStatus}
                    firstTimeLoggingIn={updateFirstTimeLoggingIn}
                />
            ) : firstTimeLoggingIn ? (
                <CompetenceScreen
                finishedToApp={finished}
                />
            ) : (
                <LoginScreen
                    updateLoggedInState={updateLoggedInState}
                    updateRegisterState={updateRegisterStatus}
                    updateUserInfo={updateUserInfo}
                />
            )}
        </View>




    );
}
