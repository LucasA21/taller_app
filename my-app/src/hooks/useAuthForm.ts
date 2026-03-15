import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';

export function useAuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState(true);

  const clearMessages = () => {
    setError(null);
    setSuccessMessage(null);
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    clearMessages();
  };

  const validateForm = (isLoginAttempt: boolean) => {
    clearMessages();
    
    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, ingresa un correo electrónico válido.');
      return false;
    }

    if (!isLoginAttempt) {
      if (password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres.');
        return false;
      }
      if (!/\d/.test(password)) {
        setError('La contraseña debe contener al menos un número.');
        return false;
      }
    }
    return true;
  };

  async function signInWithEmail() {
    if (!validateForm(true)) return;
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        setError('El correo o la contraseña son incorrectos.');
      } else {
        setError(error.message);
      }
    } else {
      router.replace('/');
    }
    setLoading(false);
  }

  async function signUpWithEmail() {
    if (!validateForm(false)) return;
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      if (error.status === 400 || error.message.includes('already registered')) {
        setError('Este correo electrónico ya está registrado.');
      } else {
        setError(error.message);
      }
    } else {
      setSuccessMessage('¡Tu cuenta ha sido creada! Iniciando sesión...');
      // Upon successful creation, if we have a session, redirect.
      if (session) {
        setTimeout(() => {
          router.replace('/');
        }, 1500);
      } else {
        // Fallback or explicit login if email confirmation wasn't explicitly disabled 
        // but no session was returned out of the box.
        setTimeout(() => {
          setIsLogin(true);
          setSuccessMessage(null);
        }, 3000);
      }
    }
    setLoading(false);
  }

  const handleAuthAction = () => {
    if (isLogin) {
      signInWithEmail();
    } else {
      signUpWithEmail();
    }
  };

  return {
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
  };
}
