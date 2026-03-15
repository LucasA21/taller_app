import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PressStartFont } from '@/src/components/PressStartFont';
import { colors } from '@/src/theme/colors';
import { AppButton } from '@/src/components/AppButton';
import { AppTextInput } from '@/src/components/AppTextInput';
import { useAuthForm } from '@/src/hooks/useAuthForm';

export default function AuthScreen() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    successMessage,
    isLogin,
    handleToggleMode,
    handleAuthAction
  } = useAuthForm();

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
                <PressStartFont style={styles.title}>
                {isLogin ? 'INICIAR SESION' : 'REGISTRARSE'}
                </PressStartFont>
            </View>

            <View style={styles.inputContainer}>
              <AppTextInput
                label="Email"
                placeholder="jugador@arcade.com"
                value={email}
                onChangeText={setEmail}
                autoCapitalize={'none'}
                keyboardType="email-address"
                editable={!loading}
              />
              <AppTextInput
                label="Password"
                placeholder="********"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                autoCapitalize={'none'}
                editable={!loading}
              />
            </View>

            {error ? (
              <View style={styles.messageBoxError}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            {successMessage ? (
              <View style={styles.messageBoxSuccess}>
                <Text style={styles.successText}>{successMessage}</Text>
              </View>
            ) : null}

            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.purple} />
              </View>
            ) : (
              <View style={styles.buttonContainer}>
                <AppButton
                  text={isLogin ? 'INGRESAR' : 'CREAR CUENTA'}
                  onPress={handleAuthAction}
                  style={styles.mainButton}
                  variant="primary"
                />
                <AppButton
                  text={isLogin ? 'IR A REGISTRO' : 'IR A LOGIN'}
                  onPress={handleToggleMode}
                  style={styles.toggleButton}
                  variant="secondary"
                />
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  cardContainer: {
    backgroundColor: colors.darkGray,
    borderWidth: 4,
    borderColor: colors.gray,
    padding: 24,
    paddingTop: 40,
    marginTop: 20,
    marginBottom: 20,
    position: 'relative',
  },
  cardHeader: {
    position: 'absolute',
    top: -16,
    left: 20,
    backgroundColor: colors.purple,
    borderWidth: 2,
    borderColor: colors.lightPurple,
    paddingHorizontal: 12,
    paddingVertical: 8,
    zIndex: 1,
  },
  title: {
    fontSize: 14,
    color: colors.white,
    textAlign: 'center',
    lineHeight: 16,
  },
  inputContainer: {
    gap: 15,
    marginTop: 10,
    marginBottom: 20,
  },
  messageBoxError: {
    borderWidth: 2,
    borderColor: colors.lightRed,
    backgroundColor: colors.errorOverlay,
    padding: 10,
    marginBottom: 20,
  },
  errorText: {
    color: colors.lightRed,
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 16,
  },
  messageBoxSuccess: {
    borderWidth: 2,
    borderColor: colors.green,
    backgroundColor: colors.successOverlay,
    padding: 10,
    marginBottom: 20,
  },
  successText: {
    color: colors.green,
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 16,
  },
  loadingContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  buttonContainer: {
    gap: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  mainButton: {
    width: '100%',
  },
  toggleButton: {
    width: '100%',
  }
});
