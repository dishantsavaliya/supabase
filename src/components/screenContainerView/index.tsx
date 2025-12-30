import { View } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenProps } from './data/entity';

const ScreenContainerView: React.FC<ScreenProps> = ({ children, style }) => {
  return (
    <View style={[styles.container, style]}>
      <SafeAreaView edges={['top']} />
      {children}
    </View>
  );
};

export default ScreenContainerView;
