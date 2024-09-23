import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, StyleSheet ,TextInput ,TouchableOpacity , Platform} from 'react-native';
import { IconButton } from 'react-native-paper';
import { MaterialIcons} from '@expo/vector-icons';
import { IMAGES } from '../../constants/Images';
import { Video as ExpoVideo, ResizeMode } from 'expo-av';
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
    const [show, setshow] = useState(true);
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
                console.log(response.data['data']);
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
                                                                    resizeMode={ResizeMode.COVER}  // Using ResizeMode.COVER from the enum
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
                                                                        resizeMode={ResizeMode.COVER}  // Using ResizeMode.COVER from the enum
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
        marginHorizontal: 5, // Adjust margin between two items


    },
    mediaContainer: {
        width: 150, // Define a fixed width
        height: 150, // Define a fixed height for both images and videos
        marginRight: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    video: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    noMediaText: {
        textAlign: 'center',
        lineHeight: 150, // Center the text vertically
        color: '#aaa',
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
