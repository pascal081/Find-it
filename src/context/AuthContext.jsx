import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('findit_user')) || null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) localStorage.setItem('findit_user', JSON.stringify(user));
    else localStorage.removeItem('findit_user');
  }, [user]);

  const login = async values => {
    setLoading(true);
    try {
      const result = await api.login(values);
      setUser(result);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const signup = async values => {
    setLoading(true);
    try {
      const result = await api.register(values);
      setUser(result);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => setUser(null);
  const value = useMemo(
    () => ({ user, loading, login, signup, logout }),
    [user, loading],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used inside AuthProvider');
  return value;
};
