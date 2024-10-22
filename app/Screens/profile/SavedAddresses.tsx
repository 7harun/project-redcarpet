import React, { useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, Text, SafeAreaView, TouchableOpacity, Platform, Alert } from 'react-native';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { ScrollView } from 'react-native-gesture-handler';
import { COLORS, FONTS } from '../../constants/theme';
import CustomInput from '../../components/Input/CustomInput';
import Button from '../../components/Button/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';  // Import axios
import { SaveAddress } from '../../api/api';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';

type SavedAddressesScreenProps = StackScreenProps<RootStackParamList, 'SavedAddresses'>;

const SavedAddresses = ({ navigation }: SavedAddressesScreenProps) => {

    const theme = useTheme();
    const { colors }: { colors: any } = theme;

    const addressTypes = ["Home", "Shop", "Office", "Others"];
    const [activeSize, setActiveSize] = useState(addressTypes[0]);

    // Add state variables to store form data
    const [fullName, setFullName] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [address, setAddress] = useState('');
    const [locality, setLocality] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    // API call to save the address using Axios
    const handleSaveAddress = async () => {
        // Form validation
        if (!fullName || !mobileNo || !pinCode || !address || !locality || !city || !state) {
            Alert.alert("Error", "Please fill out all the fields.");
            return;
        }

        const addressData = {
            full_name: fullName,                // Backend expects 'name' instead of 'fullName'
            mobile_no: mobileNo,               // Backend expects 'phone' instead of 'mobileNo'
            pin_code: pinCode,          // Backend expects 'postal_code' instead of 'pinCode'
            address_line_1: address,       // Backend expects 'street_address' instead of 'address'
            locality: locality,            // Backend expects 'locality' (same)
            city: city,                    // Backend expects 'city' (same)
            state: state,                  // Backend expects 'state' (same)
            customer_id:"",
            address_type: activeSize       // Backend expects 'address_type' instead of 'addressType'
        };
        console.log(addressData,'addressData')

        try {
            const token = await AsyncStorage.getItem('authToken');
            const userid = await AsyncStorage.getItem('userid');
            // console.log(token,'home token')
            if (!token || !userid) {
                navigation.navigate('SignIn');
                return;
            }
            addressData['customer_id'] = userid; // Append customer_id here
            const response = await axios.post(SaveAddress(), addressData ,{
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);

            if (response.data.success) {
                // If the request is successful
                Alert.alert("Success", "Address saved successfully");
                navigation.navigate('Checkout'); // Navigate to the Checkout screen
            } else {
                // Handle the error response from the server
                Alert.alert("Error", response.data.message || "Failed to save address");
            }
        } catch (error) {
            // Handle network errors
            Alert.alert("Network Error", "Unable to save address. Please try again later.");
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
            <Header
                title={"Add Delivery Address"}
                leftIcon={"back"}
            />
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                <View style={GlobalStyleSheet.container}>
                    <Text style={{ ...FONTS.Marcellus, fontSize: 18, color: colors.title }}>Contact Details</Text>
                    <View style={{ marginBottom: 15, marginTop: 10 }}>
                        <Text style={{ ...FONTS.fontRegular, fontSize: 15, color: colors.title, marginBottom: 5 }}>Full Name</Text>
                        <CustomInput
                            value={fullName}
                            onChangeText={setFullName}
                            background
                        />
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ ...FONTS.fontRegular, fontSize: 15, color: colors.title, marginBottom: 5 }}>Mobile No.</Text>
                        <CustomInput
                            value={mobileNo}
                            onChangeText={setMobileNo}
                            background
                            keyboardType={'number-pad'}
                        />
                    </View>
                    <Text style={{ ...FONTS.fontSemiBold, fontSize: 16, color: colors.title }}>Address</Text>
                    <View style={{ marginBottom: 15, marginTop: 10 }}>
                        <Text style={{ ...FONTS.fontRegular, fontSize: 15, color: colors.title, marginBottom: 5 }}>Pin Code</Text>
                        <CustomInput
                            value={pinCode}
                            onChangeText={setPinCode}
                            background
                            keyboardType={'number-pad'}
                        />
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ ...FONTS.fontRegular, fontSize: 15, color: colors.title, marginBottom: 5 }}>Address</Text>
                        <CustomInput
                            value={address}
                            onChangeText={setAddress}
                            background
                        />
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ ...FONTS.fontRegular, fontSize: 15, color: colors.title, marginBottom: 5 }}>Locality/Town</Text>
                        <CustomInput
                            value={locality}
                            onChangeText={setLocality}
                            background
                        />
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ ...FONTS.fontRegular, fontSize: 15, color: colors.title, marginBottom: 5 }}>City/District</Text>
                        <CustomInput
                            value={city}
                            onChangeText={setCity}
                            background
                        />
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ ...FONTS.fontRegular, fontSize: 15, color: colors.title, marginBottom: 5 }}>State</Text>
                        <CustomInput
                            value={state}
                            onChangeText={setState}
                            background
                        />
                    </View>
                    <Text style={{ ...FONTS.Marcellus, fontSize: 18, color: colors.title }}>Save Address As</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            paddingTop: 10,
                            paddingBottom: 20
                        }}
                    >
                        {addressTypes.map((data, index) => {
                            return (
                                <View
                                    key={index}
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
                                    }]}
                                >
                                    <TouchableOpacity
                                        onPress={() => setActiveSize(data)}
                                        style={[{
                                            height: 40,
                                            borderRadius: 10,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            paddingHorizontal: 20,
                                            marginHorizontal: 4,
                                            backgroundColor: colors.card
                                        }, activeSize === data && {
                                            backgroundColor: COLORS.primary,
                                            borderColor: COLORS.primary,
                                        }]}
                                    >
                                        <Text style={[{ ...FONTS.fontMedium, fontSize: 13, color: colors.title }, activeSize === data && { color: colors.card }]}>{data}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
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
                }]}
            >
                <View style={{ height: 88, backgroundColor: colors.card, borderTopLeftRadius: 25, borderTopRightRadius: 25 }}>
                    <View style={[GlobalStyleSheet.container, { paddingHorizontal: 10, marginTop: 15, paddingTop: 0 }]}>
                        <Button
                            title={"Save Address"}
                            btnRounded
                            onPress={handleSaveAddress}  // Call the API function on button press
                            color={COLORS.primary}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default SavedAddresses;
