import React, { useEffect } from 'react'
import { Tabs, router } from 'expo-router'
import { icons } from '@/constants/Index'
import TabIcon from '@/components/navigation/TabIcon'
import { AppColors } from '@/constants/AppColors'
import { useAuth } from '@/context/AuthContext'

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
          tabBarInactiveTintColor: AppColors.gray[200] ,
          tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 1,
            borderTopColor: '#232533',
            height: 85
          }
        }}
      >
        {/* Home tab */}
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
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
        {/* Bookmark tab */}
        <Tabs.Screen
          name="bookmark"
          options={{
            title: 'Bookmark',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={ icons.bookmark }
                color={color}
                name="Bookmark"
                focused={focused}
              />
            )
          }}
        />
        {/* Create tab */}
        <Tabs.Screen
          name="create"
          options={{
            title: 'Create',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={ icons.plus }
                color={color}
                name="Create"
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
            headerShown: false,
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
