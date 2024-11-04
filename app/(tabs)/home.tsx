import { SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import { useUserStore } from '@/stores/userStore'
import ApplicationForm from '@/components/ApplicationForm'

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
          <ApplicationForm />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Home