import React, { useState, useRef ,useEffect} from 'react'
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { GetCategoryData } from '../../api/api';



// const sliderData = [
//     {
//         title: "Crazy Deals",
//     },
//     {
//         title: "Budget Buys",
//     },
//     {
//         title: "Best Offer",
//     },
//     {
//         title: "Packages",
//     },
//     {
//         title: "Nearby",
//     },
//     {
//         title: "Trending",
//     },

// ]

const ListData = [
    {
        id:"21",
        image: IMAGES.ph3,
        title: "Marraige shoot",
        price: "8000",
        discount: "1000",
        review:"40% Off",
    },
    {
        id:"22",
        image: IMAGES.ph1,
        title: "Photography",
        price: "8000",
        discount: "1000",
        review:"40% Off",
    },
    {
        id:"23",
        image: IMAGES.mahendi,
        title: "Mehandi",
        price: "8000",
        discount: "1000",
        review:"40% Off",
    },
    {
        id:"24",
        image: IMAGES.mandap,
        title: "  Mandap \nDecorations",
        price: "8000",
        discount: "1000",
        review:"40% Off",
    },
    {
        id:"25",
        image: IMAGES.party4,
        title: "  Outdoor \nDecorations",
        price: "8000",
        discount: "1000",
        review:"40% Off",
    },
    {
        id:"26",
        image: IMAGES.ph2,
        title: "Decorations",
        price: "8000",
        discount: "1000",
        review:"40% Off",
    },
    {
        id:"27",
        image: IMAGES.catring1,
        title: "Catering Services",
        price: "8000",
        discount: "1000",
        offer:"40% Off",
    },
    {
        id:"28",
        image: IMAGES.catring2,
        title: "Catering Services",
        price: "8000",
        discount: "1000",
        review:"40% Off",
    }
]

const gridData = [
    {
        id:"13",
        image: IMAGES.ph3,
        title: "Marraige shoot",
        price: "8000",
        discount: "1000",
        offer:"40% Off",
        success:false
    },
    {
        id:"14",
        image: IMAGES.ph1,
        title: "Photography",
        price: "8000",
        discount: "1000",
        review:"40% Off",
        offer:"FREE Delivery",
        success:true
    },
    {
        id:"15",
        image: IMAGES.mahendi,
        title: "Mehandi",
        price: "8000",
        discount: "1000",
        review:"40% Off",
        offer:"40% Off",
        success:false
    },
    {
        id:"16",
        image: IMAGES.mandap,
        title: "  Mandap \nDecorations",
        price: "8000",
        discount: "1000",
        review:"40% Off",
        offer:"FREE Delivery",
        success:true
    },
    {
        id:"17",
        image: IMAGES.party4,
        title: "  Outdoor \nDecorations",
        price: "8000",
        discount: "1000",
        review:"40% Off",
        offer:"40% Off",
        success:false
    },
    {
        id:"18",
        image: IMAGES.ph2,
        title: "Decorations",
        price: "8000",
        discount: "1000",
        review:"40% Off",
        offer:"FREE Delivery",
        success:true
    },
    {
        id:"19",
        image: IMAGES.catring1,
        title: "Catering Services",
        price: "8000",
        discount: "1000",
        offer:"40% Off",
        review:"(2k Review)",
        success:false
    },
    {
        id:"20",
        image: IMAGES.catring2,
        title: "Catering Services",
        price: "8000",
        discount: "1000",
        offer:"FREE Delivery",
        success:true
    }
    
]

// Define the media structure
type Media = {
    id: string;
    business_id: string;
    user_id: string;
    file_path: string;
    size: string;
    media_type: string;
  };
  
  // Update the CategoryData type to reflect the media as an object
  type CategoryData = {
    id: string;
    name_of_firm: string;
    media?: Media; // Media is now a single object
  };
  
  type IndividualCategoriesDataType = Record<string, CategoryData[]>;
  


type IndividualCategoryScreenProps = StackScreenProps<RootStackParamList, 'IndividualCategory'>;

const IndividualCategory = ({ route,navigation } : IndividualCategoryScreenProps) => {
    
    const { categoryId } = route.params;

    const theme = useTheme();
    const { colors }:{colors : any} = theme;

    const [show, setshow] = useState(true);

    const sheetRef = useRef<any>();

    const dispatch = useDispatch();

    const addItemToWishList = (data: any) => {
        dispatch(addTowishList(data));
    }

    const addItemToCart = (data: any) => {
        dispatch(addToCart(data));
    }

    const [IndividualCategoriesData, SetIndividualCategoriesData] = useState<IndividualCategoriesDataType>({});
    const [sliderData, setSliderData] = useState<{ title: string; id: string }[]>([]); // Store both title and id

    const getCategoriesData = async (selectedCategoryId?: string) => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            const data = selectedCategoryId 
            ? { sub_category_id: selectedCategoryId }  // Use sub_category_id if selectedCategoryId is present
            : { id: categoryId }; // Otherwise, use the categoryId for the main category
            const response = await axios.post(GetCategoryData(),data, {
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            }); // Replace with your actual API URL
            if (response.data.status === 1) {
                SetIndividualCategoriesData(response.data['data']);
                const categoryKeys = Object.keys(response.data['data']);
                const formattedSliderData = categoryKeys.map((key) => {
                    // Assuming each category has an array of items, get the first item's id for the slider
                    const firstItem = response.data['data'][key]?.[0];
                    return {
                        title: key,
                        id: firstItem ? firstItem.service_categories : '', // Use the ID from the first item or an empty string if no items exist
                    };
                });
                setSliderData(formattedSliderData);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(()=>{
        getCategoriesData();
    },[]);
    console.log(IndividualCategoriesData,'IndividualCategoriesData');

    const handleSliderItemClick = (selectedCategoryId: string) => {
        getCategoriesData(selectedCategoryId); // Fetch data for the selected category ID
    };

    

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
                <View style={{
                        height: 60,
                        backgroundColor:theme.dark ? 'rgba(0,0,0,.4)':'rgba(255,255,255,.4)',
                        borderBottomLeftRadius:25,
                        borderBottomRightRadius:25,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                     <View style={{height:40,width:40,borderRadius:15,backgroundColor:colors.card,justifyContent:'center',marginLeft:10,}}>
                        <IconButton
                            onPress={() => navigation.goBack()}
                            icon={props => <MaterialIcons name="arrow-back-ios" {...props} />}
                            iconColor={colors.title}
                            size={20}
                        />
                     </View>
                    <View style={{ height: 40, backgroundColor: colors.card, borderRadius: 10, marginLeft: 10, flex: 1 }}>
                        <TextInput
                            placeholder='Search Products'
                            placeholderTextColor={theme.dark ? 'rgba(255, 255, 255, .6)' : 'rgba(0, 0, 0, 0.6)'}
                            style={{ ...FONTS.fontRegular, fontSize: 16, color: colors.title, paddingLeft: 40,flex:1,borderRadius:15 }}
                        />
                        <View style={{ position: 'absolute', top: 9, left: 10, }}>
                            <Image
                                style={{ height: 20, width: 20, resizeMode: 'contain', tintColor: colors.title }}
                                source={IMAGES.search}
                            />
                        </View>
                    </View>
                    <TouchableOpacity
                        style={{ padding: 10, marginLeft: 10 }}
                        onPress={() => {
                            setshow(!show)
                        }}
                    >
                        <Image
                            style={{ height: 22, width: 22, resizeMode: 'contain', tintColor: colors.title }}
                            source={
                                show
                                    ?
                                    IMAGES.list
                                    :
                                    IMAGES.grid
                            }
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ padding: 10, marginRight: 10 }}
                        onPress={() => navigation.navigate('MyCart')}
                    >
                        <Image style={{
                            height: 20,
                            width: 20,
                            resizeMode: 'contain',
                            tintColor: colors.title
                        }} source={IMAGES.shopping2} />
                        <View style={[GlobalStyleSheet.notification, { position: 'absolute', right: 3, bottom: 22 }]}>
                            <Text style={{ ...FONTS.fontRegular, fontSize: 10, color: COLORS.white }}>14</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[GlobalStyleSheet.container, { paddingTop: 20 }]}>
                <View style={{ marginHorizontal: -15, marginBottom: 10 }}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 15 }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 10,
                                justifyContent: 'center',
                            }}
                        >
                            {sliderData.map((data, index) => {
                                return (
                                    <View
                                        key={index}
                                        style={[
                                            {
                                                shadowColor: 'rgba(195, 123, 95, 0.20)',
                                                shadowOffset: {
                                                    width: 2,
                                                    height: 4,
                                                },
                                                shadowOpacity: 0.1,
                                                shadowRadius: 5,
                                                marginBottom: 5,
                                            },
                                            Platform.OS === 'ios' && {
                                                backgroundColor: 'rgba(255, 255, 255, 0.70)',
                                                borderRadius: 12,
                                            },
                                        ]}
                                    >
                                        <TouchableOpacity
                                            style={{
                                                backgroundColor: colors.card,
                                                height: 40,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: 12,
                                                paddingHorizontal: 20,
                                                paddingVertical: 5,
                                            }}
                                            onPress={() => handleSliderItemClick(data.id)} // Handle slider item click
                                        >
                                            <Text style={{ ...FONTS.fontMedium, fontSize: 13, color: colors.title }}>
                                                {data.title}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
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
                        {show ? (
                            <View style={[GlobalStyleSheet.row, { marginTop: 5 }]}>
                                {Object.keys(IndividualCategoriesData).map((categoryKey) => {
                                    // categoryKey could be "Venues", "Decorators", "Caterers", etc.
                                    const categoryData = IndividualCategoriesData[categoryKey];

                                    // Ensure categoryData exists and is an array
                                    if (Array.isArray(categoryData)) {
                                        return categoryData.map((item: CategoryData, index: number) => {
                                            // Check if media exists and extract file_path
                                            const imageSource = item?.media?.file_path ? item.media.file_path : null;
                                            console.log(imageSource)
                                            return (
                                                <View key={index} style={[GlobalStyleSheet.col50, { marginBottom: 20 }]}>
                                                    <Cardstyle2
                                                        id={item.id}
                                                        image={imageSource ? { uri: imageSource } : IMAGES.redcarpet} 
                                                        title={item.name_of_firm}
                                                        price={'8000'} // Replace with actual price if available
                                                        discount={'1000'} // Replace with actual discount if available
                                                        onPress={() => navigation.navigate('ProductDetails')}
                                                        onPress1={() => addItemToWishList(item)}
                                                        likebtn
                                                    />
                                                </View>
                                            );
                                        });
                                    }
                                    return null;
                                })}
                            </View>
                        ) : (
                            <View style={{ marginTop: -10 }}>
                                {/* Grid view handling */}
                            </View>
                        )}




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
                    style={{ width: '100%', height: 100, borderRadius: 10 }}
                    // blurType="light"  // Ensure this is correct for the library you're using
                    // blurAmount={10}  // This might be blurRadius or similar in your library
                    // reducedTransparencyFallbackColor="white"
                    />
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

export default IndividualCategory