// components/Skeleton.tsx
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleProp, ViewStyle } from 'react-native';

type Props = {
    width?: number | string;
    height?: number | string;
    radius?: number;
    style?: StyleProp<ViewStyle>;
};

const BASE = '#ECEFF3';      // base fill
const HILITE = '#F7F9FC';    // shine streak

export const Skeleton: React.FC<Props> = ({
    width = '100%',
    height = 16,
    radius = 10,
    style,
}) => {
    const translate = useRef(new Animated.Value(-1)).current;

    useEffect(() => {
        const loop = Animated.loop(
            Animated.timing(translate, {
                toValue: 1,
                duration: 1400,
                easing: Easing.inOut(Easing.linear),
                useNativeDriver: true,
            })
        );
        loop.start();
        return () => loop.stop();
    }, [translate]);

    // shimmer bar width factor
    const SHIMMER_W = 0.6;

    return (
        <Animated.View
            style={[
                {
                    width: typeof width === 'string' ? undefined : width,
                    height: typeof height === 'string' ? undefined : height,
                    flexGrow: typeof width === 'string' ? 1 : undefined,
                    borderRadius: radius,
                    backgroundColor: BASE,
                    overflow: 'hidden',
                },
                style,
            ]}
        >
            <Animated.View
                pointerEvents="none"
                style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    width: typeof width === 'number' ? width * SHIMMER_W : '60%',
                    // move from -60% to +100%
                    transform: [
                        {
                            translateX: translate.interpolate({
                                inputRange: [-1, 1],
                                outputRange: ['-60%', '100%'],
                            }),
                        },
                    ],
                    backgroundColor: HILITE,
                    opacity: 0.6,
                }}
            />
        </Animated.View>
    );
};
