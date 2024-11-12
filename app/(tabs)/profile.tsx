import { SafeAreaView, ScrollView, View, KeyboardAvoidingView, Platform, Text } from 'react-native'
import React from 'react'
import SignOutButton from '@/components/SignOutButton'
import { useUserStore } from '@/stores/userStore'

type Props = {}

const Profile = (props: Props) => {

  const userData = useUserStore((state) => state.applicationData)

  return (
    <SafeAreaView
      className='bg-primary h-full'
  >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView>
          <View className='w-full justify-center min-h-[70vh]  px-4 my-6'>
            <Text className='text-2xl font-psemibold text-secondary'>Hi, {userData.firstName}</Text>
            <View
              className='flex-1 justify-end items-center p-4 w-full'
            >
              <SignOutButton />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Profile
