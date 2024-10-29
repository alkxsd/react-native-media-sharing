import { SafeAreaView, ScrollView, Text, View, Image, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import SignOutButton from '@/components/SignOutButton'

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
          <SignOutButton />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Home