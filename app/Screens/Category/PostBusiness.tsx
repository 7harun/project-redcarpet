import React, { useState } from 'react';
import { View, Text, TextInput, Button, SafeAreaView, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useTheme } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import * as FileSystem from 'expo-file-system';


type PostBusinessScreenProps = StackScreenProps<RootStackParamList, 'PostBusiness'>;

const PostBusiness = ({ navigation }: PostBusinessScreenProps) => {
    const theme = useTheme();
    const { colors }:{colors : any} = theme;

    const [businessName, setBusinessName] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        try {
            // Request permission to access media library
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert("Permission required", "Permission to access media library is required!");
                return;
            }
    
            // Launch image picker
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
    
            console.log('Image picker result:', result);
    
            if (!result.canceled && result.assets.length > 0) {
                // Access the first image in the assets array
                const selectedImage = result.assets[0];
                setImage(selectedImage.uri);
            } else {
                console.log('Image selection canceled');
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
            uri: image,
            type: 'image/jpeg', // Adjust based on your image type
            name: 'photo.jpg',
        });

        try {
            const response = await fetch('YOUR_BACKEND_API_URL/upload', { // Replace with your API URL
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.ok) {
                const result = await response.json();
                Alert.alert('Success', 'Image uploaded successfully');
            } else {
                Alert.alert('Upload Failed', 'Failed to upload image');
            }
        } catch (error) {
            console.error('Upload Error:', error);
            Alert.alert('Error', 'An error occurred while uploading the image');
        }
    };

    const saveImageLocally = async (imageUri: string) => {
        if (!image) {
            Alert.alert('No image selected', 'Please select an image to upload.');
            return;
        }
    
        const formData = new FormData();
        formData.append('image', {
            uri: image,
            type: 'image/jpeg', // Adjust based on your image type
            name: 'photo.jpg',
        });

        console.log(formData)
    
        try {
            const response = await fetch('http://192.168.1.6:3000/upload', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.ok) {
                const result = await response.json();
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
        console.log('Image URI:', image);

        // Trigger image upload
        // uploadImage();
        if (image) {
            // Save image locally
            saveImageLocally(image);
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
                        <Image source={{ uri: image }} style={styles.image} />
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
