// src/hooks/useAuth.js
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const login = useCallback(async ({ email, password }) => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid credentials');
        return false;
      }

      if (result?.ok) {
        router.push('/todos');
        router.refresh();
        return true;
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
    return false;
  }, [router]);

  const register = useCallback(async ({ name, email, password }) => {
    try {
      setIsLoading(true);
      setError(null);
      console.log("name: ",name)
      console.log("email: ",email)
      console.log("password: ",password)
      

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Registration failed');
      }

      // Automatically log in after successful registration
      return await login({ email, password });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [login]);

  const loginWithGoogle = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      await signIn('google', { callbackUrl: '/todos' });
    } catch (err) {
      setError('Failed to login with Google');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      await signOut({ callbackUrl: '/' });
    } catch (err) {
      setError('Failed to logout');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    session,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading' || isLoading,
    error,
    login,
    loginWithGoogle,
    register,
    logout,
  };
};