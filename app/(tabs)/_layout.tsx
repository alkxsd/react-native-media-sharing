import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import { icons } from '@/constants/Index'
import TabIcon from '@/components/navigation/TabIcon'
import { AppColors } from '@/constants/AppColors'

type Props = {}

const TabsLayout = (props: Props) => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#FFA001',
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 1,
            borderTopColor: '#232533',
            height: 84
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
