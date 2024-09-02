import React, { useState } from 'react';
import { View, Text, TextInput, SafeAreaView, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import { useTheme } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import axios from 'axios';
import CustomButton from '../../components/CustomButton';
import { POSTBusinessUrl } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

type PostBusinessScreenProps = StackScreenProps<RootStackParamList, 'PostBusiness'>;

interface MediaFile {
    uri: string;
    type: string;
    name: string;
}

interface Category {
    id: string;
    name: string;
}

const categories: Category[] = [
    { id: '1', name: 'Retail' },
    { id: '2', name: 'Services' },
    { id: '3', name: 'Restaurant' },
    { id: '4', name: 'Other' },
];

const PostBusiness = ({ navigation }: PostBusinessScreenProps) => {
    const theme = useTheme();
    const { colors } = theme;

    const [businessName, setBusinessName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address1, setAddress1] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [sar, setSar] = useState('');
    const [bia, setBia] = useState('');
    const [category, setCategory] = useState<Category | null>(null);
    const [images, setImages] = useState<MediaFile[]>([]);
    const [video, setVideo] = useState<MediaFile | null>(null);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const pickMedia = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert("Permission required", "Permission to access media library is required!");
                return;
            }

            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsMultipleSelection: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled && result.assets.length > 0) {
                const selectedImages = [];
                let selectedVideo: MediaFile | null = null;

                for (const asset of result.assets) {
                    const mediaFile: MediaFile = {
                        uri: asset.uri,
                        type: asset.type === 'image' ? 'image/jpeg' : 'video/mp4',
                        name: asset.uri.split('/').pop() || (asset.type === 'image' ? 'photo.jpg' : 'video.mp4'),
                    };

                    if (asset.type === 'image') {
                        if (selectedImages.length < 3) {
                            selectedImages.push(mediaFile);
                        }
                    } else if (asset.type === 'video' && !selectedVideo) {
                        selectedVideo = mediaFile;
                    }
                }

                if (selectedImages.length > 0) {
                    setImages(selectedImages);
                }
                if (selectedVideo) {
                    setVideo(selectedVideo);
                }
            }
        } catch (error) {
            console.error("Error picking media:", error);
            Alert.alert("Error", "An error occurred while picking the media.");
        }
    };

    const uploadMedia = async () => {
        if (images.length === 0 && !video) {
            Alert.alert('No Media Selected', 'Please select images and/or a video to upload.');
            return;
        }


        const formData = new FormData();
        formData.append('name_of_firm', businessName);
        formData.append('mobile_no', phone);
        formData.append('email', email);
        formData.append('address_line_1', address1);
        formData.append('city', city);
        formData.append('state', state);
        formData.append('pincode', ''); // Add pincode if applicable
        formData.append('service_availability_radius', sar);
        formData.append('book_in_advance_days', bia);
        images.forEach((image) => {
            formData.append('images[]', {
                uri: image.uri,
                type: image.type,
                name: image.name,
            } as any);
        });
        // Append images
        // images.forEach((image, index) => {
        //     formData.append('images[]', {
        //         uri: image,
        //         type: 'image/jpeg',
        //         name: `image${index}.jpg`,
        //     });
        // });

        if (video) {
            formData.append('videos[]', {
                uri: video.uri,
                type: video.type,
                name: video.name,
            } as any);
        }
        console.log(formData);
        alert('lk');
        // return false;

        try {
            const token = await AsyncStorage.getItem('authToken'); // Retrieve the token
            const userid = await AsyncStorage.getItem('userid');
            if (!token || !userid) {
                navigation.navigate('Login'); // Replace 'Login' with your actual login screen name
            return;
            }
            formData.append('vendor_id', userid);
            const response = await axios.post(POSTBusinessUrl(), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `${token}`, // Include the token in the headers

                },
            });
            console.log(response.data)
            if (response.status === 1) {
                Alert.alert('Success', 'Media uploaded successfully');
                navigation.navigate('AddBusiness');
            } else {
                Alert.alert('Upload Failed', 'Failed to upload media');
            }
        } catch (error) {
            console.error('Upload Error:', error);
            Alert.alert('Error', 'An error occurred while uploading the media.');
        }
    };

    const handlePostBusiness = () => {
        console.log('Business Name:', businessName);
        console.log('Category:', category);

        // if (!businessName) {
        //     Alert.alert('Missing Information', 'Please enter a business name.');
        //     return;
        // }

        // if (!phone) {
        //     Alert.alert('Missing Information', 'Please enter a phone.');
        //     return;
        // }

        // if (!category) {
        //     Alert.alert('Missing Information', 'Please select a category.');
        //     return;
        // }
        // if (!address1) {
        //     Alert.alert('Missing Information', 'Please select an Address.');
        //     return;
        // }
        // if (!state) {
        //     Alert.alert('Missing Information', 'Please select a State.');
        //     return;
        // }
        // if (!city) {
        //     Alert.alert('Missing Information', 'Please select a city.');
        //     return;
        // }
        // if (!sar) {
        //     Alert.alert('Missing Information', 'Please select Service Availability Radius.');
        //     return;
        // }
        // if (!bia) {
        //     Alert.alert('Missing Information', 'Please select Book in Advance.');
        //     return;
        // }

        uploadMedia();
    };

    return (
        <SafeAreaView style={{ backgroundColor: colors.background, flex: 1, padding: 20 }}>
            <Text style={{ color: colors.text, fontSize: 18, marginBottom: 10 }}>Post Your Business</Text>

            <TextInput
                placeholder="Business Name"
                value={businessName}
                onChangeText={setBusinessName}
                style={[styles.input, { borderColor: colors.border, color: colors.text }]}
            />
            <TextInput
                placeholder="Mobile Number"
                value={phone}
                onChangeText={setPhone}
                style={[styles.input, { borderColor: colors.border, color: colors.text }]}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={[styles.input, { borderColor: colors.border, color: colors.text }]}
            />
            <TextInput
                placeholder="Address"
                value={address1}
                onChangeText={setAddress1}
                style={[styles.input, { borderColor: colors.border, color: colors.text }]}
            />

            <TextInput
                placeholder="State"
                value={state}
                onChangeText={setState}
                style={[styles.input, { borderColor: colors.border, color: colors.text }]}
            />

            <TextInput
                placeholder="City"
                value={city}
                onChangeText={setCity}
                style={[styles.input, { borderColor: colors.border, color: colors.text }]}
            />

            <TextInput
                placeholder="Service Availability Radius"
                value={sar}
                onChangeText={setSar}
                style={[styles.input, { borderColor: colors.border, color: colors.text }]}
            />

            <TextInput
                placeholder="Book In Advance (Days)"
                value={bia}
                onChangeText={setBia}
                style={[styles.input, { borderColor: colors.border, color: colors.text }]}
            />

            <TouchableOpacity onPress={() => setIsDropdownVisible(!isDropdownVisible)} style={[styles.dropdown, { borderColor: colors.border }]}>
                <Text style={{ color: colors.text }}>{category ? category.name : 'Select Category'}</Text>
            </TouchableOpacity>
            {isDropdownVisible && (
                <FlatList
                    data={categories}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                setCategory(item);
                                setIsDropdownVisible(false);
                            }}
                            style={styles.dropdownItem}>
                            <Text style={{ color: colors.text }}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id}
                    style={styles.dropdownList}
                />
            )}

            <View style={styles.buttonContainer}>
                <CustomButton title="Upload Media" onPress={pickMedia} />
                {/* {images.length > 0 && <Text style={{ color: colors.text, marginLeft: 10 }}>Images Selected: {images.map(image => image.name).join(', ')}</Text>}
                {video && <Text style={{ color: colors.text, marginLeft: 10 }}>Video Selected: {video.name}</Text>} */}
            </View>

            <CustomButton title="Post Business" onPress={handlePostBusiness} color={colors.primary} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        padding: 10,
       

        borderRadius: 5,
        marginBottom: 10,
    },
    dropdown: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    dropdownItem: {
        padding: 10,
        borderBottomWidth: 1,
    },
    dropdownList: {
        borderWidth: 1,
        borderRadius: 5,
        maxHeight: 150,
    },
    buttonContainer: {
        marginBottom: 20,
    },
});

export default PostBusiness;
