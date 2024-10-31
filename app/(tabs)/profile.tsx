import { SafeAreaView, ScrollView, Text, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import SignOutButton from '@/components/SignOutButton'

type Props = {}

const Profile = (props: Props) => {
  return (
    <SafeAreaView
      className='bg-primary h-full'
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView>
          <SignOutButton />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Profile
