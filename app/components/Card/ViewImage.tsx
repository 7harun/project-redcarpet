import React from 'react';
import { View, Image, Text, Dimensions, StyleSheet } from 'react-native';
import { Video as ExpoVideo } from 'expo-av';
import Carousel from 'react-native-snap-carousel';

interface MediaItem {
    mediaType: 'images' | 'videos' | null;
    file_path: string | null;
}

interface ViewImageProps {
    id: string;
    media: MediaItem[];
    onPress?: () => void;
}

const { width: screenWidth } = Dimensions.get('window');

const ViewImage: React.FC<ViewImageProps> = ({ id, media, onPress }) => {
    const renderItem = ({ item }: { item: MediaItem }) => {
        if (!item || !item.file_path) {
            return (
                <View style={styles.mediaContainer}>
                    <Text>No Media</Text>
                </View>
            );
        }
        return (
            <View style={styles.mediaContainer}>
                {item.mediaType === 'images' ? (
                    <Image source={{ uri: item.file_path }} style={styles.image} />
                ) : item.mediaType === 'videos' ? (
                    <ExpoVideo
                        source={{ uri: item.file_path }}
                        style={styles.video}
                        useNativeControls
                    />
                ) : (
                    <Text>No Media</Text>
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {media.length > 0 ? (
                <Carousel
                    data={media}
                    renderItem={renderItem}
                    sliderWidth={screenWidth}
                    itemWidth={screenWidth}
                    inactiveSlideScale={1}
                    inactiveSlideOpacity={1}
                />
            ) : (
                <View style={styles.mediaContainer}>
                    <Text>No Media Available</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mediaContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 200,
    },
    video: {
        width: '100%',
        height: 200,
    },
});

export default ViewImage;
