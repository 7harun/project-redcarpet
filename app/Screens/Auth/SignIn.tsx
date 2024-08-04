import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, Platform, Animated, StyleSheet } from 'react-native';
import { FONTS, COLORS } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import CustomInput from '../../components/Input/CustomInput';
import Button from '../../components/Button/Button';
import SocialBtn from '../../components/Socials/SocialBtn';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

import { IMAGES } from '../../constants/Images';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';

type SignInScreenProps = StackScreenProps<RootStackParamList, 'SignIn'>;

const SignIn = ({ navigation }: SignInScreenProps) => {

    const [email, setEmail] = useState(''); // State to store the email
    const [pwd, setPwd] = useState(''); // State to store the email
    const [error, setError] = useState(''); // State to store the error message
    const [fadeAnim] = useState(new Animated.Value(0)); // Animated value for fade effect



    const checkData = (testuser: string, pwd: string): boolean => {
        return testuser === 'test' && pwd === '12345';
    };


    const handlePress = () => {

        // if (checkData(email, pwd)) {
        if (true) {
            // Navigate to Home if credentials are valid
            setError(''); // Clear error message

            navigation.navigate('DrawerNavigation', { screen: 'Home' });
        } else {
            setError('Invalid credentials'); // Set error message
            fadeInError(); // Trigger fade-in animation
            setTimeout(() => {
                fadeOutError(); // Trigger fade-out animation after a delay
            }, 3000); // Adjust delay as needed
        };
    }

    // Fade in the error message
    const fadeInError = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    // Fade out the error message
    const fadeOutError = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };



    const theme = useTheme();
    const { colors }: { colors: any } = theme;

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
                <View>

                    <View style={{ width: 600, height: 500, backgroundColor: COLORS.primary, borderRadius: 250, marginLeft: -95, marginTop: -220, overflow: 'hidden' }}>
                        <Image
                            style={{ height: undefined, aspectRatio: 2.3 / 1.5, resizeMode: 'contain', width: '100%', marginTop: 150, }}
                            source={IMAGES.item4}
                        />
                        <View style={{ width: 600, height: 500, backgroundColor: '#360F00', borderRadius: 250, position: 'absolute', opacity: .8 }} />
                    </View>
                    <View style={{ position: 'absolute', top: 30, left: 20 }}>
                        <Text style={{ ...FONTS.Marcellus, fontSize: 28, color: COLORS.white }}>Sign In To{"\n"}Your Account</Text>
                    </View>
                </View>

                <View style={[GlobalStyleSheet.container, { paddingTop: 0, marginTop: -150 }]}>
                    <View
                        style={[{
                            shadowColor: 'rgba(195, 123, 95, 0.20)',
                            shadowOffset: {
                                width: 2,
                                height: 20,
                            },
                            shadowOpacity: .1,
                            shadowRadius: 5,
                        }, Platform.OS === "ios" && {
                            backgroundColor: colors.card,
                            borderRadius: 35
                        }]}
                    >
                        <View style={{ backgroundColor: colors.card, padding: 30, borderRadius: 40, paddingBottom: 80 }}>
                            {error ? (
                                <Animated.View style={[styles.errorContainer, { opacity: fadeAnim }]}>
                                    <Text style={styles.errorText}>{error}</Text>
                                </Animated.View>
                            ) : null}
                            <Text style={{ ...FONTS.Marcellus, fontSize: 20, color: colors.title, lineHeight: 28 }}>Welcome Back You've{"\n"}Been Missed!</Text>
                            <View style={{ marginBottom: 15, marginTop: 20 }}>
                                <Text style={{ ...FONTS.fontRegular, fontSize: 15, color: colors.title }}>Email Address<Text style={{ color: '#FF0000' }}>*</Text></Text>
                                <CustomInput
                                    onChangeText={(value: string) => setEmail(value)} // Update state on input change
                                    value={email} // Set value to the state

                                />
                            </View>
                            <View>
                                <Text style={{ ...FONTS.fontRegular, fontSize: 15, color: colors.title }}>Password<Text style={{ color: '#FF0000' }}>*</Text></Text>
                                <CustomInput
                                    type={'password'}
                                    onChangeText={(value: string) => setPwd(value)} // Update state on input change
                                    value={pwd} // Set value to the state
                                />
                                <TouchableOpacity
                                    style={{
                                        position: 'absolute',
                                        bottom: -25,
                                        left: 0,
                                    }}
                                    onPress={() => navigation.navigate('ForgatPassword')}
                                >
                                    <Text style={{
                                        ...FONTS.fontRegular,
                                        fontSize: 15,
                                        color: colors.title,
                                        borderBottomWidth: 1,
                                        borderBottomColor: colors.title
                                    }}>
                                        Forgot Password?
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                    <View style={{ paddingHorizontal: 60, marginTop: -30 }}>
                        <Button
                            title={'Sign In'}
                            btnRounded
                            fullWidth
                            // onPress={() => navigation.navigate('DrawerNavigation',{screen : 'Home'})}
                            onPress={handlePress}  // Pass the function reference

                            icon={<Feather size={24} color={COLORS.primary} name={'arrow-right'} />}
                            color={COLORS.primary}
                        />
                    </View>
                </View>
                <View style={[GlobalStyleSheet.container, { paddingHorizontal: 20, flex: 1 }]}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 30
                        }}
                    >
                        <View
                            style={{
                                height: 1,
                                flex: 1,
                                backgroundColor: colors.title,
                            }}
                        />
                        <Text style={{
                            ...FONTS.fontMedium,
                            color: colors.text,
                            marginHorizontal: 15,
                            fontSize: 13
                        }}>Or continue with</Text>
                        <View
                            style={{
                                height: 1,
                                flex: 1,
                                backgroundColor: colors.title,
                            }}
                        />
                    </View>
                    <View>
                        <View style={{ marginBottom: 20 }}>
                            <SocialBtn
                                icon={<Image style={{ height: 20, width: 20, resizeMode: 'contain' }} source={IMAGES.google2} />}
                                rounded
                                color={theme.dark ? '#000' : '#FFFFFF'}
                                text={'Sign in with google'}
                            />
                        </View>
                        <View>
                            <SocialBtn
                                icon={<FontAwesome name='apple' size={20} color={colors.title} />}
                                rounded
                                color={theme.dark ? '#000' : '#FFFFFF'}
                                text={'Sign in with apple'}
                            />
                        </View>
                    </View>
                </View>
                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', flex: 1 }}>
                    <Text style={{ ...FONTS.fontRegular, fontSize: 15, color: colors.title }}>Not a member?</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUp')}
                    >
                        <Text style={{
                            ...FONTS.fontMedium,
                            borderBottomWidth: 1,
                            borderBottomColor: colors.title,
                            color: colors.title
                        }}> Create an account</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    inputContainer: {
        marginBottom: 15,
        marginTop: 20,
    },
    label: {
        ...FONTS.fontRegular,
        fontSize: 15,
        color: COLORS.title,
    },
    required: {
        color: '#FF0000',
    },
    errorContainer: {
        backgroundColor: '#FFDDDD', // Light red background for the ribbon
        borderColor: '#FF0000', // Red border color
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
    },
    errorText: {
        color: '#FF0000', // Red color for error message
    },
});

export default SignIn;