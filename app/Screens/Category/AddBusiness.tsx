import React, { useState, useRef, useEffect } from 'react'
import { View, Text, SafeAreaView, TextInput, Image, TouchableOpacity, Platform } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { COLORS, FONTS} from '../../constants/theme';
import { IconButton } from 'react-native-paper';
import { MaterialIcons} from '@expo/vector-icons';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { ScrollView } from 'react-native-gesture-handler';
import CardStyle3 from '../../components/Card/CardStyle3';
import Cardstyle2 from '../../components/Card/Cardstyle2';
import { BlurView } from 'expo-blur';
import { IMAGES } from '../../constants/Images';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import BottomSheet2 from '../Shortcode/BottomSheet2';
import { useDispatch } from 'react-redux';
import { addTowishList } from '../../redux/reducer/wishListReducer';
import { addToCart } from '../../redux/reducer/cartReducer';
import PostBusiness from './PostBusiness';


const sliderData = [
    {
        title: "Your Business",
    },
    {
        title: "Post New Business",
    },
    

]



// const gridData = [
//     {
//         id:"13",
//         image: IMAGES.ph3,
//         title: "Marraige shoot",
//         price: "8000",
//         discount: "1000",
//         offer:"40% Off",
//         success:false
//     },
//     {
//         id:"14",
//         image: IMAGES.ph1,
//         title: "Photography",
//         price: "8000",
//         discount: "1000",
//         review:"40% Off",
//         offer:"FREE Delivery",
//         success:true
//     },
//     {
//         id:"15",
//         image: IMAGES.mahendi,
//         title: "Mehandi",
//         price: "8000",
//         discount: "1000",
//         review:"40% Off",
//         offer:"40% Off",
//         success:false
//     },
//     {
//         id:"16",
//         image: IMAGES.mandap,
//         title: "  Mandap \nDecorations",
//         price: "8000",
//         discount: "1000",
//         review:"40% Off",
//         offer:"FREE Delivery",
//         success:true
//     },
//     {
//         id:"17",
//         image: IMAGES.party4,
//         title: "  Outdoor \nDecorations",
//         price: "8000",
//         discount: "1000",
//         review:"40% Off",
//         offer:"40% Off",
//         success:false
//     },
//     {
//         id:"18",
//         image: IMAGES.ph2,
//         title: "Decorations",
//         price: "8000",
//         discount: "1000",
//         review:"40% Off",
//         offer:"FREE Delivery",
//         success:true
//     },
//     {
//         id:"19",
//         image: IMAGES.catring1,
//         title: "Catering Services",
//         price: "8000",
//         discount: "1000",
//         offer:"40% Off",
//         review:"(2k Review)",
//         success:false
//     },
//     {
//         id:"20",
//         image: IMAGES.catring2,
//         title: "Catering Services",
//         price: "8000",
//         discount: "1000",
//         offer:"FREE Delivery",
//         success:true
//     }
    
// ]

interface BusinessItem {
    id: string;
    image: any;
    title: string;
    price: string;
    discount: string;
    review?: string;
    offer?: string;
}

type AddBusinessScreenProps = StackScreenProps<RootStackParamList, 'AddBusiness'>;

const AddBusiness = ({ navigation } : AddBusinessScreenProps) => {


    const [ListData, SetListData] = useState<BusinessItem[]>([]); // Define state type as BusinessItem[]
    const theme = useTheme();
    const { colors }:{colors : any} = theme;

    const [selectedOption, setSelectedOption] = useState("Your Business");

    const handleSelectOption = (option: string) => {
        setSelectedOption(option);
        if (option === "Your Business") {
            // Call your API for "Your Business" here
            fetchYourBusinessData();
        } else if (option === "Post New Business") {
            navigation.navigate('PostBusiness'); // Navigate to the PostBusiness page
        }
    };

    const fetchYourBusinessData = () => {

        const staticData = [
            {
                id:"21",
                image: IMAGES.ph3,
                title: "Marraige shoot",
                price: "8000",
                discount: "1000",
                review:"40% Off",
            },
            // {
            //     id:"22",
            //     image: IMAGES.ph1,
            //     title: "Photography",
            //     price: "8000",
            //     discount: "1000",
            //     review:"40% Off",
            // },
            // {
            //     id:"23",
            //     image: IMAGES.mahendi,
            //     title: "Mehandi",
            //     price: "8000",
            //     discount: "1000",
            //     review:"40% Off",
            // },
            // {
            //     id:"24",
            //     image: IMAGES.mandap,
            //     title: "  Mandap \nDecorations",
            //     price: "8000",
            //     discount: "1000",
            //     review:"40% Off",
            // },
            // {
            //     id:"25",
            //     image: IMAGES.party4,
            //     title: "  Outdoor \nDecorations",
            //     price: "8000",
            //     discount: "1000",
            //     review:"40% Off",
            // },
            // {
            //     id:"26",
            //     image: IMAGES.ph2,
            //     title: "Decorations",
            //     price: "8000",
            //     discount: "1000",
            //     review:"40% Off",
            // },
            // {
            //     id:"27",
            //     image: IMAGES.catring1,
            //     title: "Catering Services",
            //     price: "8000",
            //     discount: "1000",
            //     offer:"40% Off",
            // },
            // {
            //     id:"28",
            //     image: IMAGES.catring2,
            //     title: "Catering Services",
            //     price: "8000",
            //     discount: "1000",
            //     review:"40% Off",
            // }
        ]
        SetListData(staticData);
        // Your API call logic here
        console.log("Fetching 'Your Business' data...");
    };

    useEffect(() => {
        setSelectedOption("Your Business");
        // Fetch data for "Your Business" by default on mount
        fetchYourBusinessData();
    }, []);

    const [show, setshow] = useState(true);

    const sheetRef = useRef<any>();

    const dispatch = useDispatch();

    const addItemToWishList = (data: any) => {
        dispatch(addTowishList(data));
    }

    const addItemToCart = (data: any) => {
        dispatch(addToCart(data));
    }

    return (
        <SafeAreaView style={{ backgroundColor: colors.background, flex: 1, }}>
             <View
                style={[{
                    shadowColor: 'rgba(195, 123, 95, 0.20)',
                    shadowOffset: {
                        width: 2,
                        height: 4,
                    },
                    shadowOpacity: .6,
                    shadowRadius: 5,
                }, Platform.OS === "ios" && {
                    //backgroundColor: colors.card,
                }]}
            >
                
            </View>
            <View style={[GlobalStyleSheet.container, { paddingTop: 20 }]}>
                <View style={{ marginHorizontal: -15, marginBottom: 10 }}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 15}}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
                            {sliderData.map((data, index) => {
                                const isSelected = selectedOption === data.title;
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={{
                                            backgroundColor: isSelected ? colors.primary : colors.card,
                                            height: 40,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: 12,
                                            paddingHorizontal: 20,
                                            paddingVertical: 5,
                                        }}
                                        onPress={() => handleSelectOption(data.title)}
                                    >
                                        <Text style={{ ...FONTS.fontMedium, fontSize: 13, color: colors.title }}>
                                            {data.title}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </ScrollView>
                </View>
                <View style={{ marginHorizontal: -15 }}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 230,paddingHorizontal:15 }}
                    >
                        {show ?
                            <View style={[GlobalStyleSheet.row,{marginTop:5}]}>
                                {ListData.map((data:any, index:any) => {
                                    return (
                                        <View key={index} style={[GlobalStyleSheet.col50, { marginBottom: 20 }]}>
                                            <Cardstyle2
                                                id={data.id}
                                                image={data.image}
                                                title={data.title}
                                                price={data.price}
                                                discount={data.discount}
                                                onPress={() => navigation.navigate('ProductDetails')}
                                                onPress1={() => addItemToWishList(data)}
                                                likebtn
                                            />
                                        </View>
                                    )
                                })}
                            </View>
                            :
                            <View style={{ marginTop: -10 }}>
                                {gridData.map((data:any, index:any) => {
                                    return (
                                        <CardStyle3
                                            id={data.id}
                                            key={index}
                                            title={data.title}
                                            price={data.price}
                                            image={data.image}
                                            discount={data.discount}
                                            onPress={() => navigation.navigate('MyCart')}
                                            onPress1={() => addItemToWishList(data)}
                                            onPress2={() =>{addItemToCart(data) ; navigation.navigate('MyCart')}}
                                            review={data.review}
                                            success={data.success}
                                            offer={data.offer}
                                            CardStyle4
                                            CardStyle5
                                            likeBtn
                                        />
                                    )
                                })}
                            </View>
                        }

                    </ScrollView>
                </View>
            </View>
            <View style={{
                width:'100%',
                position:'absolute',
                bottom:0,
                overflow:'hidden',
                borderTopLeftRadius:25,borderTopRightRadius:25,
            }}>
                <BlurView
                    style={[{width:'100%',height:60,borderRadius:50 },Platform.OS === "ios" && {height:80}]}
                    // overlayColor=''
                    // blurType="light"
                    // blurAmount={10}
                    // reducedTransparencyFallbackColor="white"
                >
                </BlurView>
                <View style={[{ 
                    backgroundColor:theme.dark ? 'rgba(0,0,0,0.50)':'rgba(255, 255, 255, 0.50)',
                    height: 60,
                    width:'100%',
                    flexDirection: 'row',
                    position:'absolute',
                    bottom:0,
                    borderTopLeftRadius:25,borderTopRightRadius:25,
                    
                    },Platform.OS === 'ios' &&{
                        height:80
                    }
                ]}
                >
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row', alignItems: 'center', gap: 5,flex:1,
                            paddingHorizontal:10,
                            justifyContent:'center'
                        }}
                        onPress={() => sheetRef.current.openSheet('gender')}
                    >
                        <Image
                            style={{ height: 20, width: 20, resizeMode: 'contain', tintColor: colors.title }}
                            source={IMAGES.user2}
                        />
                        <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title }}>Category</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row', alignItems: 'center', gap: 5,flex:1,
                            paddingHorizontal:10,
                            justifyContent:'center'
                        }}
                        onPress={() => sheetRef.current.openSheet('short')}
                    >
                        <Image
                            style={{ height: 20, width: 20, resizeMode: 'contain', tintColor: colors.title }}
                            source={IMAGES.arrowup}
                        />
                        <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title }}>SORT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row', alignItems: 'center', gap: 5,flex:1,
                            paddingHorizontal:10,
                            justifyContent:'center'
                        }}
                        onPress={() => sheetRef.current.openSheet('filter')}
                    >
                        <Image
                            style={{ height: 20, width: 20, resizeMode: 'contain', tintColor: colors.title }}
                            source={IMAGES.filter}
                        />
                        <Text style={{ ...FONTS.fontMedium, fontSize: 15, color: colors.title }}>FILTER</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: 1, height: 32, backgroundColor: '#D9D9D9', position: 'absolute', left: 135, bottom: 15 }}></View>
                <View style={{ width: 1, height: 32, backgroundColor: '#D9D9D9', position: 'absolute', right: 135, bottom: 15 }}></View>
            </View>
            <BottomSheet2
                ref={sheetRef}
            />
        </SafeAreaView>
    )
}

export default AddBusiness