import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '@/src/theme/colors';

export function ScanlineOverlay() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <View style={styles.scanlines} />
      <View style={styles.vignette} />
    </View>
  );
}

const styles = StyleSheet.create({
  scanlines: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    opacity: 0.3,
  },
  vignette: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 20,
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 4,
  }
});
