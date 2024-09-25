import React, { useState } from 'react';
import { Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

const CustomInput = (props) => {
    const theme = useTheme();
    const { colors } = theme;

    const [passwordShow, setPasswordShow] = useState(true);

    const handleShowPassword = () => {
        setPasswordShow(!passwordShow);
    }

    return (
        <>
            <View
                style={[{
                    shadowColor: "rgba(195,135,95,0.30)",
                    shadowOffset: {
                        width: 2,
                        height: props.background ? 20 : 2,
                    },
                    shadowOpacity: .1,
                    shadowRadius: 5,
                }, Platform.OS === "ios" && {
                    backgroundColor: colors.card,
                    borderRadius: 10
                }]}
            >
                <View style={{ position: 'relative', justifyContent: 'center' }}>
                    {/* Icon on the left */}
                    {props.icon &&
                        <View style={styles.iconContainer}>
                            {props.icon}
                        </View>
                    }
                    
                    {/* Input Field */}
                    <TextInput
                        secureTextEntry={props.type === "password" ? passwordShow : false}
                        style={[styles.input, {
                            color: colors.title,
                            borderColor: props.background ? COLORS.primary : colors.background,
                            backgroundColor: props.background ? colors.card : colors.background,
                        },
                        props.icon && styles.inputWithIcon, // Adjust padding if icon is present
                        props.inputLg && styles.inputLg,   // Larger input
                        props.inputSm && styles.inputSm,   // Smaller input
                        props.inputRounded && styles.inputRounded, // Rounded input
                        props.inputBorder && styles.inputBorder,  // Input with bottom border
                        ]}
                        placeholderTextColor={colors.textLight}
                        placeholder={props.placeholder}
                        onChangeText={props.onChangeText}
                        value={props.value}
                        defaultValue={props.defaultValue}
                        multiline={props.inputLg}
                        keyboardType={props.keyboardType}
                    />

                    {/* Password Toggle Icon */}
                    {props.type === "password" &&
                        <TouchableOpacity
                            accessible={true}
                            accessibilityLabel="Password"
                            accessibilityHint="Password show and hidden"
                            onPress={() => handleShowPassword()}
                            style={styles.eyeIcon}>
                            <FeatherIcon 
                                color={theme.dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'} 
                                size={18} 
                                name={passwordShow ? 'eye-off' : 'eye'} 
                            />
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        position: 'absolute',
        height: 48,
        width: 48,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        left: 0,
    },
    input: {
        ...FONTS.font,
        fontSize: 14,
        height: 45,
        borderWidth: 1,
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 10,
    },
    inputWithIcon: {
        paddingLeft: 50, // Add space for the left icon
    },
    inputLg: {
        height: 98,
    },
    inputSm: {
        paddingVertical: 7,
        height: 45,
    },
    inputRounded: {
        borderRadius: 30,
    },
    inputBorder: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderRadius: 0,
    },
    eyeIcon: {
        position: 'absolute',
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 0,
        zIndex: 1,
        top: 0,
    },
});

export default CustomInput;
