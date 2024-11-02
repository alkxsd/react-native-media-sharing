import { SafeAreaView, ScrollView, Text, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import TabScreenWrapper from '@/components/TabScreenWrapper'
import { useUserStore } from '@/stores/userStore'

type Props = {}

const Home = (props: Props) => {

  const userApplicationData = useUserStore((state) => state.applicationData)

  return (
    <SafeAreaView
      className='bg-primary h-full'
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView>
          <Text>Hello, {userApplicationData.firstName}</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Home