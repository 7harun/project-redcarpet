import React, { useEffect, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, Text, SafeAreaView, Image, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import Button from '../../components/Button/Button';
import { ScrollView } from 'react-native-gesture-handler';
import { IMAGES } from '../../constants/Images';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import axios from 'axios'; // For API requests
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetAddresses } from '../../api/api';
import { UpdateDefaultAddress } from '../../api/api';
import Toast from 'react-native-toast-message';

type SaveAddressScreenProps = StackScreenProps<RootStackParamList, 'SaveAddress'>;

interface Address {
    id: string;
    image: any;
    title: string;
    text: string;
    isDefault: boolean;
}

const SaveAddress = ({ navigation }: SaveAddressScreenProps) => {
    const theme = useTheme();
    const { colors }:{ colors: any } = theme;

    const [isChecked, setIsChecked] = useState<Address | null>(null);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Fetch addresses from API
    const fetchAddresses = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            const userid = await AsyncStorage.getItem('userid'); // Change 'userid' to 'customerId'
            if (!token || !userid) {
                navigation.navigate('SignIn');
                return;
            }
            const data = { customer_id: userid };
            const response = await axios.post(GetAddresses(), data ,{
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
            
            if (response.data.status == 1) {
                const addressData = response.data.data.map((address: any) => {
                    let image = IMAGES.map;
                    let title = address.full_name || "Unnamed Address";
                
                    if (address.address_type) {
                        switch (address.address_type.toLowerCase()) {
                            case 'home':
                                image = IMAGES.home;
                                break;
                            case 'office':
                                image = IMAGES.map;
                                break;
                            case 'shop':
                                image = IMAGES.shop;
                                break;
                            default:
                                break;
                        }
                    }
                
                    return {
                        id: address.id,
                        image,
                        title,
                        text: `${address.address_line_1 || ''}, ${address.locality || ''}, ${address.city || ''}, ${address.state || ''} ${address.pin_code || ''}`.trim(),
                        isDefault: address.is_default === "1"
                    };
                });
                
                const defaultAddress = addressData.find((addr: any) => addr.isDefault);
                setIsChecked(defaultAddress);
                setAddresses(addressData);
                setLoading(false);
            } else {
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching addresses:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAddresses(); // Call to fetch addresses when component mounts
    }, []);

    const handleSaveAddress = async () => {
        if (!isChecked) return; // Check if an address is selected
        // alert(isChecked.id);return false;
        try {
            setLoading(true);

            const token = await AsyncStorage.getItem('authToken');
            const userid = await AsyncStorage.getItem('userid'); // Change 'userid' to 'customerId'
            const data = {
                id: isChecked.id, // The ID of the address to set as default
                customer_id:userid  // The ID of the address to set as default
            };
            const response = await axios.post(UpdateDefaultAddress(), data, {
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.status == 1) {
            setLoading(false);

                // Handle successful response, e.g., show a success message or navigate
                console.log('Address updated successfully:', response.data);
                Toast.show({
                    type: 'success',
                    text1: 'Default Address updated',
                });
                await fetchAddresses();
            } else {
            setLoading(false);

                // Handle the case where the API response is not successful
                console.error('Failed to update address:', response.data.message);
            }
        } catch (error) {
            setLoading(false);
            console.error('Error updating address:', error);
            Toast.show({
                type: 'error',
                text1: 'Failed to update address',
                text2: ' ',
            });
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
            <Header
                title={"Delivery Address"}
                leftIcon={'back'}
            />
            <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
                <View style={[GlobalStyleSheet.container, { paddingTop: 10 }]}>
                    {addresses.map((data, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setIsChecked(data)}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    borderBottomWidth: 1,
                                    borderBottomColor: colors.border,
                                    paddingBottom: 15,
                                    marginTop: 10
                                }}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 }}>
                                    <View
                                        style={[{
                                            shadowColor: "rgba(195,135,95,0.30)",
                                            shadowOffset: {
                                                width: -5,
                                                height: 15,
                                            },
                                            shadowOpacity: .1,
                                            shadowRadius: 5,
                                        }, Platform.OS === "ios" && {
                                            backgroundColor: colors.card,
                                            borderRadius: 10
                                        }]}>
                                        <View style={{ height: 40, width: 40, borderRadius: 10, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center' }}>
                                            <Image
                                                style={{ height: 20, width: 20, tintColor: COLORS.primary, resizeMode: 'contain' }}
                                                source={data.image} // Image now based on address type
                                            />
                                        </View>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ ...FONTS.fontMedium, fontSize: 16, color: colors.title }}>{data.title}</Text>
                                        <Text style={{ ...FONTS.fontRegular, fontSize: 14, color: colors.title }}>{data.text}</Text>
                                    </View>
                                </View>
                                <View
                                    style={[{
                                        shadowColor: "rgba(195, 123, 95, 0.20)",
                                        shadowOffset: {
                                            width: 2,
                                            height: 15,
                                        },
                                        shadowOpacity: .1,
                                        shadowRadius: 5,
                                    }, Platform.OS === "ios" && {
                                        backgroundColor: colors.card,
                                        borderRadius: 50,
                                    }]}>
                                    <View
                                        style={[{
                                            borderWidth: 1,
                                            width: 24,
                                            height: 24,
                                            borderRadius: 50,
                                            borderColor: theme.colors.card,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: theme.colors.card
                                        }, isChecked?.id === data.id && {
                                            backgroundColor: COLORS.primary,
                                            borderColor: COLORS.primary
                                        }]}>
                                        <View style={[{
                                            width: 14,
                                            height: 14,
                                            backgroundColor: theme.colors.background,
                                            borderRadius: 50
                                        }, isChecked?.id === data.id && {
                                            backgroundColor: theme.colors.card
                                        }]}></View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })}

                    <View
                        style={[{
                            shadowColor: "rgba(195,135,95,0.30)",
                            shadowOffset: {
                                width: -5,
                                height: 15,
                            },
                            shadowOpacity: .1,
                            shadowRadius: 5,
                        }, Platform.OS === "ios" && {
                            backgroundColor: colors.card,
                            borderRadius: 10
                        }]}>
                        <TouchableOpacity
                            style={{
                                height: 48,
                                width: '100%',
                                borderWidth: 1,
                                borderColor: theme.dark ? COLORS.white : colors.border,
                                borderRadius: 10,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingHorizontal: 10,
                                backgroundColor: colors.card,
                                marginTop: 30
                            }}
                            onPress={() => navigation.navigate('SavedAddresses')}
                        >
                            <View style={{ flexDirection: 'row', gap: 10 }}>
                                <Image
                                    style={{ height: 20, width: 20, resizeMode: 'contain', tintColor: colors.title }}
                                    source={IMAGES.plus}
                                />
                                <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.title }}>Add Address</Text>
                            </View>
                            <Image
                                style={{ height: 16, width: 16, resizeMode: 'contain', tintColor: colors.title }}
                                source={IMAGES.rightarrow}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <View
                style={[{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    shadowColor: 'rgba(195, 123, 95, 0.25)',
                    shadowOffset: {
                        width: 2,
                        height: -20,
                    },
                    shadowOpacity: .1,
                    shadowRadius: 5,
                }, Platform.OS === "ios" && {
                    backgroundColor: colors.card,
                    borderTopLeftRadius: 25, borderTopRightRadius: 25,
                    bottom: 30
                }]}>
                <View style={{ height: 88, backgroundColor: colors.card, borderTopLeftRadius: 25, borderTopRightRadius: 25 }}>
                    <View style={[GlobalStyleSheet.container, { paddingHorizontal: 10, marginTop: 15, paddingTop: 0 }]}>
                        <Button
                            title={"Save Address"}
                            onPress={handleSaveAddress}
                        />
                    </View>
                </View>
            </View>
            <Toast />
        </SafeAreaView>
    );
};

export default SaveAddress;
