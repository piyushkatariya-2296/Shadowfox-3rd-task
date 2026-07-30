import React, { createContext, useState, useEffect } from 'react';
import API from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('pulsefit_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (token) {
        try {
          const res = await API.get('/auth/me');
          if (res.data.success) {
            setUser(res.data.user);
          }
        } catch (error) {
          console.warn('Token expired or invalid user session');
          logout();
        }
      }
      setLoading(false);
    };

    fetchCurrentUser();
  }, [token]);

  const login = async (email, password) => {
    const res = await API.post('/auth/login', { email, password });
    if (res.data.success) {
      const newToken = res.data.token;
      localStorage.setItem('pulsefit_token', newToken);
      setToken(newToken);
      setUser(res.data.user);
    }
    return res.data;
  };

  const signup = async (userData) => {
    const res = await API.post('/auth/signup', userData);
    if (res.data.success) {
      const newToken = res.data.token;
      localStorage.setItem('pulsefit_token', newToken);
      setToken(newToken);
      setUser(res.data.user);
    }
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('pulsefit_token');
    setToken(null);
    setUser(null);
  };

  const updateUserProfile = async (data) => {
    const res = await API.put('/auth/profile', data);
    if (res.data.success) {
      setUser(res.data.user);
    }
    return res.data;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token,
        isAdmin: user?.role === 'admin',
        login,
        signup,
        logout,
        updateUserProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
