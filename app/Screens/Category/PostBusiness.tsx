import React, { useState } from 'react';
import { View, Text, TextInput, Button, SafeAreaView, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useTheme } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import axios from 'axios';

type PostBusinessScreenProps = StackScreenProps<RootStackParamList, 'PostBusiness'>;

interface ImageFile {
    uri: string;
    type: string;
    name: string;
}

const PostBusiness = ({ navigation }: PostBusinessScreenProps) => {
    const theme = useTheme();
    const { colors } = theme;

    const [businessName, setBusinessName] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState<ImageFile | null>(null);

    const pickImage = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert("Permission required", "Permission to access media library is required!");
                return;
            }

            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled && result.assets.length > 0) {
                const selectedImage = result.assets[0];
                setImage({
                    uri: selectedImage.uri,
                    type: 'image/jpeg', // Or appropriate MIME type
                    name: 'photo.jpg',
                });
            }
        } catch (error) {
            console.error("Error picking image:", error);
            Alert.alert("Error", "An error occurred while picking the image.");
        }
    };

    const uploadImage = async () => {
        if (!image) {
            Alert.alert('No image selected', 'Please select an image to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('image', {
            uri: image.uri,
            type: image.type,
            name: image.name,
        } as any);

        try {
            const response = await axios.post('YOUR_BACKEND_API_URL/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                },
            });

            if (response.status === 200) {
                Alert.alert('Success', 'Image uploaded successfully');
            } else {
                Alert.alert('Upload Failed', 'Failed to upload image');
            }
        } catch (error) {
            console.error('Upload Error:', error);
            Alert.alert('Error', 'An error occurred while uploading the image');
        }
    };

    const saveImageLocally = async () => {
        if (!image) {
            Alert.alert('No image selected', 'Please select an image to upload.');
            return;
        }
    
        const formData = new FormData();
        formData.append('image', {
            uri: image.uri,
            type: image.type,
            name: image.name,
        } as any);
    
        try {
            const response = await axios.post('http://192.168.1.13:3000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                },
            });
    
            if (response.status === 200) {
                const result = response.data;
                Alert.alert('Success', 'Image uploaded successfully');
                console.log('File saved at:', result.filePath);
            } else {
                Alert.alert('Upload Failed', 'Failed to upload image');
            }
        } catch (error) {
            console.error('Upload Error:', error);
            Alert.alert('Error', 'An error occurred while uploading the image');
        }
    };
    

    const handlePostBusiness = () => {
        console.log('Business Name:', businessName);
        console.log('Category:', category);
        console.log('Image URI:', image?.uri);

        if (image) {
            saveImageLocally();
        } else {
            Alert.alert('No image selected', 'Please select an image to save.');
        }
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
                placeholder="Category"
                value={category}
                onChangeText={setCategory}
                style={[styles.input, { borderColor: colors.border, color: colors.text }]}
            />

            <TouchableOpacity onPress={pickImage} style={styles.imagePickerContainer}>
                <View style={[styles.imagePreview, { borderColor: colors.border, backgroundColor: image ? 'transparent' : colors.card }]}>
                    {image ? (
                        <Image source={{ uri: image.uri }} style={styles.image} />
                    ) : (
                        <Text style={{ color: colors.text }}>Upload Image</Text>
                    )}
                </View>
            </TouchableOpacity>

            <Button title="Post Business" onPress={handlePostBusiness} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
    },
    imagePickerContainer: {
        marginBottom: 20,
    },
    imagePreview: {
        height: 150,
        borderWidth: 1,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
});

export default PostBusiness;
