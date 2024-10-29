import { SafeAreaView, ScrollView, Text, View, Image, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import ImageLogo from '@/components/ImageLogo'
import FormField from '@/components/Forms/FormField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import images from '@/constants/Images'
import { FIREBASE_AUTH } from '@/FirebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import ErrorMessage from '@/components/Forms/ErrorMessage'

interface FormState {
  email: string;
  password: string;
}

type Props = {}

const SignIn = (props: Props) => {
  const [form, setForm] = useState<FormState>({
    email: 'john@example.com',
    password: 'secret123',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleSubmit = async () => {
    // TODO: prevent brute-force login, limit login only?
    setIsLoading(true)
    setErrorMessage('')
    if (form.email === '' || form.password === '') {
      setErrorMessage('Email or password must not be empty');
      setIsLoading(false)
      return;
    }

    try {
      const user = await signInWithEmailAndPassword(FIREBASE_AUTH, form.email, form.password)
      if (user) router.replace('/(tabs)/home')
    } catch (error: any) {
      let message = '';
      if (error.code === 'auth/invalid-credential') {
        message = 'Incorrect email or password!'
      } else if ('auth/invalid-email') {
        message = 'Invalid email address.'
      } else {
        message = 'Unable to login. Please try again later.'
      }
      setErrorMessage(message)
      setIsLoading(false)
    }
  };

  return (
    <SafeAreaView
      className='bg-primary h-full'
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView>
          <View className='w-full justify-center items-center min-h-[85vh]  px-4 my-6'>
            <Image
              source={images.logoSmall}
              className="w-[90px] h-[65px]"
              resizeMode="contain"
            />
            <Text
              className='text-2xl text-white text-semibold mt-4 font-psemibold'
            >
              Login in to <Text className='text-secondary-100'>Motorpilot</Text>
            </Text>
            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(v: string) => setForm({...form, email: v})}
              otherStyles='mt-7'
              keyboardType="email-address"
            />
            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(v: string) => setForm({...form, password: v})}
              otherStyles='mt-7'
            />
            {errorMessage && <ErrorMessage message={errorMessage} />}
            <CustomButton
              title="Sign in"
              handlePress={handleSubmit}
              containerStyles={`w-full ${errorMessage ? 'mt-2': 'mt-11'}`}
              isLoading={isLoading}
            />
            <View
              className='flex flex-row pt-5 justify-center gap-2'
            >
              <Text className='text-lg text-gray-100 font-pregular'>Don't have an account?</Text>
              <Link
                href='/sign-up'
                className='text-lg font-psemibold text-secondary'
              >
                Sign Up
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

    </SafeAreaView>
  )
}

export default SignIn
