import { persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createJSONStorage } from 'zustand/middleware'
import { UserInterface } from '@/interfaces/userInterfaces'
import { create } from 'zustand'
import { fetchUserDataFromFirestore } from '@/lib/firebaseHelpers'

type UserActions = {
  setAuthUserId: (userAuthId: string | null) => void
  updateApplicationData: (data: Partial<UserInterface['applicationData']>)  => void
  resetApplicationData: () => void
  fetchUserData: (userAuthId: string) => Promise<void>
  setFullName: (firstName: string, lastName: string) => void
}

export const initialUserState: UserInterface = {
  userAuthId: null,
  applicationData: {
    firstName: '',
    lastName: '',
    middleName: '',
    suffixName: '',
    gender: '',
    birthDate: null,
    birthPlace: '',
    idType: '',
    idNumber: '',
    idFilePath: '',
    applicationStatus: 'pending',
    address: {
      barangay: '',
      zip: '',
      address_line1: '',
      address_line2: '',
      city: '',
      state: '',
      country: '',
    },
    employment: {
      companyName: '',
      contact: '',
      designation: '',
      position: '',
      location: '',
    },
  },
  isLoading: false,
  error: null,
}

export const useUserStore = create<UserInterface & UserActions>()(
  persist(
    (set) => ({
      ...initialUserState,
      setAuthUserId: (userAuthId) => set({ userAuthId }),
      setFullName: (firstName, lastName) =>
        set((state) => ({
          applicationData: {
            ...state.applicationData,
            firstName,
            lastName
          }
        })),
      updateApplicationData: (data) => set((state) => ({ applicationData: { ...state.applicationData, ...data } })),
      resetApplicationData: () => set({ applicationData: initialUserState.applicationData }),
      fetchUserData: async (userAuthId: string) =>{
        set({ isLoading: true, error: null });
        try {
          const response = await fetchUserDataFromFirestore(userAuthId)
          set({ applicationData: response, isLoading: false })
        } catch (error: any) {
          set({ error: error.message, isLoading: false })
        }
      }
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
)