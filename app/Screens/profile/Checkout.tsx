import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native';
import { useTheme, useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../components/Button/Button';
import { IMAGES } from '../../constants/Images';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetAddresses } from '../../api/api';

type CheckoutScreenProps = StackScreenProps<RootStackParamList, 'Checkout'>;

const Checkout = ({ navigation }: CheckoutScreenProps) => {
    const theme = useTheme();
    const { colors }: { colors: any } = theme;

    const [defaultAddress, setDefaultAddress] = useState<any>(null); // State for the default address
    const [loading, setLoading] = useState<boolean>(true);

    // Function to fetch the default address
    const fetchDefaultAddress = async () => {
        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('authToken');
            const userid = await AsyncStorage.getItem('userid');

            if (!token || !userid) {
                navigation.navigate('SignIn');
                return;
            }

            const response = await axios.post(GetAddresses(), { customer_id: userid }, {
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.status === 1) {
                // Find the default address
                const addressData = response.data.data.find((address: any) => address.is_default === "1");
                setDefaultAddress(addressData);
            }
        } catch (error) {
            console.error('Error fetching addresses:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch default address when the component mounts or comes into focus
    useFocusEffect(
        React.useCallback(() => {
            fetchDefaultAddress(); // Fetch the default address when the screen is focused
        }, [])
    );


    if (loading) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </SafeAreaView>
        );
    }

    const checkoutData = [
        {
            image: IMAGES.map,
            title: "Delivery address",
            text: defaultAddress
                ? `${defaultAddress.full_name}, ${defaultAddress.address_line_1}, ${defaultAddress.locality}, ${defaultAddress.city}, ${defaultAddress.state} ${defaultAddress.pin_code}`
                : "No default address found.",
            navigate: "SaveAddress"
        },
        {
            image: IMAGES.card2,
            title: "Payment",
            text: "XXXX XXXX XXXX 3456",
            navigate: "Payment"
        },
    ];

    return (
        <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
            <Header title={"Checkout"} leftIcon={'back'} />
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                <View style={[GlobalStyleSheet.container, { paddingTop: 10 }]}>
                    {checkoutData.map((data, index) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate(data.navigate)}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                borderBottomWidth: 1,
                                borderBottomColor: colors.border,
                                paddingBottom: 15,
                                marginTop: 10
                            }}
                            key={index}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 }}>
                                <View
                                    style={{
                                        height: 40,
                                        width: 40,
                                        borderRadius: 10,
                                        backgroundColor: colors.card,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Image
                                        style={{ height: 20, width: 20, tintColor: COLORS.primary, resizeMode: 'contain' }}
                                        source={data.image}
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ ...FONTS.fontMedium, fontSize: 16, color: colors.title }}>{data.title}</Text>
                                    <Text style={{ ...FONTS.fontRegular, fontSize: 14, color: colors.title }}>{data.text}</Text>
                                </View>
                            </View>
                            <View>
                                <Image
                                    style={{ height: 16, width: 16, resizeMode: 'contain', tintColor: colors.title }}
                                    source={IMAGES.rightarrow}
                                />
                            </View>
                        </TouchableOpacity>
                    ))}

                    <View style={{ marginTop: 20 }}>
                        <Text style={{ ...FONTS.fontRegular, fontSize: 15, color: colors.title }}>Additional Notes:</Text>
                        <View style={{ height: 120, width: '100%', borderWidth: 1, borderColor: theme.dark ? COLORS.white : COLORS.primary, borderRadius: 8, backgroundColor: colors.card, marginTop: 10 }}>
                            <TextInput
                                style={{
                                    ...FONTS.fontRegular,
                                    fontSize: 15,
                                    color: colors.title,
                                    paddingVertical: 12,
                                    paddingHorizontal: 15,
                                }}
                                placeholder='Write Here'
                                multiline
                                placeholderTextColor={colors.textLight}
                            />
                        </View>
                    </View>

                    {/* Order Summary Section */}
                    <View style={{ marginTop: 150 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                            <Text style={{ ...FONTS.fontRegular, fontSize: 14, color: colors.title }}>Photography+Outdoor shoot</Text>
                            <Text style={{ ...FONTS.fontRegular, fontSize: 14, color: colors.title }}>2 x 8000.00</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                            <Text style={{ ...FONTS.fontRegular, fontSize: 14, color: colors.title }}>Mandap Decorations</Text>
                            <Text style={{ ...FONTS.fontRegular, fontSize: 14, color: colors.title }}>2 x 1500.00</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                            <Text style={{ ...FONTS.fontRegular, fontSize: 14, color: colors.title }}>Discount</Text>
                            <Text style={{ ...FONTS.fontRegular, fontSize: 14, color: colors.title }}>-2000</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                            <Text style={{ ...FONTS.fontRegular, fontSize: 14, color: colors.title }}>Shipping</Text>
                            <Text style={{ ...FONTS.fontRegular, fontSize: 14, color: COLORS.success }}>FREE Delivery</Text>
                        </View>
                        <View style={{ borderWidth: 1, borderColor: theme.dark ? COLORS.white : colors.border }}></View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
                            <Text style={{ ...FONTS.fontSemiBold, fontSize: 18, color: colors.title }}>My Order</Text>
                            <Text style={{ ...FONTS.fontSemiBold, fontSize: 18, color: COLORS.success }}>17000</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                <Button title={"Submit Order"} onPress={() => navigation.navigate('Myorder')} color={COLORS.primary} btnRounded />
            </View>
        </SafeAreaView>
    );
};

export default Checkout;
