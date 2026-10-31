import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const INITIAL_USER = {
  id: 'guest-101',
  name: 'Alex Vance',
  email: 'alex.vance@demo.cyber',
  role: 'Senior Full Stack Engineer',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  isGuest: true
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('resumate_user');
      return saved ? JSON.parse(saved) : INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });

  const [scanHistory, setScanHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('resumate_scans');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('resumate_user', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('resumate_scans', JSON.stringify(scanHistory));
    } catch (e) {
      console.error(e);
    }
  }, [scanHistory]);

  const login = (userData) => {
    setUser({
      ...userData,
      isGuest: false
    });
    setIsAuthModalOpen(false);
  };

  const loginAsGuest = () => {
    setUser(INITIAL_USER);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
  };

  const addScanRecord = (scan) => {
    const record = {
      id: 'scan-' + Date.now(),
      date: new Date().toLocaleString(),
      ...scan
    };
    setScanHistory(prev => [record, ...prev.slice(0, 19)]);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      loginAsGuest,
      logout,
      isAuthModalOpen,
      setIsAuthModalOpen,
      scanHistory,
      addScanRecord
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
