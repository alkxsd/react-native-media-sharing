import React, { createContext, useContext, useState, useEffect } from 'react';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

interface AuthContextType {
  user: any | null; // Or your custom User type
  isAuthLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null)

  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user)
      setIsAuthLoading(false)

      return unsubscribe
    })
  }, [FIREBASE_AUTH])

  return (
    <AuthContext.Provider value={{ user, isAuthLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (context === null) {
    throw new Error('useAuth must be used within an AuthContextProvider')
  }

  return context
}