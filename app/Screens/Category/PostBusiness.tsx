import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, SafeAreaView, TouchableOpacity, StyleSheet, Alert, FlatList, ActivityIndicator } from 'react-native';
import { useTheme } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import axios from 'axios';
import CustomButton from '../../components/CustomButton';
import { POSTBusinessUrl } from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetCategory,GetSubCategory } from '../../api/api';

type PostBusinessScreenProps = StackScreenProps<RootStackParamList, 'PostBusiness'>;

interface MediaFile {
    uri: string;
    type: string;
    name: string;
}

interface Category {
    id: string;
    category_name: string;
    image: string;
}

interface SubCategory {
    id: string;
    sub_category_name: string;
    image: string;
}


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
    const [actualPrice, setActualPrice] = useState('');
    const [discountedPrice, setDiscountedPrice] = useState('');
    const [category, setCategory] = useState<Category | null>(null);
    const [images, setImages] = useState<MediaFile[]>([]);
    const [video, setVideo] = useState<MediaFile | null>(null);
    const [currentStep, setCurrentStep] = useState(1);

    const pickMedia = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsMultipleSelection: true,
        });

        if (!result.canceled && result.assets.length > 0) {
            const selectedImages: MediaFile[] = [];
            let selectedVideo: MediaFile | null = null;

            result.assets.forEach((asset) => {
                const mediaFile: MediaFile = {
                    uri: asset.uri,
                    type: asset.type === 'image' ? 'image/jpeg' : 'video/mp4',
                    name: asset.uri.split('/').pop() || (asset.type === 'image' ? 'photo.jpg' : 'video.mp4'),
                };
                if (asset.type === 'image') selectedImages.push(mediaFile);
                if (asset.type === 'video' && !selectedVideo) selectedVideo = mediaFile;
            });

            setImages(selectedImages);
            setVideo(selectedVideo);
        }
    };

    const handleNextStep = () => {
        // Validation for Step 1 (Category Selection)
        if (currentStep === 1 && !category) {
            Alert.alert('Validation Error', 'Please select a category to continue.');
            return;
        }
        if (currentStep === 2 && !selectedSubcategory) {
            Alert.alert('Validation Error', 'Please select a sub category to continue.');
            return;
        }
    
        // Validation for Step 2 (Business Details)
        if (currentStep === 3 && (!businessName || !phone || !email || !address1 || !state || !city)) {
            Alert.alert('Validation Error', 'Please fill in all required business details to continue.');
            return;
        }
    
        // Validation for Step 3 (Pricing Information)
        if (currentStep === 4 && (!actualPrice || !discountedPrice)) {
            Alert.alert('Validation Error', 'Please enter the actual price and discounted price to continue.');
            return;
        }
    
        // Proceed to the next step
        setCurrentStep(currentStep + 1);
    };
    

    const handlePreviousStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
        if(currentStep===2){
            setSubcategories([]);
            fetchCategories();
        }
    };

    // When the user selects a category
    const handleCategorySelect = async (item: Category) => {
        setLoadingCategories(true);
        setError(null);
        setCategory(item);  // Set the selected category
          // Move to Step 2 (Subcategory selection)
        try {
            const token = await AsyncStorage.getItem('authToken');
            const data = { "subid": item.id } 
            const response = await axios.post(GetSubCategory(),data,{
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
            console.log(response.data,'subcategory')
            if (response.data.status==1) {
                setSubcategories(response.data.data);  // Set the subcategories state
                console.log(subcategories,'subcategories')
                setCurrentStep(2);
            } else {
                setError('No subcategories available for this category.');
            }
        } catch (err) {
            console.error('Error fetching subcategories:', err);
            setError('Failed to load subcategories');
        }
    };

    const handleSubcategory = async (item: SubCategory) => {
        setLoadingCategories(true);
        setError(null);
        setSelectedSubcategory(item);
    };
    

    // Monitor when category state changes, and if it's set, move to the next step
    // useEffect(() => {
    //     if (category) {
    //         handleNextStep();  // Only move to the next step after category is set
    //     }
    // }, [category]);  // Trigger this effect when the 'category' state changes
    

    // Category related states
    const [categories, setCategories] = useState<Category[]>([]);
    const [loadingCategories, setLoadingCategories] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [subcategories, setSubcategories] = useState<SubCategory[]>([]);  // To hold subcategories
    const [selectedSubcategory, setSelectedSubcategory] = useState<SubCategory | null>(null);  // To hold the selected subcategory

    useEffect(() => {
        if (selectedSubcategory) {
            handleNextStep();  // Only move to the next step after category is set
        }
    }, [selectedSubcategory]);
    // Fetch categories from API
    const fetchCategories = async () => {
        setLoadingCategories(true);
        setError(null);
        try {
            const token = await AsyncStorage.getItem('authToken');
            if (!token) {
                navigation.navigate('SignIn');
                return;
            }

            const response = await axios.get(GetCategory(), {
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });

            if (Array.isArray(response.data['data'])) {
                setCategories(response.data['data']);
                console.log(response.data['data'], 'Fetched Categories');
                setLoadingCategories(false);

            }
        } catch (err) {
            console.error('Error fetching categories:', err);
            setError('Failed to load categories');
        } finally {
            setLoadingCategories(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <>
                        {loadingCategories ? (
                            <ActivityIndicator size="large" color={colors.primary} />
                        ) : error ? (
                            <Text style={{ color: 'red' }}>{error}</Text>
                        ) : (
                            <FlatList
                                data={categories}
                                keyExtractor={(item, index) => `${item.id}-${index}`} // Ensure unique keys
                                numColumns={1} // You can change this to adjust the number of columns if needed
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => handleCategorySelect(item)} style={styles.categoryItem}>
                                        <Image source={{ uri: item.image }} style={styles.categoryImage} />
                                        <Text style={{ color: colors.text, textAlign: 'center', marginTop: 5 }}>{item.category_name}</Text>
                                    </TouchableOpacity>
                                )}
                            />

                        )}
                    </>
                );

            case 2:
                return (
                    <>
                        {subcategories.length > 0 ? (
                            <FlatList
                                data={subcategories}
                                keyExtractor={(item, index) => `${item.id}-${index}`} // Ensure unique keys
                                numColumns={2}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => handleSubcategory(item)} 
                                        style={[
                                            styles.subcategoryItem,
                                            // { backgroundColor: selectedSubcategory?.id === item.id ? colors.primary : 'transparent' }
                                        ]}
                                    >
                                        <Image source={{ uri: item.image }} style={styles.subcategoryImage} />
                                        <Text style={{ color: colors.text, textAlign: 'center', marginTop: 5 }}>
                                            {item.sub_category_name}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            />
                        
                        ) : (
                            <Text style={{ color: colors.text, textAlign: 'center' }}>No subcategories available.</Text>
                        )}
                    </>
                );
                

            case 3:
                return (
                    <>
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
                    </>
                );
            case 4:
                return (
                    <>
                        <TextInput
                            placeholder="Actual Price"
                            value={actualPrice}
                            onChangeText={setActualPrice}
                            keyboardType="numeric"
                            style={[styles.input, { borderColor: colors.border, color: colors.text }]}
                        />
                        <TextInput
                            placeholder="Discounted Price"
                            value={discountedPrice}
                            onChangeText={setDiscountedPrice}
                            keyboardType="numeric"
                            style={[styles.input, { borderColor: colors.border, color: colors.text }]}
                        />
                    </>
                );
            case 5:
                return (
                    <>
                        <CustomButton title="Upload Media" onPress={pickMedia} />
                        {images.length > 0 && <Text style={{ color: colors.text, marginLeft: 10 }}>Images Selected: {images.map(image => image.name).join(', ')}</Text>}
                        {video && <Text style={{ color: colors.text, marginLeft: 10 }}>Video Selected: {video.name}</Text>}
                    </>
                );
            case 6:
                return (
                    <>
                        <Text style={{ color: colors.text }}>Review Details</Text>
                        <Text style={{ color: colors.text }}>Business Name: {businessName}</Text>
                        <Text style={{ color: colors.text }}>Category: {category?.category_name}</Text>
                        <Text style={{ color: colors.text }}>Mobile Number: {phone}</Text>
                        <Text style={{ color: colors.text }}>Actual Price: {actualPrice}</Text>
                        <Text style={{ color: colors.text }}>Discounted Price: {discountedPrice}</Text>
                        <CustomButton title="Post Business" onPress={handlePostBusiness} />
                    </>
                );
            default:
                return null;
        }
    };


    const uploadMedia = async () => {
        if (!category || !selectedSubcategory) {
            Alert.alert('Validation Error', 'Please select a category and subcategory before proceeding.');
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
        formData.append('order_price', actualPrice);
        formData.append('discount_price', discountedPrice);
        formData.append('service_categories', selectedSubcategory.id);  // Send the category ID
        // formData.append('subcategory_id', selectedSubcategory.id);  // Send the subcategory ID
        
        images.forEach((image) => {
            formData.append('images[]', {
                uri: image.uri,
                type: image.type,
                name: image.name,
            } as any);
        });
        
        if (video) {
            formData.append('videos[]', {
                uri: video.uri,
                type: video.type,
                name: video.name,
            } as any);
        }
    
        try {
            const token = await AsyncStorage.getItem('authToken');
            const userid = await AsyncStorage.getItem('userid');
            if (!token || !userid) {
                navigation.navigate('SignIn');
                return;
            }
            formData.append('vendor_id', userid);
    
            const response = await axios.post(POSTBusinessUrl(), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `${token}`,
                },
            });
            console.log(response)
            if (response.status === 200) {
                Alert.alert('Success', 'Business posted successfully!');
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
        console.log('Category:', category.id);
        uploadMedia();
    };

    return (
        <SafeAreaView style={{ backgroundColor: colors.background, flex: 1, padding: 20 }}>
            <Text style={{ color: colors.text, fontSize: 18, marginBottom: 10 }}>Post Your Business - Step {currentStep}</Text>

            {renderStepContent()}

            <View style={styles.navigationButtons}>
                {currentStep > 1 && currentStep < 6 && <CustomButton title="Previous" onPress={handlePreviousStep} />}
                {currentStep > 2 && currentStep < 6 && <CustomButton title="Next" onPress={handleNextStep} />}
            </View>
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
    categoryItem: {
        flexDirection: 'column', // Change this to column to stack image and text
        alignItems: 'center',    // Center the image and text
        marginBottom: 20,        // Add spacing between items
    },
    categoryImage: {
        width: 100,               // Adjust size as needed
        height: 100,
        borderRadius: 0,
        marginBottom: 5,          // Add some space between the image and the text

    },
    subcategoryItem: {
        flex: 1,
        margin: 10,
        alignItems: 'center',
    },
    subcategoryImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    navigationButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
});

export default PostBusiness;
