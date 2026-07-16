'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, getCurrentUser, tokenStorage } from '@/lib/auth'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (userData: User, access: string, refresh: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function checkAuth() {
      const accessToken = tokenStorage.getAccess()
      if (accessToken) {
        try {
          const userData = await getCurrentUser(accessToken)
          setUser(userData)
        } catch (error) {
          console.error('Failed to restore session', error)
          tokenStorage.clear()
        }
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const login = (userData: User, access: string, refresh: string) => {
    setUser(userData)
    tokenStorage.setTokens(access, refresh)
  }

  const logout = () => {
    setUser(null)
    tokenStorage.clear()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
