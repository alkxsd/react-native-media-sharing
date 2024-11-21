import React, { createContext, useContext, useState, useEffect } from 'react';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

interface AuthContextType {
  user: any | null;
  isAuthLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<any | null>>;
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
    <AuthContext.Provider value={{ user, isAuthLoading, setUser }}>
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