import React from 'react';
import { Image, SafeAreaView } from 'react-native'
import images from '../../Theme/images';

import styles from './style';
const SplashScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={images.LogoImage}
                style={styles.logoImg}
                resizeMode='contain'
            />
        </SafeAreaView>
    )
}

export default SplashScreen