import { KeyboardAvoidingView, View } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScreenProps } from './data/entity';

const ScreenContainer: React.FC<ScreenProps> = ({ children, style }) => {
  return (
    <View style={[styles.container, style]}>
      <SafeAreaView edges={['top']} />

      <KeyboardAvoidingView style={styles.keyboardAvoidingContainer}>
        <KeyboardAwareScrollView
          style={styles.keyboardAvoidingContainer}
          bounces={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[styles.contentContainerStyle]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ScreenContainer;
