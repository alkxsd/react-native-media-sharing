import { SafeAreaView, ScrollView, Text, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import TabScreenWrapper from '@/components/TabScreenWrapper'

type Props = {}

const Home = (props: Props) => {
  return (
    <SafeAreaView
      className='bg-primary h-full'
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView>
          <Text>Home</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Home