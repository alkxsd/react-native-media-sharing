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
    const handleUserAuthentication = async () => {
      if (!isAuthLoading && !user) {
        router.replace('/sign-in');
        return;
      }

      if (!isAuthLoading && user) {
        if (userAuthId !== user.uid) {
          setAuthUserId(user.uid);
          resetApplicationData();
          await fetchUserData(user.uid);
        } else if (Object.keys(applicationData).length === 0) {
          await fetchUserData(user.uid);
        } else {
          console.log('Setting current user only: no data fetching');
          setAuthUserId(user.uid);
        }
      }
    };

    handleUserAuthentication();
  }, [user, isAuthLoading]);

  return (
    <>
      <Loader isLoading={isAuthLoading || isUserLoading} />
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
            headerShown: false,
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