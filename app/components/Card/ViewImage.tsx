import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Video } from 'expo-av';

interface ViewImageProps {
    id: string;
    image: string; // URL to the image
    title: string;
    mediaType: string; // Add mediaType to differentiate between image and video
    onPress?: () => void;
    onPress1?: () => void;
    likebtn?: boolean;
}

const ViewImage: React.FC<ViewImageProps> = ({ id, image, title, mediaType, onPress, onPress1, likebtn }) => {
    const theme = useTheme();
    const { colors } : {colors : any} = theme;

    // Fallback image source
    const fallbackImage = 'https://via.placeholder.com/150'; // Or any local image as fallback

    return (
        <View style={[styles.card, { backgroundColor: colors.card }]}>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.imageContainer}>
                    {/* <Image
                        source={{ uri: 'https://redcarpet.s3.ap-south-1.amazonaws.com/1/flower2.jpg' }}
                        style={styles.image}
                        resizeMode="cover"
                        onError={(error) => console.log('Image failed to load:', error.nativeEvent.error)}
                    /> */}
                    {mediaType === 'image' ? (
                        <Image
                            source={{ uri: 'https://redcarpet.s3.ap-south-1.amazonaws.com/1/flower2.jpg' }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    ) : mediaType === 'video' ? (
                        <Video
                            source={{ uri: 'https://redcarpet.s3.ap-south-1.amazonaws.com/1/video1.mov' }}
                            style={styles.image}
                            useNativeControls
                            resizeMode="contain"
                        />
                    ) : null}

                </View>
                <Text style={{ color: colors.title, marginTop: 5 }}>{title}</Text>
            </TouchableOpacity>
            {likebtn && (
                <TouchableOpacity onPress={onPress1} style={styles.likeButton}>
                    <Text>❤️</Text> {/* You might use an icon or any other component */}
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        overflow: 'hidden',
        marginBottom: 20,
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 3,
    },
    imageContainer: {
        width: '100%',
        height: 200,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    likeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 20,
        padding: 10,
    },
});

export default ViewImage;
