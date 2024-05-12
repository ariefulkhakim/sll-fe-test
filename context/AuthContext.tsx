"use client"

import { createContext, useContext, useEffect, useState } from 'react';
import {apiClient} from '@/service/apiService';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookie from 'js-cookie';

type User = {
  username: string;
  email: string;
  // tambahkan properti lain sesuai kebutuhan
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Cek apakah pengguna sudah login saat komponen dipasang
    checkAuthenticated();
  }, []);

  const checkAuthenticated = async () => {
    try {
      // Cek apakah ada access token yang tersimpan di cookie atau localStorage
      const accessToken = getAccessTokenFromCookie();
      if (!accessToken) {
        return;
      }

      setIsAuthenticated(true);
      // // Lakukan validasi token ke server, misalnya dengan endpoint `/api/auth/validate`
      // const response = await apiClient.get('/auth/verify', {
      //   headers: { Authorization: `Bearer ${accessToken}` },
      //   params: {
      //     token: accessToken
      //   }
      // });

      // // Jika token valid, atur pengguna dan isAuthenticated menjadi true
      // setUser(response.data.user);
    } catch (error) {
      console.error('Error validating token:', error);
      // Jika terjadi error atau token tidak valid, logout pengguna
      // logout();
    }
  };

  const login = async (username: string, password: string) => {
    try {
      // Lakukan request ke endpoint sign-in untuk mendapatkan access token
      const response = await apiClient.post('/auth/login', { username, password });

      console.log(response)

      // Set access token ke cookie
      setAccessTokenToCookie(response?.data?.accessToken);

      // Set user dan isAuthenticated
      setUser(response?.data?.user);

      router.push("/dashboard");
    } catch (error) {
      console.error('Error logging in:', error);
      throw error
    }
  };

  const logout = async () => {
    setIsAuthenticated(false);
    // Hapus access token dari cookie
    Cookie.remove('access_token')


    // Hapus user dan isAuthenticated
    setUser(null);

    // Redirect ke halaman login
    router.push('/sign-in');
  };

  const getAccessTokenFromCookie = () => {
    return document.cookie.replace(
      /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
  };

  const setAccessTokenToCookie = (accessToken: string) => {
    document.cookie = `access_token=${accessToken};path=/`;
  };

  const removeAccessTokenFromCookie = () => {
    document.cookie = 'access_token=; Max-Age=0; path=/';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
