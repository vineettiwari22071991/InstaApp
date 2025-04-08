import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '@/styles/auth.styles'
import { Ionicons } from '@expo/vector-icons'
import { useSSO } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'

export default function LoginScreen() {

    const {startSSOFlow} = useSSO()
    const router = useRouter()
    const handleGoogleSignIn =  async () => {
        try {
           const {createdSessionId, setActive} = await startSSOFlow({
                strategy: "oauth_google",})

           if(setActive && createdSessionId){
                setActive({session: createdSessionId})
                router.replace("/(tabs)")
           }

        } catch (error) {
            console.log("Error during Google sign-in:", error)
        }
    }
    return (
        <View style={styles.container}>
            {/* BRAND SECTION */}
            <View style={styles.brandSection}>
                <View style={styles.headerLogo}>
                    <Ionicons name="leaf" size={24} color="green"
                    />
                </View>
                <Text style={styles.appName}>spotlight</Text>
                <Text style={styles.tagline}>don't miss anything</Text>
            </View>

            {/* ILLUSTRATION SECTION */}
            <View style={styles.illustrationContainer}>
                <Image
                    source={require("../../assets/images/Online wishes-bro.png")}
                    style={styles.illustration}
                    resizeMode='cover'
                />
            </View>
            {/*LOGIN SECTION */}
            <View style={styles.loginSection}>
                <TouchableOpacity  style={styles.googleButton}
                onPress={handleGoogleSignIn}
                activeOpacity={0.9}
                >
                    <View style={styles.googleIconContainer}>
                        <Ionicons name="logo-google" size={24} color="black" />
                    </View>
                    <Text style={styles.googleButtonText}>Continue with Google</Text>
                </TouchableOpacity>
                <Text style={styles.termsText}>
                    By continuing, you agree to our Terms and Privacy Policy
                </Text>
            </View>
        </View>
    )
}