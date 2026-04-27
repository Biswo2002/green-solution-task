import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { ZORRRO_FONTS } from '~/styles';


const WIPScreen = ({ Instruction }: { Instruction: string }) => {
    return (
        <View style={styles.container}>
            <Image
                source={{
                    uri: 'https://img.freepik.com/free-vector/mobile-app-development-concept-modern-technology-smartphone-interface-design-application-building-programming-vector-flat-illustration_613284-3169.jpg?t=st=1720518943~exp=1720522543~hmac=90db09bf2616c2fc32b680e3acb8baa0ba187a16de305bca73335ae883a12f44&w=740',
                }}
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={styles.instruction}>{Instruction}</Text>
        </View>
    );
};

export default WIPScreen;

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    image: {
        width: 320, // equivalent to w="$80"
        height: 320, // equivalent to h="$80"
    },
    instruction: {
        marginTop: 20, // equivalent to mt="$5"
        fontSize: 16,
        fontFamily: ZORRRO_FONTS[600].normal,
        color: '#000',
        textAlign: 'center',
    },
});
