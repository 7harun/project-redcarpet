import React, { useState } from 'react';
import { View, Text, TextInput, Button, SafeAreaView, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useTheme } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import axios from 'axios';

type PostBusinessScreenProps = StackScreenProps<RootStackParamList, 'PostBusiness'>;

interface MediaFile {
    uri: string;
    type: string;
    name: string;
}

const PostBusiness = ({ navigation }: PostBusinessScreenProps) => {
    const theme = useTheme();
    const { colors } = theme;

    const [businessName, setBusinessName] = useState('');
    const [category, setCategory] = useState('');
    const [media, setMedia] = useState<MediaFile | null>(null);
    const [mediaType, setMediaType] = useState<'image' | 'video'>('image');

    const pickMedia = async (type: 'image' | 'video') => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert("Permission required", "Permission to access media library is required!");
                return;
            }
    
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: type === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
    
            if (!result.canceled && result.assets.length > 0) {
                const selectedMedia = result.assets[0];
                console.log("Selected Media Details:", {
                    uri: selectedMedia.uri,
                    type: selectedMedia.type,
                    fileName: selectedMedia.uri.split('/').pop(),
                    size: selectedMedia.fileSize,
                });
    
                setMedia({
                    uri: selectedMedia.uri,
                    type: type === 'image' ? 'image/jpeg' : 'video/mp4',
                    name: selectedMedia.uri.split('/').pop() || (type === 'image' ? 'photo.jpg' : 'video.mp4'),
                });
                setMediaType(type);
            }
        } catch (error) {
            console.error("Error picking media:", error);
            Alert.alert("Error", "An error occurred while picking the media.");
        }
    };
    
    

    const uploadMedia = async () => {
        if (!media) {
            Alert.alert(`No ${mediaType} selected`, `Please select a ${mediaType} to upload.`);
            return;
        }
    
        const formData = new FormData();
        formData.append('mediaType', mediaType); // Add mediaType to the form data
        formData.append(mediaType, {
            uri: media.uri,
            type: media.type,
            name: media.name,
        } as any);
        console.log(formData)
        try {
            const response = await axios.post('http://192.168.1.13:3000/upload', formData, {
                // const response = await axios.post('http://ec2-52-66-250-72.ap-south-1.compute.amazonaws.com/ems/api/categories/create', formData, {
                
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                },
            });
    
            if (response.status === 200) {
                Alert.alert('Success', `${mediaType.charAt(0).toUpperCase() + mediaType.slice(1)} uploaded successfully`);
            } else {
                Alert.alert('Upload Failed', `Failed to upload ${mediaType}`);
            }
        } catch (error) {
            console.error('Upload Error:', error);
            Alert.alert('Error', `An error occurred while uploading the ${mediaType}`);
        }
    };
    
    

    const handlePostBusiness = () => {
        console.log('Business Name:', businessName);
        console.log('Category:', category);
        console.log(`${mediaType.charAt(0).toUpperCase() + mediaType.slice(1)} URI:`, media?.uri);

        if (media) {
            uploadMedia();
        } else {
            Alert.alert(`No ${mediaType} selected`, `Please select a ${mediaType} to save.`);
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

            <View style={styles.buttonContainer}>
                <Button title="Post Image" onPress={() => pickMedia('image')} />
                <Button title="Post Video" onPress={() => pickMedia('video')} />
            </View>

            <TouchableOpacity style={styles.mediaPreviewContainer}>
                <View style={[styles.mediaPreview, { borderColor: colors.border, backgroundColor: media ? 'transparent' : colors.card }]}>
                    {media ? (
                        <Image source={{ uri: media.uri }} style={styles.image} />
                    ) : (
                        <Text style={{ color: colors.text }}>Upload {mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}</Text>
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    mediaPreviewContainer: {
        marginBottom: 20,
    },
    mediaPreview: {
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
