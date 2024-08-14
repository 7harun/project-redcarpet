import React, { useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, SafeAreaView, Platform, Alert } from 'react-native';
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

type SignUpScreenProps = StackScreenProps<RootStackParamList, 'SignUp'>;

const SignUp = ({ navigation }: SignUpScreenProps) => {
    const theme = useTheme();
    const { colors }: { colors: any } = theme;

    const [isChecked, setisChecked] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = () => {
        console.log('alert')
        // Check if the checkbox is checked
        if (!isChecked) {
            Alert.alert('Error', 'You must agree to the Terms, Privacy and Fees.');
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match.');
            return;
        }

        // If all checks pass, navigate to the SignIn screen
        navigation.navigate('SignIn');
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
                        <View style={{ backgroundColor: colors.card, padding: 30, borderRadius: 40, paddingBottom: 40 }}>
                            <Text style={{ ...FONTS.Marcellus, fontSize: 20, color: colors.title, lineHeight: 28 }}>
                                Welcome Back! Please Enter{"\n"}Your Details
                            </Text>
                            <View style={{ marginBottom: 15, marginTop: 20 }}>
                                <Text style={{ ...FONTS.fontRegular, fontSize: 15, color: colors.title }}>Name<Text style={{ color: '#FF0000' }}>*</Text></Text>
                                <CustomInput
                                    value={name}
                                    onChangeText={(value: any) => setName(value)}
                                />
                            </View>
                            <View style={{ marginBottom: 15 }}>
                                <Text style={{ ...FONTS.fontRegular, fontSize: 15, color: colors.title }}>Email Address<Text style={{ color: '#FF0000' }}>*</Text></Text>
                                <CustomInput
                                    value={email}
                                    onChangeText={(value: any) => setEmail(value)}
                                />
                            </View>
                            <View style={{ marginBottom: 15 }}>
                                <Text style={{ ...FONTS.fontRegular, fontSize: 15, color: colors.title }}>Mobile<Text style={{ color: '#FF0000' }}>*</Text></Text>
                                <CustomInput
                                    value={mobile}
                                    onChangeText={(value: any) => setMobile(value)}
                                />
                            </View>
                            <View style={{ marginBottom: 15 }}>
                                <Text style={{ ...FONTS.fontRegular, fontSize: 15, color: colors.title }}>Password<Text style={{ color: '#FF0000' }}>*</Text></Text>
                                <CustomInput
                                    value={password}
                                    secureTextEntry
                                    onChangeText={(value: any) => setPassword(value)}
                                />
                            </View>
                            <View>
                                <Text style={{ ...FONTS.fontRegular, fontSize: 15, color: colors.title }}>Confirm Password<Text style={{ color: '#FF0000' }}>*</Text></Text>
                                <CustomInput
                                    value={confirmPassword}
                                    secureTextEntry
                                    onChangeText={(value: any) => setConfirmPassword(value)}
                                />
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
                            </View>
                        </View>
                    </View>
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
