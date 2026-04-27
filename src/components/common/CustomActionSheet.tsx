import React, { useRef, useEffect, useState } from "react";
import {
    View,
    Animated,
    PanResponder,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Text,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
} from "react-native";

const { height } = Dimensions.get("window");
interface ActionSheetProps {
    visible: boolean;
    onClose: () => void;
    children: React.ReactNode;
    sheetHeightRatio?: number;
}

const CustomActionSheet: React.FC<ActionSheetProps> = ({
    visible,
    onClose,
    children,
    sheetHeightRatio = 0.6,
}) => {
    const sheetHeight = height * sheetHeightRatio;
    const translateY = useRef(new Animated.Value(height)).current;
    const backdropOpacity = useRef(new Animated.Value(0)).current;
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    // useEffect(() => {
    //     if (!visible) return;

    //     const keyboardWillShow = Keyboard.addListener(
    //         Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
    //         (e) => {
    //             setKeyboardHeight(e.endCoordinates.height);
    //         }
    //     );

    //     const keyboardWillHide = Keyboard.addListener(
    //         Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
    //         () => {
    //             setKeyboardHeight(0);
    //         }
    //     );

    //     return () => {
    //         keyboardWillShow.remove();
    //         keyboardWillHide.remove();
    //     };
    // }, [visible]);

    const openSheet = () => {
        translateY.setValue(sheetHeight);
        Animated.parallel([
            Animated.timing(translateY, { toValue: 0, duration: 300, useNativeDriver: true }),
            Animated.timing(backdropOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
        ]).start();
    };

    const closeSheet = () => {
        Keyboard.dismiss(); // Hide keyboard when closing the sheet
        Animated.parallel([
            Animated.timing(translateY, { toValue: sheetHeight, duration: 300, useNativeDriver: true }),
            Animated.timing(backdropOpacity, { toValue: 0, duration: 300, useNativeDriver: true }),
        ]).start(onClose);
    };

    useEffect(() => {
        if (visible) openSheet();
    }, [visible]);

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gestureState) => {
                translateY.setValue(Math.max(0, gestureState.dy));
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dy > sheetHeight * 0.3) {
                    closeSheet();
                } else {
                    openSheet();
                }
            },
        })
    ).current;

    return visible ? (
        <>
            {/* 🔥 Background Dim Effect */}
            <Animated.View
                style={[styles.backdrop, { opacity: backdropOpacity }]}
                pointerEvents={visible ? "auto" : "none"}
            />

            {/* ❌ Cross Button (Adjusted with 40px Distance from the Sheet) */}
            <TouchableOpacity
                style={[styles.crossButton, { bottom: sheetHeight + keyboardHeight + 26 }]} // ✅ Adjusted based on keyboard height
                onPress={closeSheet}
            >
                <Text style={styles.crossText}>✕</Text>
            </TouchableOpacity>

            {/* 🔥 ActionSheet */}
            <Animated.View
                style={[
                    styles.sheetContainer,
                    {
                        transform: [{ translateY }],
                        maxHeight: sheetHeight - (keyboardHeight > 0 ? Math.max(0, keyboardHeight - 50) : 0), // Adjust height when keyboard is visible, ensure non-negative adjustment
                        height: keyboardHeight > 0 ? undefined : sheetHeight, // Allow flex when keyboard is visible
                    },
                ]}
            >
                <View style={styles.handle} {...panResponder.panHandlers} />


                {children}

            </Animated.View>
        </>
    ) : null;
};

export default CustomActionSheet;

const styles = StyleSheet.create({
    backdrop: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.7)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
    },
    sheetContainer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "auto",
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 10,
        paddingHorizontal: 15,
        paddingTop: 10,
        zIndex: 2,

    },
    handle: {
        width: 50,
        height: 5,
        backgroundColor: "#ccc",
        borderRadius: 10,
        alignSelf: "center",
        marginBottom: 10,
    },
    contentContainer: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    crossButton: {
        position: "absolute",
        right: 20, // Keep it aligned to the right
        backgroundColor: "rgba(255, 255, 255, 0.92)", // Semi-transparent white
        width: 34,
        height: 34,
        borderRadius: 17,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 3, // Ensures it appears above everything
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 3,
    },
    crossText: {
        fontSize: 18,
        color: "#111827",
        fontWeight: "700",
    },
});
