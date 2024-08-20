import React, { useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, SafeAreaView, Platform, Animated } from 'react-native';
import { FONTS, COLORS } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import CustomInput from '../../components/Input/CustomInput';
import Button from '../../components/Button/Button';
import { Feather } from '@expo/vector-icons';
import { Checkbox } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { IMAGES } from '../../constants/Images';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { signupUrl } from '../../api/api';
import axios from 'axios';


type SignUpScreenProps = StackScreenProps<RootStackParamList, 'SignUp'>;

const SignUp = ({ navigation }: SignUpScreenProps) => {
    const theme = useTheme();
    const { colors }: { colors: any } = theme;

    const [error,setError] = useState('');
    const [isChecked, setisChecked] = useState(false);
    const [termsError, setTermsError] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [mobileError, setMobileError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const shakeAnimation = new Animated.Value(0);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\d{10}$/;



    const triggerShake = () => {
        Animated.sequence([
            Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true }),
        ]).start();
    };

    const handleSignUp = async () => {
        let valid = true;

        // Reset errors
        setNameError('');
        setEmailError('');
        setMobileError('');
        setPasswordError('');
        setConfirmPasswordError('');
        setTermsError('');


        if (!name) {
            setNameError('Name is required');
            valid = false;
        }
        if (!email) {
            setEmailError('Email is required');
            valid = false;
        } else if (!emailRegex.test(email)) {
            setEmailError('Invalid email format');
            valid = false;
        }
        if (!mobile) {
            setMobileError('Mobile is required');
            valid = false;
        }else if (!mobileRegex.test(mobile)) {
            setMobileError('Mobile number must be exactly 10 digits');
            valid = false;
        }

        if (!password) {
            setPasswordError('Password is required');
            valid = false;
        }
        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            valid = false;
        }
        if (!isChecked) {
            setTermsError('You must agree to the Terms, Privacy and Fees.');
            valid = false;
        }

        if (!valid) {
            triggerShake();
            return;
        }

        try {
            const data = {
                name: name,
                userid: name,
                pwd: password,
                phone: mobile,
                status: 'active',
                email: email,
                address: 'password'
            };
        
            // Log the JSON data for debugging purposes
            console.log('Request Data:', JSON.stringify(data));
            // Replace 'your-api-url' with the actual endpoint URL
            const response = await axios.post(signupUrl(), 
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(response.data)
            // Check the response from the API
            if (response.data.success='User created successfully.') { // Assuming the API returns a 'success' flag
                navigation.navigate('SignIn');

            } else {
                setError('Invalid credentials'); // Set error message
            }
        } catch (error) {
            setError('An error occurred. Please try again.'); // Set error message for API call failure
            console.error(error); // Log the error for debugging
            // console.error('Error during API request:', error.response ? error.response.data : error.message);

        }


        // If all checks pass, navigate to the SignIn screen
        // navigation.navigate('SignIn');
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
                <View>
                    <View style={{
                        width: 600, height: 500, backgroundColor: COLORS.primary, borderRadius: 250,
                        marginLeft: -95, marginTop: -220, overflow: 'hidden'
                    }}>
                        <Image
                            style={{ height: undefined, aspectRatio: 2.3 / 1.2, resizeMode: 'contain', width: '100%', marginTop: 220 }}
                            source={IMAGES.item5}
                        />
                        <View style={{
                            width: 600, height: 500, backgroundColor: '#360F00', borderRadius: 250,
                            position: 'absolute', opacity: .8
                        }} />
                    </View>
                    <View style={{ position: 'absolute', top: 30, left: 20 }}>
                        <Text style={{ ...FONTS.Marcellus, fontSize: 28, color: COLORS.card }}>Create your{"\n"}Account</Text>
                    </View>
                </View>
                <View style={[GlobalStyleSheet.container, { paddingTop: 0, marginTop: -150 }]}>
                    <Animated.View
                        style={[{
                            shadowColor: 'rgba(195, 123, 95, 0.20)',
                            shadowOffset: {
                                width: 2,
                                height: 20,
                            },
                            shadowOpacity: .1,
                            shadowRadius: 5,
                            transform: [{ translateX: shakeAnimation }]
                        }, Platform.OS === "ios" && {
                            backgroundColor: colors.card,
                            borderRadius: 35
                        }]}
                    >
                        <View style={{ backgroundColor: colors.card, padding: 30, borderRadius: 40, paddingBottom: 40 }}>
                            <Text style={{ ...FONTS.Marcellus, fontSize: 20, color: colors.title, lineHeight: 28 }}>
                                Please Enter{"\n"}Your Details{error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
                            </Text>
                            <View style={{ marginBottom: 10, marginTop: 10 }}>
                                <Text style={{ ...FONTS.fontRegular, fontSize: 15, color: colors.title }}>Name<Text style={{ color: '#FF0000' }}>*</Text></Text>
                                <CustomInput
                                    value={name}
                                    onChangeText={(value: any) => setName(value)}
                                    errorMessage={nameError}
                                />
                                {nameError ? <Text style={{ color: 'red' }}>{nameError}</Text> : null}
                            </View>
                            <View style={{ marginBottom: 10 }}>
                                <Text style={{ ...FONTS.fontRegular, fontSize: 15, color: colors.title }}>Email Address<Text style={{ color: '#FF0000' }}>*</Text></Text>
                                <CustomInput
                                    value={email}
                                    onChangeText={(value: any) => setEmail(value)}
                                    errorMessage={emailError}
                                />
                                {emailError ? <Text style={{ color: 'red' }}>{emailError}</Text> : null}
                            </View>
                            <View style={{ marginBottom: 15 }}>
                                <Text style={{ ...FONTS.fontRegular, fontSize: 15, color: colors.title }}>Mobile<Text style={{ color: '#FF0000' }}>*</Text></Text>
                                <CustomInput
                                    value={mobile}
                                    onChangeText={(value: any) => setMobile(value)}
                                    errorMessage={mobileError}
                                />
                                {mobileError ? <Text style={{ color: 'red' }}>{mobileError}</Text> : null}
                            </View>
                            <View style={{ marginBottom: 15 }}>
                                <Text style={{ ...FONTS.fontRegular, fontSize: 15, color: colors.title }}>Password<Text style={{ color: '#FF0000' }}>*</Text></Text>
                                <CustomInput
                                    value={password}
                                    secureTextEntry
                                    onChangeText={(value: any) => setPassword(value)}
                                    errorMessage={passwordError}
                                />
                                {passwordError ? <Text style={{ color: 'red' }}>{passwordError}</Text> : null}
                            </View>
                            <View>
                                <Text style={{ ...FONTS.fontRegular, fontSize: 15, color: colors.title }}>Confirm Password<Text style={{ color: '#FF0000' }}>*</Text></Text>
                                <CustomInput
                                    value={confirmPassword}
                                    secureTextEntry
                                    onChangeText={(value: any) => setConfirmPassword(value)}
                                    errorMessage={confirmPasswordError}
                                />
                                {confirmPasswordError ? <Text style={{ color: 'red' }}>{confirmPasswordError}</Text> : null}
                                <View>
                                    <Checkbox.Item
                                        onPress={() => setisChecked(!isChecked)}
                                        position='leading'
                                        label="I agree to all Term, Privacy and Fees"
                                        color={colors.title}
                                        uncheckedColor={colors.textLight}
                                        status={isChecked ? "checked" : "unchecked"}
                                        style={{
                                            paddingHorizontal: 0,
                                            paddingVertical: 5,
                                        }}
                                        labelStyle={{
                                            ...FONTS.fontRegular,
                                            fontSize: 15,
                                            color: colors.title,
                                            textAlign: 'left',
                                        }}
                                    />
                                </View>
                                {/* {!isChecked && <Text style={{ color: 'red', marginTop: 10 }}>You must agree to the Terms, Privacy and Fees.</Text>} */}
                                {!isChecked && <Text style={{ color: 'red', marginTop: 10 }}>{termsError}</Text>}

                            </View>
                        </View>
                    </Animated.View>
                    <View style={{ paddingHorizontal: 60, marginTop: -30 }}>
                        <Button
                            title={'Sign Up'}
                            btnRounded
                            fullWidth
                            onPress={handleSignUp}
                            icon={<Feather size={24} color={COLORS.primary} name={'arrow-right'} />}
                            color={COLORS.primary}
                        />
                    </View>
                </View>
                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', flex: 1, paddingBottom: 10 }}>
                    <Text style={{ ...FONTS.fontRegular, fontSize: 15, color: colors.title }}>Already have an account?</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignIn')}
                    >
                        <Text style={{
                            ...FONTS.fontMedium,
                            borderBottomWidth: 1,
                            borderBottomColor: colors.title,
                            color: colors.title
                        }}>  Sign In</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

export default SignUp;
