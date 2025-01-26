import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axios';

// Create AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if the user is already logged in on app load
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axiosInstance.get('/users/profile');
          setUser(response.data);
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
          localStorage.removeItem('token');
        }
      }
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      const userProfile = await axiosInstance.get('/users/profile');
      setUser(userProfile.data);
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Login failed');
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
