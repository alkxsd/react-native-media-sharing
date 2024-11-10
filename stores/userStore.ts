import { persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createJSONStorage } from 'zustand/middleware'
import { UserInterface, InitialApplicationData } from '@/interfaces/userInterfaces'
import { create } from 'zustand'
import { createUserFirestoreCollection, fetchUserDataFromFirestore } from '@/services/firebaseService'
import { UserInfo } from 'firebase/auth'

type UserActions = {
  setAuthUserId: (userAuthId: string | null) => void
  updateApplicationData: (data: Partial<UserInterface['applicationData']>)  => void
  resetApplicationData: () => void
  fetchUserData: (userAuthId: string) => Promise<void>
  setFullName: (firstName: string, lastName: string) => void
  setIsUserLoading: (loading: boolean) => void
}

export const initialUserState: UserInterface = {
  userAuthId: null,
  applicationData: InitialApplicationData,
  isUserLoading: false,
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
      fetchUserData: async (userAuthId: string) => {
        set({ isUserLoading: true, error: null });
        try {
          const response = await fetchUserDataFromFirestore(userAuthId);
          set({ applicationData: response });
        } catch (error: any) {
          // If user data not found, create a new document in Firestore
          if (error.message === 'User data not found.') {
            try {
              const signUpData =  {
                firstName: initialUserState.applicationData.firstName,
                lastName: initialUserState.applicationData.lastName,
                email: '',
                password: ''
              }
              await createUserFirestoreCollection({ uid: userAuthId } as UserInfo, signUpData); // Assuming you have access to firstName and lastName
              // Re-fetch the data after creating the document
              const response = await fetchUserDataFromFirestore(userAuthId);
              set({ applicationData: response });
            } catch (createError) {
              console.error('Error creating user data:', createError);
              set({ error: 'Failed to create user data.' });
            }
          } else {
            set({ error: error.message });
          }
        } finally {
          set({ isUserLoading: false });
        }
      },
      setIsUserLoading: (loading) => set({ isUserLoading: loading })
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
)