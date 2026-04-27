import React from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from 'react-native';
import WIPScreen from '../components/core/WIPScreen';

type ScrollableProps = {
  onScroll?: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

export function screenWithScroll(
  name: string,
): React.FC<ScrollableProps> {
  const C: React.FC<ScrollableProps> = props => (
    <ScrollView
      onScroll={props.onScroll}
      scrollEventThrottle={16}
    >
      <WIPScreen Instruction={name} />
    </ScrollView>
  );
  C.displayName = name;
  return C;
}

export function screenWip(name: string): React.FC {
  const C: React.FC = () => <WIPScreen Instruction={name} />;
  C.displayName = name;
  return C;
}
