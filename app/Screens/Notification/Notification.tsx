import React, { useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, SafeAreaView, LayoutAnimation } from 'react-native';
import Header from '../../layout/Header';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import SwipeBox from '../../components/SwipeBox';
import { IMAGES } from '../../constants/Images';

const SwipeData = [
    {
        image: IMAGES.ph2,
        title: "New Arrivals Alert!",
        date: "15 July 2024"
    },
    
]

const Notification = () => {


     const theme = useTheme();
    const { colors }:{colors : any} = theme;

    const [lists, setLists] = useState(SwipeData);

    const deleteItem = (index:any) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
        const arr = [...lists];
        arr.splice(index, 1);
        setLists(arr);
    };

    return (
        <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
            <Header
                title="Notifications (12)"
                leftIcon={'back'}
                rightIcon2={'search'}
            />
            <GestureHandlerRootView style={{ flex: 1 }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ paddingTop: 5, paddingBottom: 5 }}>
                        {lists.map((data, index) => {
                            return (
                                <View
                                    key={index}
                                >
                                    <SwipeBox data={data} theme={theme} colors={colors} handleDelete={() => deleteItem(index)} />
                                    {/* <View
                                        style={{
                                            height: 1,
                                            width: '100%',
                                            backgroundColor: colors.border,
                                        }}
                                    /> */}
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
            </GestureHandlerRootView>
        </SafeAreaView>
    )
}

export default Notification