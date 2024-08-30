import React, { useState, useRef, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, Platform, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import Cardstyle2 from '../../components/Card/Cardstyle2';
import { BlurView } from 'expo-blur';
import { IMAGES } from '../../constants/Images';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import BottomSheet2 from '../Shortcode/BottomSheet2';
import { useDispatch } from 'react-redux';
import { addTowishList } from '../../redux/reducer/wishListReducer';
import { addToCart } from '../../redux/reducer/cartReducer';
import { Video } from 'expo-av';
import ViewImage from '../../components/Card/ViewImage';
import axios from 'axios';
import CustomButton from '../../components/CustomButton';
import { GetBusiness } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const sliderData = [
    { title: "Your Business" },
    { title: "Post New Business" }
];

interface BusinessItem {
    id: string;
    vendor_id: string;
    name_of_firm: string;
    images: string;
    videos: string;
    mobile_no: string;
    email: string;
    address_line_1: string;
    address_line_2: string | null;
    city: string;
    country: string;
    state: string;
    pincode: string;
    service_availability_radius: string;
    service_categories: string;
    book_in_advance_days: string;
    created_at: string;
}


type AddBusinessScreenProps = StackScreenProps<RootStackParamList, 'AddBusiness'>;

const AddBusiness = ({ navigation }: AddBusinessScreenProps) => {
    const [ListData, SetListData] = useState<BusinessItem[]>([]);
    const theme = useTheme();
    const { colors }:{ colors: any } = theme;

    const [selectedOption, setSelectedOption] = useState("Your Business");

    const handleSelectOption = (option: string) => {
        setSelectedOption(option);
        if (option === "Your Business") {
            fetchYourBusinessData();
        } else if (option === "Post New Business") {
            navigation.navigate('PostBusiness');
        }
    };

    const fetchYourBusinessData = async () => {
        try {
            // Get the token from your auth context or storage
            const token = await AsyncStorage.getItem('authToken'); // Adjust this if your token is stored elsewhere
    
            const response = await axios.get(GetBusiness(), {
                headers: {
                    'Authorization': `${token}`, // Include the token in the headers
                    'Content-Type': 'application/json', // Optional: Specify the content type if needed
                },
            });
    
            console.log('API Response:', response.data[46]);
    
            if (Array.isArray(response.data)) {
                SetListData([response.data[46],response.data[47]]);
            } else if (response.data && Array.isArray(response.data.businessData)) {
                SetListData(response.data.businessData);
            } else {
                console.error('Expected an array but got:', response.data);
            }
        } catch (error) {
            console.error('Error fetching business data:', error);
        }
    };
    
    
    

    useEffect(() => {
        setSelectedOption("Your Business");
        fetchYourBusinessData();
    }, []);

    const [show, setshow] = useState(true);
    const sheetRef = useRef<any>();
    const dispatch = useDispatch();

    const addItemToWishList = (data: any) => {
        dispatch(addTowishList(data));
    };

    const addItemToCart = (data: any) => {
        dispatch(addToCart(data));
    };

    return (
        <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
            <View style={[GlobalStyleSheet.container, { paddingTop: 20 }]}>
                <View style={{ marginHorizontal: -15, marginBottom: 10 }}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 15 }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
                            {sliderData.map((data, index) => {
                                const isSelected = selectedOption === data.title;
                                return (
                                    <CustomButton
                                        key={index}
                                        title={data.title}
                                        onPress={() => handleSelectOption(data.title)}
                                        buttonStyle={{
                                            backgroundColor: isSelected ? colors.primary : colors.card,
                                            height: 40,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: 12,
                                            paddingHorizontal: 20,
                                            paddingVertical: 5,
                                        }}
                                        textStyle={{ ...FONTS.fontMedium, fontSize: 13, color: colors.title }}
                                    />
                                );
                            })}
                        </View>
                    </ScrollView>
                </View>
                <View style={{ marginHorizontal: -15 }}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 230, paddingHorizontal: 15 }}
                    >
                        {show ?
                            <View style={[GlobalStyleSheet.row, { marginTop: 5 }]}>
                                {ListData.map((item, index) => (
                                    <View key={index} style={[GlobalStyleSheet.col50, { marginBottom: 20 }]}>
                                        <ViewImage
                                            id={item.id} // Use a unique identifier
                                            image={item.images} // Use image URL from the data
                                            video={item.videos} // Use video URL from the data
                                            mediaType={item.videos ? 'video' : 'image'} // Determine media type
                                            onPress={() => navigation.navigate('ProductDetails')} // Adjust navigation as needed
                                            onPress1={() => addItemToWishList(item)} // Adjust functionality as needed
                                            likebtn={false} // Set as true or false based on your needs
                                        />
                                    </View>
                                ))}    
                            </View>
                            :
                            <View style={{ marginTop: -10 }}>
                                {/* You can place other components or content here */}
                            </View>
                        }
                    </ScrollView>
                </View>
            </View>
            
            <BottomSheet2
                ref={sheetRef}
            />
        </SafeAreaView>
    );
    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    item: {
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: 200,
    },
});

export default AddBusiness;
