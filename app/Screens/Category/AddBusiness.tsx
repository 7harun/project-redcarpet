import React, { useState, useRef, useEffect } from 'react'
import { View, Text, SafeAreaView, Image, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { COLORS, FONTS } from '../../constants/theme';
import { IconButton } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
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
// import Video from 'react-native-video';
import { Video } from 'expo-av';
import ViewImage from '../../components/Card/ViewImage';
import axios from 'axios';




const sliderData = [
    { title: "Your Business" },
    { title: "Post New Business" }
];

interface BusinessItem {
    id: string;
    fileName: string;
    filePath: string;
    mediaType: string;
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
            const response = await axios.get('http://192.168.1.13:3000/uploads'); // Replace with your local IP
            SetListData(response.data);
            console.log("Fetched 'Your Business' data:", response.data);
        } catch (error) {
            console.error("Error fetching 'Your Business' data:", error);
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
            <View
                style={[{
                    shadowColor: 'rgba(195, 123, 95, 0.20)',
                    shadowOffset: { width: 2, height: 4 },
                    shadowOpacity: .6,
                    shadowRadius: 5
                }, Platform.OS === "ios" && {}]}
            />
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
                        contentContainerStyle={{ paddingBottom: 230, paddingHorizontal: 15 }}
                    >
                        {show ?
                            <View style={[GlobalStyleSheet.row, { marginTop: 5 }]}>
                                {ListData.map((item, index) => (
                                    <View key={index} style={[GlobalStyleSheet.col50, { marginBottom: 20 }]}>
                                        <ViewImage
                                            id={item.fileName} // Or any other unique identifier
                                            image={item.filePath} // Use URL from the data
                                            mediaType={item.mediaType} // Pass mediaType to ViewImage
                                            onPress={() => navigation.navigate('ProductDetails')} // Adjust navigation as needed
                                            onPress1={() => console.log('Add to wishlist')} // Adjust functionality as needed
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
