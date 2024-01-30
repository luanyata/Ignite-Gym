import { createContext, ReactNode, useEffect, useState } from 'react'

import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from '@storage/storageUser'

import { api } from '@services/api'
import { UserDTO } from '@dtos/UserDTO'
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from '../storage/storageAuthToken'

export type AuthContextDataProps = {
  user: UserDTO
  singIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  isLoadingUserStorageData: boolean
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  const userAndTokenUpdate = async (userData: UserDTO, token: string) => {
    api.defaults.headers.common.Authorization = `Bearer ${token}`

    setUser(userData)
  }

  const storageUserAndTokenSave = async (userData: UserDTO, token: string) => {
    try {
      setIsLoadingUserStorageData(true)
      await storageUserSave(userData)
      await storageAuthTokenSave(token)
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  const singIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post('/sessions', { email, password })

      if (data.user && data.token) {
        await storageUserAndTokenSave(data.user, data.token)
        userAndTokenUpdate(data.user, data.token)
      }
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  const signOut = async () => {
    try {
      setIsLoadingUserStorageData(true)
      setUser({} as UserDTO)
      await storageUserRemove()
      await storageAuthTokenRemove()
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  const loadUserData = async () => {
    try {
      setIsLoadingUserStorageData(true)

      const userLogged = await storageUserGet()
      const token = await storageAuthTokenGet()

      if (token && userLogged) {
        userAndTokenUpdate(userLogged, token)
      }
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        singIn,
        signOut,
        isLoadingUserStorageData,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
