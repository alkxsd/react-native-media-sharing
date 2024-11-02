import React, { useEffect } from 'react'
import { Tabs, router } from 'expo-router'
import { icons } from '@/constants/Index'
import TabIcon from '@/components/navigation/TabIcon'
import { AppColors } from '@/constants/AppColors'
import { useAuth } from '@/contexts/AuthContext'
import { useUserStore } from '@/stores/userStore'
import Loader from '@/components/Loader'


type Props = {}

const TabsLayout = (props: Props) => {

  const { user, isAuthLoading } = useAuth();

  const userAuthId = useUserStore((state) => state.userAuthId)
  const setAuthUserId = useUserStore((state) => state.setAuthUserId)
  const isUserLoading = useUserStore((state) => state.isUserLoading)
  const fetchUserData = useUserStore((state) => state.fetchUserData)
  const applicationData = useUserStore((state) => state.applicationData)
  const resetApplicationData = useUserStore((state) => state.resetApplicationData)

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.replace('/sign-in')
    } else if (!isAuthLoading && user) {
      if (Object.keys(applicationData).length === 0) {
        // If applicationData is empty, fetch user data
        console.log('Fetching User Data from "users" firestore');
        fetchUserData(user.uid)
      } else if (userAuthId !== user.uid) {
        // If a different user logs in, reset the store and fetch their data
        setAuthUserId(user.uid)
        resetApplicationData()
        console.log('User diff from user prev auth: Fetching User Data from "users" firestore');
        fetchUserData(user.uid)
      } else {
        // If the same user logs in, just update the userId (if needed)
        console.log('Setting current user only: no data fetching')
        setAuthUserId(user.uid)
      }
    }
  }, [user, isAuthLoading, userAuthId, applicationData])

  if (isAuthLoading) {
    return <Loader isLoading={isAuthLoading} />
  }

  if (isUserLoading) {
    return <Loader isLoading={isUserLoading} />
  }

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: AppColors.secondary.DEFAULT,
          tabBarInactiveTintColor: AppColors.accent[200],
          tabBarStyle: {
            backgroundColor: AppColors.primary[100],
            borderTopWidth: 2,
            borderTopColor: AppColors.accent[100],
            height: 95
          }
        }}
      >
        {/* Home tab */}
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            ...headerOptions,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={ icons.home }
                color={color}
                name="Home"
                focused={focused}
              />
            )
          }}
        />
        {/* Profile tab */}
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            ...headerOptions,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={ icons.plus }
                color={color}
                name="Profile"
                focused={focused}
              />
            )
          }}
        />
      </Tabs>
    </>
  )
}


const headerOptions = {
  headerShown: true,
  headerStyle: {
    backgroundColor: AppColors.primary[100],
    borderBottomColor: AppColors.accent[100],
    borderBottomWidth: 2,
  },
  headerTintColor: AppColors.secondary.DEFAULT,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

export default TabsLayout