import React, { useState } from 'react'
import { useTheme } from '@react-navigation/native'
import { View, Text, SafeAreaView, Image, TouchableOpacity, StyleSheet, Platform, TextInput } from 'react-native'
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { ScrollView } from 'react-native-gesture-handler';
import { Feather  } from '@expo/vector-icons';
import CardStyle1 from '../../components/Card/CardStyle1';
import Cardstyle2 from '../../components/Card/Cardstyle2';
import Button from '../../components/Button/Button';
// import Scrolling from '../../components/Scrolling';
import SvgcurvedText from '../../components/SvgcurvedText';
import ImageSwiper from '../../components/ImageSwiper';
import ImageSwper2 from '../../components/ImageSwper2';
import { IMAGES } from '../../constants/Images';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { useDispatch, useSelector } from 'react-redux';
import { addTowishList } from '../../redux/reducer/wishListReducer';
import { addToCart } from '../../redux/reducer/cartReducer';
import { useEffect } from 'react';
// import Geolocation from 'react-native-geolocation-service';
import { PERMISSIONS, request } from 'react-native-permissions';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from 'react';
import { AuthContext } from '../../services/authContext';






const Swiper1Data =[
    {
        image:IMAGES.item8
    },
    {
        image:IMAGES.item9
    },
    {
        image:IMAGES.item10
    },
    {
        image:IMAGES.item8
    },
    {
        image:IMAGES.item9
    },
    {
        image:IMAGES.item10
    },
]

const Swiper2Data = [
    {
        id:"5",
        image: IMAGES.ph1,
        title: "Photography",
        price: "8000",
        discount: "10000",
        offer: "Up To 79% Off",
    },
    {
        id:"6",
        image: IMAGES.ph2,
        title: "Photography",
        price: "8000",
        discount: "10000",
        delivery: "Free delivery",
        offer: "Up To 69% Off",

    },
    {
        id:"7",
        image: IMAGES.bday,
        title: "Birthday decorations",
        price: "8000",
        discount: "10000",
        delivery: "Free delivery",
        offer: "Up To 79% Off",

    },
    {
        id:"8",
        image: IMAGES.mandap,
        title: "Mandap Decorations",
        price: "8000",
        discount: "10000",
        delivery: "Free delivery",
        marginTop:10
    }
   
]
const CategoriesData = [
    {
        image: IMAGES.product1,
        title: "Birthday"
    },
    {
        image: IMAGES.product2,
        title: "Wedding"
    },
    {
        image: IMAGES.product3,
        title: "House Warming"
    },
    {
        image: IMAGES.product4,
        title: "Reception"
    },
    {
        image: IMAGES.product1,
        title: "Dothi Cermony"
    },
    {
        image: IMAGES.product2,
        title: "Sangeth"
    },
    {
        image: IMAGES.product3,
        title: "Catering"
    },
    {
        image: IMAGES.product4,
        title: "Baby Shower"
    },
]

const cardstyle3DataData = [
    {
        image: IMAGES.party4,
        title: "Venue4",
        price: "8000",
        discount: "10000",
       
    },
    {
        image: IMAGES.catring1,
        title: "Catering services",
        price: "8000",
        discount: "10000",
       
    },
    {
        image: IMAGES.mahendi,
        title: "Mahendi services",
        price: "8000",
        discount: "10000",
       
    },
    {
        image: IMAGES.party4,
        title: "Venue4",
        price: "8000",
        discount: "10000",
       
    },
    {
        image: IMAGES.catring1,
        title: "Catering services",
        price: "8000",
        discount: "10000",
       
    },
    {
        image: IMAGES.mahendi,
        title: "Mahendi services",
        price: "8000",
        discount: "10000",
       
    },
]

const CardStyle1Data = [
    {
        id:"0",
        image: IMAGES.item11,
        title: "Venue1",
        price: "8000",
        discount: "10000",
       
    },
    {
        id:"1",
        image: IMAGES.item12,
        title: "Venue2",
        price: "8000",
        discount: "10000",
       
    },
    {
        id:"2",
        image: IMAGES.party3,
        title: "Venue3",
        price: "8000",
        discount: "10000",
       
    },
    {
        id:"3",
        image: IMAGES.party4,
        title: "Venue4",
        price: "8000",
        discount: "10000",
       
    },
]

const CardStyle2Data = [
    {
        id:"9",
        image: IMAGES.catring1,
        title: "Catering 1",
        price: "8000",
        discount: "10000",
    },
    {
        id:"10",
        image: IMAGES.catring2,
        title: "Catering 2",
        price: "8000",
        discount: "10000",
    },
    {
        id:"11",
        image: IMAGES.catring1,
        title: "Catering 3",
        price: "8000",
        discount: "10000",
    },
    {
        id:"12",
        image: IMAGES.catring2,
        title: "Catering 4",
        price: "8000",
        discount: "10000",
    }
]

const CardDecorators = [
    {
        id:"9",
        image: IMAGES.bday,
        title: "BirthDay Decorations",
        price: "8000",
        discount: "10000",
    },
    {
        id:"10",
        image: IMAGES.staged,
        title: "Stage decorations",
        price: "8000",
        discount: "10000",
    },
    {
        id:"11",
        image: IMAGES.bday,
        title: "BirthDay Decorations",
        price: "8000",
        discount: "10000",
    },
    {
        id:"12",
        image: IMAGES.mandap,
        title: "Mandap Decorations",
        price: "8000",
        discount: "10000",
    }
]

const CardPhotoGraphers = [
    {
        id:"9",
        image: IMAGES.ph1,
        title: "Photography",
        price: "8000",
        discount: "10000",
    },
    {
        id:"10",
        image: IMAGES.ph2,
        title: "Videography",
        price: "8000",
        discount: "10000",
    },
    {
        id:"11",
        image: IMAGES.ph3,
        title: "Outdoor shoots",
        price: "8000",
        discount: "10000",
    },
    {
        id:"12",
        image: IMAGES.ph1,
        title: "Photography",
        price: "8000",
        discount: "10000",
    }
]
const PeopleData = [
    {
        image: IMAGES.item41,
        title: "Sterling Silver\nRing",
        price: "$80",
        discount: "$95",
        delivery: "Free delivery",
    },
    {
        image: IMAGES.item42,
        title: "Sapphire Stud\nEarrings",
        price: "$80",
        discount: "$95",
        delivery: "Free delivery",
        marginTop:10
    },
    {
        image: IMAGES.item43,
        title: "Sterling Gold\nRing",
        price: "$80",
        discount: "$95",
        delivery: "Free delivery",
    },
    {
        image: IMAGES.item13,
        title: "Sapphire Stud\nEarrings",
        price: "$80",
        discount: "$95",
        delivery: "Free delivery",
        marginTop:10
    }
]

const People2Data = [
    {
        image: IMAGES.item45,
        title: "Dazzling Gold\nBracelet",
        price: "$80",
        discount: "$95",
        delivery: "Free delivery",
        marginTop:10
    },
    {
        image: IMAGES.item44,
        title: "Dazzling Gold\nBracelet",
        price: "$80",
        discount: "$95",
        delivery: "Free delivery",
    },
    {
        image: IMAGES.item47,
        title: "Opal Statement\nNecklace",
        price: "$80",
        discount: "$95",
        delivery: "Free delivery",
        marginTop:10
    },
    {
        image: IMAGES.item46,
        title: "Sparkling Silver\nNecklace",
        price: "$80",
        discount: "$95",
        delivery: "Free delivery",
    },
]

const PopularData = [
    {
        image: IMAGES.item13,
        title: "Sapphire Stud\nEarrings",
        price: "$80",
        discount: "$95",
        delivery: "Free delivery",
    },
    {
        image: IMAGES.item41,
        title: "Sterling Silver\nRing",
        price: "$80",
        discount: "$95",
        delivery: "Free delivery",
    },
    {
        image: IMAGES.item42,
        title: "Sapphire Stud\nEarrings",
        price: "$80",
        discount: "$95",
        delivery: "Free delivery",
    },
    {
        image: IMAGES.item12,
        title: "Sterling Gold\nRing",
        price: "$80",
        discount: "$95",
        delivery: "Free delivery",
    }
]

const CartData = [
    {
        review: "(2k Review)",
        offer: "40% Off",
        image: IMAGES.party3,
        title: "Venue3",
        price: "8000",
        discount: "10000",
    },
    {
        image: IMAGES.catring1,
        title: "Catering",
        price: "8000",
        discount: "10000",
        review: "(2k Review)",
        offer: "Up To 70% Off",
    },
    {
        image: IMAGES.mahendi,
        title: "Mahendi services",
        price: "8000",
        discount: "10000",
        review: "(2k Review)",
        offer: "60% Off",
    },
]

const Cart2Data = [
    {
        image: IMAGES.item11,
        title: "Sterling Silver Ring",
        price: "$80",
        discount: "$95",
        review: "(2k Review)",
        offer: "40% Off",
    },
    {
        image: IMAGES.item40,
        title: "Sterling Silver Ring",
        price: "$80",
        discount: "$95",
        review: "(2k Review)",
        offer: "Up To 70% Off",
    },
]

const adsData = [
    {
        image: IMAGES.ads4,
    },
    {
        image: IMAGES.ads5,
    },
    {
        image: IMAGES.ads4,
    },
    {
        image: IMAGES.ads5,
    },
]

const SponsoredData = [
    {
        image: IMAGES.catring1,
        title: "Pearl Cluster\nRing",
        price: "$80",
        discount: "$89",
        offer:"Min. 30% Off"
    },
    {
        image: IMAGES.catring2,
        title: "Topaz\nSolitaire Ring",
        price: "$80",
        discount: "$89",
        offer:"Min. 50% Off"
    },
    {
        image: IMAGES.item40,
        title: "Pearl Cluster\nRing",
        price: "$80",
        discount: "$89",
        offer:"Min. 30% Off"
    },
]

const SliderData = [
    {
        image: IMAGES.star3,
        title: "Anklets"
    },
    {
        image: IMAGES.star3,
        title: "Earring"
    },
    {
        image: IMAGES.star3,
        title: "Bracelets"
    },
    {
        image: IMAGES.star3,
        title: "Bracelets"
    },
    
]


type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

// const Home: React.FC<HomeScreenProps> = ({ navigation }) => {
const Home = ({navigation} : HomeScreenProps) => {
    const authContext = useContext(AuthContext);

    // Safely extract userInfo properties, avoiding any conditional hook call
    const userInfo = authContext?.userInfo || null;
    const username = userInfo?.username;
    const email = userInfo?.email;
    const role = userInfo?.role;

    // Conditional rendering
    if (!userInfo) {
        return null; // or some fallback UI
    }

  
    // const { username, email, role } = authContext.userInfo;

    
    // type Location = {
    //     latitude: number;
    //     longitude: number;
    //   } | null;


    // const [location, setLocation] = useState<Location>(null);
    // const [address, setAddress] = useState<string>('Fetching location...');
    // // const GOOGLE_MAPS_APIKEY = "AIzaSyCmpq6ns1sG4YZY0wiGT6dZwrUV1P4Lfr0";

    // useEffect(() => {
    //     const requestLocationPermission = async () => {
    //     if (Platform.OS === 'web') {
    //         if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(
    //             (position) => {
    //             const { latitude, longitude } = position.coords;
    //             setLocation({ latitude, longitude });
    //             },
    //             (error) => {
    //             console.error(error.message);
    //             },
    //             { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    //         );
    //         } else {
    //         console.error('Geolocation is not supported by this browser.');
    //         }
    //     } else {
    //         const result = await request(
    //         Platform.OS === 'ios'
    //             ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
    //             : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    //         );

    //         if (result === 'granted') {
    //         Geolocation.getCurrentPosition(
    //             (position) => {
    //             const { latitude, longitude } = position.coords;
    //             setLocation({ latitude, longitude });
    //             },
    //             (error) => {
    //             console.log(error.code, error.message);
    //             },
    //             { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    //         );
    //         }
    //     }
    //     };

    //     requestLocationPermission();
    // }, []);

    // useEffect(() => {
    //     const getAddressFromCoords = async () => {
    //     if (location) {
    //         try {
    //         const response = await axios.get(
    //             `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${GOOGLE_MAPS_APIKEY}`
    //         );

    //         if (response.data.results.length > 0) {
    //             const address = response.data.results[0].formatted_address;
    //             setAddress(address);
    //         } else {
    //             setAddress('Address not found');
    //         }
    //         } catch (error) {
    //         console.error('Error fetching address:', error);
    //         setAddress('Error fetching address');
    //         }
    //     }
    //     };

    //     getAddressFromCoords();
    // }, [location]);



    const theme = useTheme();
    const { colors }:{colors :any}  = theme;

    const dispatch = useDispatch();

    const [currentSlide, setCurrentSlide] = useState<any>(0);

    //const navigation = useNavigation();


    // const [state ,setstate] = useState<any>({
    //     pickcupCords:{
    //         latitude:23.12028, 
    //         longitude:81.30379,
    //         latitudeDelta: 0.0922,
    //         longitudeDelta: 0.0421,
    //     },
    //     droplocationCords:{
    //         latitude:23.05343, 
    //         longitude:81.37520,
    //         latitudeDelta: 0.0922,
    //         longitudeDelta: 0.0421,
    //     }
    // })

    // const GOOGLE_MAPS_APIKEY = "AIzaSyCmpq6ns1sG4YZY0wiGT6dZwrUV1P4Lfr0";

    // const {pickcupCords ,droplocationCords} = state

    const addItemToWishList = (data: any) => {
        dispatch(addTowishList(data));
    }

    const addItemToCart = (data: any) => {
        dispatch(addToCart(data));
    }

    const cart = useSelector((state:any) => state.cart.cart);

    return (
        <SafeAreaView style={{ backgroundColor: colors.background, flex: 1, marginBottom: 0 }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom:80 }}
            >
                    <View style={[GlobalStyleSheet.container, { marginHorizontal: 5, marginVertical: 5, backgroundColor: colors.background, marginBottom: 0, paddingBottom: 0 }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 45 }}>
                            <TouchableOpacity
                            onPress={() => navigation.openDrawer()}
                            >
                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'row',
                                gap: 10,
                                paddingRight: 15
                            }}>
                                <Image
                                style={{ height: 45, width: 45, borderRadius: 15 }}
                                source={IMAGES.small1}
                                />
                                <Text style={{ ...FONTS.fontJostLight, fontSize: 14, color: colors.title }}>{username}{"\n"}<Text style={{ fontSize: 18 }}>Red Carpet {role === '0' ? 'Customer' : 'Vendor'}</Text></Text>
                            </View>
                            </TouchableOpacity>
                            <View
                                style={[{
                                    shadowColor: 'rgba(195, 123, 95, 0.20)',
                                    shadowOffset: {
                                        width: 2,
                                        height: 20,
                                    },
                                    shadowOpacity: .1,
                                    shadowRadius: 5,
                                }]}
                            >
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Notification')}
                                    style={{ height:45,width:45,backgroundColor:colors.card,borderRadius:15,alignItems:'center',justifyContent:'center' }}
                                >
                                    <Image
                                        style={[GlobalStyleSheet.image, { tintColor:colors.title }]}
                                        source={IMAGES.bell}
                                    />
                                </TouchableOpacity>
                            </View>

                            {/* Display Location */}
                            {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Image style={{ height: 20, width: 20, marginRight: 5, tintColor: colors.title }} source={IMAGES.bell} />
                                <Text style={{ ...FONTS.fontJostLight, fontSize: 14, color: colors.title }}>
                                    {address}
                                </Text>
                            </View> */}
                            {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Image
                                    style={{ height: 20, width: 20, marginRight: 5, tintColor: colors.title }}
                                    source={IMAGES.bell} // Your location icon here
                                />
                                <Text style={{ ...FONTS.fontJostLight, fontSize: 14, color: colors.title }}>
                                    {location ? `Lat: ${location.latitude}, Lon: ${location.longitude}` : 'Fetching location...'}
                                </Text>
                            </View> */}
                        </View>

                    </View>
                <View style={{alignItems:'center',marginTop:20}}>
                    <View style={[GlobalStyleSheet.container,{padding:0}]}>
                        <ImageSwiper
                            data={Swiper1Data}
                        />
                    </View>
                    <View style={{position:'absolute',top:0,left:0,zIndex:-1}}>
                        <Image
                            source={IMAGES.border1}
                        />
                    </View>
                </View>
                <View style={{ width: '100%',marginBottom:5  }}>
                    <View style={[GlobalStyleSheet.container, { marginHorizontal: 5, marginVertical: 5, }]}>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                            <Text style={{ ...FONTS.Marcellus, fontSize: 20, color: colors.title }}>
                                {/* Add To Your{"\n"}Jewelry Collection */}
                                </Text>
                        </View>
                        <View style={{ marginHorizontal: -15, }}>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ paddingHorizontal: 15 }}
                            >
                                <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
                                    {CategoriesData.map((data, index) => {
                                        return (
                                            <TouchableOpacity
                                                activeOpacity={.9}
                                                onPress={() => navigation.navigate('Products')}
                                                key={index} style={{ alignItems: 'center',marginRight:7 }}
                                            >
                                                <View
                                                    style={[{
                                                        shadowColor: "rgba(195, 123, 95, 0.15)",
                                                        shadowOffset: {
                                                            width: 2,
                                                            height: 20,
                                                        },
                                                        shadowOpacity: .1,
                                                        shadowRadius: 5,
                                                    }, Platform.OS === "ios" && {
                                                        backgroundColor: colors.card,
                                                        borderRadius:100
                                                    }]}
                                                >
                                                    <View style={{backgroundColor:colors.card,height:80,width:80,borderRadius:100,alignItems:'center',justifyContent:'center'}}>
                                                        <Image
                                                            style={{ height: 80, width: 70,borderRadius:35, resizeMode: 'contain', }}
                                                            source={data.image}
                                                        />
                                                    </View>
                                                </View>
                                                <View style={{
                                                    marginTop: 10
                                                }}>
                                                    <Text style={{ ...FONTS.Marcellus, fontSize: 15, color: colors.title }}>{data.title}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </View>
                <View style={{paddingTop:0,overflow:'hidden',paddingBottom:0}}>
                    <View style={[GlobalStyleSheet.container,{padding:0}]}>
                        <View style={{zIndex:20,}}>
                           <Image
                                style={{width:'100%',tintColor:theme.dark ? colors.background : null,}}
                                source={IMAGES.border}
                           />
                        </View>
                        <Image
                            style={[{width:'100%',height:undefined,aspectRatio:1/.6,transform:[{scale:1.1}]},
                                    Platform.OS === "ios" && {aspectRatio:1/.5}
                            ]}
                            source={IMAGES.product5}
                        />
                        {/* <View style={{alignItems:'center',position:'absolute',left:0,right:0,top:70}}>
                            <View style={{height:85,width:85,backgroundColor:theme.dark ? 'rgba(0,0,0, 0.70)':'rgba(255, 255, 255, 0.70)',borderRadius:100,}}>
                                <View style={{position:'absolute',top:-56,left:-41}}>
                                    <SvgcurvedText
                                        small
                                    />
                                </View>
                            </View>
                        </View> */}
                        
                    </View>
                </View>
                <View style={[GlobalStyleSheet.container,{paddingTop:25}]}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <Text style={{ ...FONTS.Marcellus, fontSize: 24, color: colors.title, }}>Venues Near You</Text>
                    </View>
                    <View style={{ marginHorizontal: -15 ,marginTop:20,}}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 15 }}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15, marginRight: 10 }}>
                                {CardStyle1Data.map((data:any, index:any) => {
                                    return (
                                        <View style={[{ marginBottom: 20, width: SIZES.width > SIZES.container ? SIZES.container / 3 : SIZES.width / 2.3 }]} key={index}>
                                            <CardStyle1
                                                id={data.id}
                                                image={data.image}
                                                title={data.title}
                                                price={data.price}
                                                discount={data.discount}
                                                onPress={() => navigation.navigate('ProductDetails')}
                                                onPress1={() => addItemToWishList(data)}
                                                onPress2={() =>{addItemToCart(data) ; navigation.navigate('MyCart')}}            
                                                closebtn                                             
                                            />
                                        </View>
                                    )
                                })}
                            </View>
                        </ScrollView>
                    </View>
                    <View style={{top:60,left:0,position:'absolute',zIndex:-1}}>
                        <Image
                            style={{}}
                            source={IMAGES.border2}
                        />
                    </View>
                </View>

                <View style={[GlobalStyleSheet.container,{paddingTop:25}]}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <Text style={{ ...FONTS.Marcellus, fontSize: 24, color: colors.title, }}>Top Caterers near you</Text>
                    </View>
                    <View style={{ marginHorizontal: -15 ,marginTop:20,}}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 15 }}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15, marginRight: 10 }}>
                                {CardStyle2Data.map((data:any, index:any) => {
                                    return (
                                        <View style={[{ marginBottom: 20, width: SIZES.width > SIZES.container ? SIZES.container / 3 : SIZES.width / 2.3 }]} key={index}>
                                            <CardStyle1
                                                id={data.id}
                                                image={data.image}
                                                title={data.title}
                                                price={data.price}
                                                discount={data.discount}
                                                onPress={() => navigation.navigate('ProductDetails')}
                                                onPress1={() => addItemToWishList(data)}
                                                onPress2={() =>{addItemToCart(data) ; navigation.navigate('MyCart')}}            
                                                closebtn                                             
                                            />
                                        </View>
                                    )
                                })}
                            </View>
                        </ScrollView>
                    </View>
                    <View style={{top:60,left:0,position:'absolute',zIndex:-1}}>
                        <Image
                            style={{}}
                            source={IMAGES.border2}
                        />
                    </View>
                </View>

                <View style={[GlobalStyleSheet.container,{paddingTop:25}]}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <Text style={{ ...FONTS.Marcellus, fontSize: 24, color: colors.title, }}>Top Decorators near you</Text>
                    </View>
                    <View style={{ marginHorizontal: -15 ,marginTop:20,}}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 15 }}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15, marginRight: 10 }}>
                                {CardDecorators.map((data:any, index:any) => {
                                    return (
                                        <View style={[{ marginBottom: 20, width: SIZES.width > SIZES.container ? SIZES.container / 3 : SIZES.width / 2.3 }]} key={index}>
                                            <CardStyle1
                                                id={data.id}
                                                image={data.image}
                                                title={data.title}
                                                price={data.price}
                                                discount={data.discount}
                                                onPress={() => navigation.navigate('ProductDetails')}
                                                onPress1={() => addItemToWishList(data)}
                                                onPress2={() =>{addItemToCart(data) ; navigation.navigate('MyCart')}}            
                                                closebtn                                             
                                            />
                                        </View>
                                    )
                                })}
                            </View>
                        </ScrollView>
                    </View>
                    <View style={{top:60,left:0,position:'absolute',zIndex:-1}}>
                        <Image
                            style={{}}
                            source={IMAGES.border2}
                        />
                    </View>
                </View>

                <View style={[GlobalStyleSheet.container,{paddingTop:25}]}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <Text style={{ ...FONTS.Marcellus, fontSize: 24, color: colors.title, }}>Top Photographers near you</Text>
                    </View>
                    <View style={{ marginHorizontal: -15 ,marginTop:20,}}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 15 }}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15, marginRight: 10 }}>
                                {CardPhotoGraphers.map((data:any, index:any) => {
                                    return (
                                        <View style={[{ marginBottom: 20, width: SIZES.width > SIZES.container ? SIZES.container / 3 : SIZES.width / 2.3 }]} key={index}>
                                            <CardStyle1
                                                id={data.id}
                                                image={data.image}
                                                title={data.title}
                                                price={data.price}
                                                discount={data.discount}
                                                onPress={() => navigation.navigate('ProductDetails')}
                                                onPress1={() => addItemToWishList(data)}
                                                onPress2={() =>{addItemToCart(data) ; navigation.navigate('MyCart')}}            
                                                closebtn                                             
                                            />
                                        </View>
                                    )
                                })}
                            </View>
                        </ScrollView>
                    </View>
                    <View style={{top:60,left:0,position:'absolute',zIndex:-1}}>
                        <Image
                            style={{}}
                            source={IMAGES.border2}
                        />
                    </View>
                </View>


                <View style={[GlobalStyleSheet.container,{ backgroundColor: colors.background,paddingTop:0,paddingBottom:0}]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ ...FONTS.Marcellus, fontSize: 20, color: colors.title }}>Recently Shortlisted By You</Text>
                        <TouchableOpacity>
                            <Text style={{ ...FONTS.fontRegular, fontSize: 13, color: colors.title }}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginHorizontal: -15 ,marginTop:20,}}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 15, }}
                        >
                            <View style={[{
                                 flexDirection: 'row',
                                  alignItems: 'center',
                                   gap: 5,
                            },Platform.OS === "ios" && {
                                gap:5
                            }]}>
                                {cardstyle3DataData.map((data:any, index:any) => {
                                    return (
                                        <View style={[{  width: SIZES.width > SIZES.container ? SIZES.container / 3 : SIZES.width / 2.9 }]} key={index}>
                                            <CardStyle1
                                                id=''
                                                image={data.image}
                                                title={data.title}
                                                price={data.price}
                                                discount={data.discount}
                                                onPress={() => navigation.navigate('ProductDetails')}
                                                card3
                                                removelikebtn
                                            />
                                        </View>
                                    )
                                })}
                            </View>
                        </ScrollView>
                    </View>
                </View>
               
                <View style={{ backgroundColor: colors.background, width: '100%',}}>
                    <View style={[GlobalStyleSheet.container, { marginBottom:20 }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ ...FONTS.Marcellus, fontSize: 20, color: colors.title }}>People Also Viewed</Text>
                            <TouchableOpacity>
                                <Text style={{ ...FONTS.fontRegular, fontSize: 13, color: colors.title }}>See All</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[GlobalStyleSheet.row, { marginTop: 20 }]}>
                            {cardstyle3DataData.map((data:any, index:any) => {
                                return (
                                    <View style={[GlobalStyleSheet.col50, { marginBottom: 0 }]} key={index}>
                                        <Cardstyle2
                                            id=''
                                            image={data.image}
                                            title={data.title}
                                            price={data.price}
                                            discount={data.discount}
                                            delivery={data.delivery}
                                            onPress={() => navigation.navigate('ProductDetails')}
                                            marginTop={data.marginTop}
                                        />
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                </View>
                <View style={{ backgroundColor: colors.card, width: '100%', paddingBottom:10 }}>
                    <View style={[GlobalStyleSheet.container, { marginVertical: 10 }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ ...FONTS.Marcellus, fontSize: 20, color: colors.title }}>Items In Your Cart</Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('MyCart')}
                            >
                                <Text style={{ ...FONTS.fontMedium, fontSize: 13, color: colors.title }}>View Cart</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{}}>
                            {CartData.map((data:any, index:any) => {
                                return (
                                    <TouchableOpacity key={index}
                                        style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 20 }}
                                        onPress={() => navigation.navigate('MyCart')}
                                    >
                                        <Image
                                            style={{ width: 75, height: 75, borderRadius: 15,borderWidth:1,borderColor:colors.border }}
                                            source={data.image}
                                        />
                                        <View style={{}}>
                                            <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.title }}>{data.title}</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 5 }}>
                                                <Text style={{ ...FONTS.fontSemiBold, fontSize: 16, color: colors.title, }}>{data.price}</Text>
                                                <Text
                                                    style={{
                                                        ...FONTS.fontRegular,
                                                        fontSize: 13,
                                                        textDecorationLine: 'line-through',
                                                        textDecorationColor: 'rgba(0, 0, 0, 0.70)',
                                                        color: theme.dark ? 'rgba(255,255,255, .7)' : 'rgba(0, 0, 0, 0.70)',
                                                        marginRight: 5
                                                    }}>{data.discount}
                                                </Text>
                                                <Image
                                                    style={{ height: 12, width: 12, resizeMode: 'contain', }}
                                                    source={IMAGES.star4}
                                                />
                                                <Text style={{ ...FONTS.fontRegular, fontSize: 12, color: theme.dark ? 'rgba(255,255,255, .5)' : 'rgba(0, 0, 0, 0.50)' }}>(2k review)</Text>
                                            </View>
                                            <Text style={{ ...FONTS.fontRegular, fontSize: 14, color: colors.title }}>Quantity:<Text style={{ ...FONTS.fontBold, fontSize: 14 }}> 1</Text></Text>
                                        </View>
                                        <View
                                            style={[{
                                                shadowColor: "#000",
                                                shadowOffset: {
                                                    width: 2,
                                                    height: 2,
                                                },
                                                shadowOpacity: .1,
                                                shadowRadius: 5,
                                                position: 'absolute',
                                                right: 0,
                                            }, Platform.OS === "ios" && {
                                                backgroundColor: colors.card,
                                                borderRadius:50
                                            }]}
                                        >
                                            <TouchableOpacity
                                                style={{
                                                    height: 40,
                                                    width: 40,
                                                    borderRadius: 50,
                                                    backgroundColor:colors.background,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <Image
                                                    style={{ height: 18, width: 18, resizeMode: 'contain', tintColor:theme.dark ?  COLORS.card : COLORS.title }}
                                                    source={IMAGES.close}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button
                                title={'Proceed to checkout (3)'}
                                onPress={() => navigation.navigate('MyCart')}
                                btnRounded
                                outline={true}
                                icon={<Feather size={24} color={colors.card} name={'arrow-right'} />}
                                color={colors.card}
                                text={COLORS.primary}
                            />
                        </View>   
                    </View>
                </View>
                {/* <View style={{ backgroundColor:colors.background, width: '100%', }}>
                    <View style={[GlobalStyleSheet.container, { marginVertical: 10,marginBottom:5 }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ ...FONTS.Marcellus, fontSize: 20, color: colors.title }}>Popular Nearby</Text>
                            <TouchableOpacity>
                                <Text style={{ ...FONTS.fontRegular, fontSize: 13, color: colors.title }}>See All</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{ ...FONTS.fontRegular, fontSize: 13, color: colors.title }}>Up to 60% off + up to $107 Cash BACK</Text>
                    </View>
                </View>
                <View style={[GlobalStyleSheet.container,{backgroundColor:colors.background,paddingVertical:0,marginBottom:10}]}>
                    <View
                        style={[{
                            shadowColor: "rgba(195, 123, 95, 0.25)",
                            shadowOffset: {
                                width: 4,
                                height: 4,
                            },
                            shadowOpacity: .2,
                            shadowRadius: 5,
                            width:'100%',
                        }, Platform.OS === "ios" && {
                            backgroundColor: colors.card,
                            borderRadius:50
                        }]}
                    >
                        <Image
                            style={{width:'100%',borderRadius:15,height:150}}
                            source={IMAGES.ads1}
                        />
                    </View>
                </View> */}
                <View style={{ backgroundColor: colors.background, width: '100%', }}>
                    <View style={[GlobalStyleSheet.container, { marginBottom: 10, paddingBottom: 0, }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ ...FONTS.Marcellus, fontSize: 20, color: colors.title }}>Blockbuster deals</Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Products')}
                            >
                                <Text style={{ ...FONTS.fontRegular, fontSize: 13, color: colors.title }}>See All Deals</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[GlobalStyleSheet.container,{padding:0,paddingVertical:15}]}>
                        <ImageSwper2
                            data={Swiper2Data}
                        />
                    </View>
                </View>
                <View style={{ backgroundColor:colors.background, width: '100%' }}>
                    <View style={[GlobalStyleSheet.container, { marginVertical: 10, padding: 0,marginTop:20 }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: 20, marginLeft: 20 }}>
                            <Text style={{ ...FONTS.Marcellus, fontSize: 20, color: colors.title, }}>Add To Your wishlist</Text>
                            <TouchableOpacity>
                                <Text style={{ ...FONTS.fontRegular, fontSize: 13, color: colors.title }}>See All</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ marginHorizontal: 20, paddingRight: 40 }}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15, marginBottom: 10, gap: 20, }}>
                                {CardStyle2Data.map((data, index) => {
                                    return (
                                        <View style={[{ marginBottom: 20, width: SIZES.width > SIZES.container ? SIZES.container / 3 : SIZES.width / 2.3 }]} key={index}>
                                            <CardStyle1
                                                id={data.id}
                                                image={data.image}
                                                title={data.title}
                                                price={data.price}
                                                discount={data.discount}
                                                onPress={() => navigation.navigate('ProductDetails')}
                                                onPress1={() => addItemToWishList(data)}
                                                onPress2={() =>{addItemToCart(data) ; navigation.navigate('MyCart')}}
                                                closebtn
                                            />
                                        </View>
                                    )
                                })}
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    scrolling2: {
        backgroundColor: "red",
        width: '100%',
        // padding: 10,
        marginBottom: 10,
    },
    welcome: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    container: {
        height:undefined,
        width: '100%',
        aspectRatio:1/.6,
        //justifyContent:'center',
        //alignItems: 'center',
        //borderRadius: 6
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default Home;