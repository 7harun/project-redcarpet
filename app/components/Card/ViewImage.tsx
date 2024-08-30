import React from 'react';
import { View, Image, Video } from 'react-native';
import { Video as ExpoVideo } from 'expo-av';

interface ViewImageProps {
    id: string;
    image?: string;
    video?: string;
    mediaType: 'image' | 'video';
    onPress?: () => void;
    onPress1?: () => void;
    likebtn?: boolean;
}

const ViewImage: React.FC<ViewImageProps> = ({ image, video, mediaType, onPress, onPress1, likebtn }) => {
    return (
        <View>
            {mediaType === 'image' && image ? (
                <Image source={{ uri: image }} style={{ width: '100%', height: 200 }} />
            ) : mediaType === 'video' && video ? (
                <ExpoVideo
                    source={{ uri: video }}
                    style={{ width: '100%', height: 200 }}
                    useNativeControls
                    // resizeMode="contain"
                />
            ) : null}
        </View>
    );
};

export default ViewImage;
