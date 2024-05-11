import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';
import {EColor} from 'src/enums/colors';

const LoadingModal = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={EColor.primary} size={'large'} />
    </View>
  );
};

export default LoadingModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: EColor.color_00000060,
  },
});
