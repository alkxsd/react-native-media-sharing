import React, { useEffect } from 'react'
import { Tabs, router } from 'expo-router'
import { icons } from '@/constants/Index'
import TabIcon from '@/components/navigation/TabIcon'
import { AppColors } from '@/constants/AppColors'
import { useAuth } from '@/contexts/AuthContext'

type Props = {}

const TabsLayout = (props: Props) => {

  const { user, isAuthLoading } = useAuth();

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.replace('/sign-in');
    }
  }, [user, isAuthLoading]);

  if (isAuthLoading) {
    return null; // Or a loading indicator
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
            borderTopWidth: 1,
            borderTopColor: AppColors.secondary.DEFAULT,
            height: 95
          }
        }}
      >
        {/* Home tab */}
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            headerShown: true,
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
            headerShown: true,
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

export default TabsLayout
