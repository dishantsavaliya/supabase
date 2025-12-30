import { View } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScreenProps } from './data/entity';

const ScreenContainerSubView: React.FC<ScreenProps> = ({ children, style }) => {
  return (
    <View style={[styles.container, style]}>
      <KeyboardAwareScrollView
        style={styles.keyboardAvoidingContainer}
        bounces={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        keyboardOpeningTime={0}
        enableOnAndroid={true}
      >
        {children}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ScreenContainerSubView;
