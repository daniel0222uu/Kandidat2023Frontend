import React, {useState, useRef} from "react";
import {View, Text, SafeAreaView, Image, Pressable, Modal} from "react-native";
import SEB from "../images/SEB.jpeg";
import vattenfall from "../images/vattenfall.jpeg";
import sweco from "../images/sweco.png"
import Swiper from "react-native-deck-swiper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign, Entypo } from '@expo/vector-icons'
import JobInfo from "../components/JobInfo";





const SwipeScreen = ({userInfo}) => {
    const swipeRef = useRef(null);

   

    const [jobs, setJobs] = useState([]);

    // const [card, setCards] = useState(false);

    const [cardIndex, setCardIndex] = useState(0);

    const [likedIDs, setLikedIDs] = useState([]);
    const [notLikedIDs, setNotLikedIDs] = useState([]);

    const [likedID, setLikedID] = useState("");


    const goToWebsite = () => {
        Linking.openURL('https://www.stssektionen.com/');
      };



    const fetchJobs = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/fetchJobs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    {
                        "id": userInfo.userID
                    }
                )
            });
            const data = await response.json();
            setJobs(data.jobs);
        } catch (error) {
            console.error(error);
        }
    };

    useState(() => {
        fetchJobs();
    }, []);

    const storeLiked = async (likesToSend, userIDofUser) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/likedJob", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    {
                        "liked": likesToSend,
                        "id": userIDofUser
                    }
                )
            });
            const data = await response.json();
        } catch (error) {
            console.error(error);
        }
    };

    const storeDisliked = async (likesToSend, userIDofUser) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/dislikedJob", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    {
                        "disliked": likesToSend,
                        "id": userIDofUser
                    }
                )
            });
            const data = await response.json();
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <SafeAreaView className='flex-1 -mt-8'>
            <View className='flex-1'>
                <Swiper
                    ref={swipeRef}
                    infinite={false}
                    containerStyle={{ backgroundColor: '#FFFFFF' }}
                    cards={jobs}
                    stackSize={3} /* Amount of cards (companies) in the deck*/
                    cardIndex={0}        /*Start from card 0 in the deck*/
                    animateCardOpacity
                    verticalSwipe={false}

                    onSwipedLeft={() => {
                        if (cardIndex == jobs.length - 1) {
                            return;
                        }
                        setCardIndex(cardIndex + 1);
                        storeDisliked(jobs[cardIndex].jobID, userInfo.userID);
                    }}
                    onSwipedRight={() => {
                        if (cardIndex == jobs.length - 1) {
                            return;
                        }
                        setCardIndex(cardIndex + 1);
                        storeLiked(jobs[cardIndex].jobID, userInfo.userID);
                    }}
                    overlayLabels={{        /*LIKE and NOPE signs*/
                        left: {
                            title: 'NOPE',
                            style: {
                                label: {
                                    textAlign: 'right',
                                    color: 'red'
                                },
                            },
                        },
                        right: {
                            title: 'LIKE',
                            style: {
                                label: {
                                    textAlign: 'left',
                                    color: '#4DED30'
                                },
                            },
                        },
                    }}
                    renderCard={(card) => card ? (
                        <Pressable >
                            <View key={card.id}
                                style={{ backgroundColor: '#f6f6f6', height: '87%', borderRadius: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.35, shadoRadius: 3, elevation: 2 }}
                            >
                                <Image style={{
                                    flex: 1, justifyContent: 'center', height: '30%',
                                    margin: '5%', borderRadius: 5
                                }} source={{ uri: card.employerImage }} />
                                <Text className='font-bold text-4xl mt-5 text-center'>{card.jobType}</Text>
                                <Text className='text-xl mt-5 text-center'>{card.jobDescription}</Text>

                                <View className="flex-1 flex-row">
                                    <View className="flex-1 items-end mt-5 pt-12">
                                        <Entypo name='location-pin' size={54} />
                                    </View>
                                    <View className="flex-1 items-center mt-5 pt-12 mr-10 pr-10">
                                        <Text className=" flex-1 text-xl">{card.location}</Text>
                                    </View>
                                </View>
                            </View>
                        </Pressable>
                    ) : (

                        <View style={{ position: 'relative', justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: 'rgb(244 244 245)', height: '75%', borderRadius: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadoRadius: 3, elevation: 2 }}>
                            <Text className='font-bold pb-5'>No more companies</Text>
                            <Entypo name='emoji-sad' size={70} />
                        </View>

                    )
                    }
                />
            </View>

            {/* LIKE/NOPE buttons*/}
            <View className='flex flex-row justify-evenly bg-white pb-3'>
                <TouchableOpacity
                    onPress={() => swipeRef.current.swipeLeft()}
                    style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 50, width: 75, height: 75, backgroundColor: 'rgb(254 202 202)' }}>
                    <Entypo name='cross' size={35} />
                </TouchableOpacity>

        <TouchableOpacity 
        onPress={() =>swipeRef.current.swipeRight()}
        style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 50, width: 75, height: 75, backgroundColor: 'rgb(187 247 208)' }}>
            <AntDesign name='heart' size={30}/>
        </TouchableOpacity>
    </View>

   

        </SafeAreaView>
    );
};

export default SwipeScreen;