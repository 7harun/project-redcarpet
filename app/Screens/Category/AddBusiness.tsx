import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Video as ExpoVideo } from 'expo-av';
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import CustomButton from '../../components/CustomButton';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import BottomSheet2 from '../Shortcode/BottomSheet2';
import axios from 'axios';
import { GetBusiness } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';


const sliderData = [
    { title: "Your Business" },
    { title: "Post New Business" }
];

interface BusinessItem {
    media: MediaItem[];
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

type MediaItem = {
    media_type: 'images' | 'videos';
    file_path: string;
};

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

    useEffect(() => {
        setSelectedOption("Your Business");
        fetchYourBusinessData();
    }, []);
    
    const sheetRef = useRef<any>();

    const fetchYourBusinessData = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            const userid = await AsyncStorage.getItem('userid');
            if (!token || !userid) {
                navigation.navigate('Login'); // Replace 'Login' with your actual login screen name
            return;
            }
            const response = await axios.get(GetBusiness(userid),{
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (Array.isArray(response.data['data'])) {
                SetListData(response.data['data']);
            } else if (Array.isArray(response.data.data)) {
                SetListData(response.data.data);
            } else {
                console.error('Expected an array but got:', response.data);
            }
        } catch (error) {
            console.error('Error fetching business data:', error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchYourBusinessData();
        }, [])
    );

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
                        {ListData.map((item, index) => {
                            const sliderDatamap = item.media;
                            
                            // Determine if the current index is even or odd
                            const isEvenIndex = index % 2 === 0;

                            // If the current index is even, create a row container
                            if (isEvenIndex) {
                                return (
                                    <View key={index} style={styles.rowContainer}>
                                        {/* First item in the row */}
                                        <View style={styles.businessContainer}>
                                            <ScrollView
                                                horizontal
                                                showsHorizontalScrollIndicator={false}
                                                contentContainerStyle={styles.mediaScrollContainer}
                                            >
                                                {sliderDatamap.length > 0 ? (
                                                    sliderDatamap.map((data, index) => (
                                                        <View key={index} style={styles.mediaContainer}>
                                                            {data.media_type === 'images' ? (
                                                                <Image
                                                                    source={{ uri: data.file_path }}
                                                                    style={styles.image}
                                                                />
                                                            ) : data.media_type === 'videos' ? (
                                                                <ExpoVideo
                                                                    source={{ uri: data.file_path }}
                                                                    style={styles.video}
                                                                    useNativeControls
                                                                />
                                                            ) : (
                                                                <Text style={styles.noMediaText}>No Media</Text>
                                                            )}
                                                        </View>
                                                    ))
                                                ) : (
                                                    <View style={styles.mediaContainer}>
                                                        <Text style={styles.noMediaText}>No Media</Text>
                                                    </View>
                                                )}
                                            </ScrollView>
                                            <View style={styles.businessDetails}>
                                                <Text style={styles.businessName}>{item.name_of_firm}</Text>
                                                <Text style={styles.businessDetail}>{item.address_line_1}</Text>
                                                <Text style={styles.businessDetail}>{item.city}</Text>
                                            </View>
                                        </View>

                                        {/* Second item in the row, if it exists */}
                                        {index + 1 < ListData.length && (
                                            <View style={styles.businessContainer}>
                                                <ScrollView
                                                    horizontal
                                                    showsHorizontalScrollIndicator={false}
                                                    contentContainerStyle={styles.mediaScrollContainer}
                                                >
                                                    {ListData[index + 1].media.length > 0 ? (
                                                        ListData[index + 1].media.map((data, idx) => (
                                                            <View key={idx} style={styles.mediaContainer}>
                                                                {data.media_type === 'images' ? (
                                                                    <Image
                                                                        source={{ uri: data.file_path }}
                                                                        style={styles.image}
                                                                    />
                                                                ) : data.media_type === 'videos' ? (
                                                                    <ExpoVideo
                                                                        source={{ uri: data.file_path }}
                                                                        style={styles.video}
                                                                        useNativeControls
                                                                    />
                                                                ) : (
                                                                    <Text style={styles.noMediaText}>No Media</Text>
                                                                )}
                                                            </View>
                                                        ))
                                                    ) : (
                                                        <View style={styles.mediaContainer}>
                                                            <Text style={styles.noMediaText}>No Media</Text>
                                                        </View>
                                                    )}
                                                </ScrollView>
                                                <View style={styles.businessDetails}>
                                                    <Text style={styles.businessName}>{ListData[index + 1].name_of_firm}</Text>
                                                    <Text style={styles.businessDetail}>{ListData[index + 1].address_line_1}</Text>
                                                    <Text style={styles.businessDetail}>{ListData[index + 1].city}</Text>
                                                </View>
                                            </View>
                                        )}
                                    </View>
                                );
                            } else {
                                // Return null for odd index, since it's handled by the even index logic
                                return null;
                            }
                        })}
                    </ScrollView>
                </View>

            </View>
            <BottomSheet2 ref={sheetRef} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Adjust spacing between items
        marginBottom: 15, // Add space between rows
    },
    businessContainer: {
        flex: 1,
        marginHorizontal: 5, // Adjust margin between two items
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        // Add other styles as needed
    },
    mediaScrollContainer: {
        flexDirection: 'row',
        paddingVertical: 10,
    },
    mediaContainer: {
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        overflow: 'hidden',
        marginRight: 10,
    },
    noMediaText: {
        color: '#888',
        fontSize: 16,
        textAlign: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    video: {
        width: '100%',
        height: '100%',
    },
    businessDetails: {
        marginTop: 10,
    },
    businessName: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    businessDetail: {
        fontSize: 14,
        textAlign: 'left',
        color: '#666',
    },
});

export default AddBusiness;
