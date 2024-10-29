import { SafeAreaView, ScrollView, Text, View, Image, Platform, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import FormTextInput from '@/components/Forms/FormTextInput'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router';
import images from '@/constants/Images'
import ErrorMessage from '@/components/Forms/ErrorMessage'
import { FIREBASE_AUTH } from '@/FirebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'

interface FormState {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string; // Add confirmPassword
}

type Props = {}

const SignUp = (props: Props) => {
  const [form, setForm] = useState<FormState>({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '', // Initialize confirmPassword
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async () => {
    setIsLoading(true)
    setErrorMessage('')

    // Basic validation
    if (!form.fullname || !form.email || !form.password || !form.confirmPassword) {
      setErrorMessage('All fields are required.');
      setIsLoading(false);
      return;
    }

    if (form.password !== form.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    if (form.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      setIsLoading(false);
      return;
    }

    try {
      // Firebase signup
      const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, form.email, form.password);
      const user = userCredential.user;
      console.log('Registered user:', user);

      // TODO: You might want to add user data to Firestore here

      if (user) router.replace('/(tabs)'); // Redirect to sign-in after successful signup
    } catch (error: any) {
      let message = '';
      if (error.code === 'auth/email-already-in-use') {
        message = 'Email already in use.'
      } else if ('auth/invalid-email') {
        message = 'Invalid email address.'
      } else {
        message = 'Unable to create your account. Please try again later.'
        console.log('ERR', error)
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
              Sign up to <Text className='text-secondary-100'>Motorpilot</Text>
            </Text>

            <FormTextInput
              title="Full name"
              value={form.fullname}
              handleChangeText={(v: string) => setForm({...form, fullname: v})}
              otherStyles='mt-10'
            />
            <FormTextInput
              title="Email"
              value={form.email}
              handleChangeText={(v: string) => setForm({...form, email: v})}
              otherStyles='mt-7'
              keyboardType="email-address"
            />
            <FormTextInput
              title="Password"
              value={form.password}
              handleChangeText={(v: string) => setForm({...form, password: v})}
              otherStyles='mt-7'
            />
            <FormTextInput
              title="Confirm Password"
              value={form.confirmPassword}
              handleChangeText={(v: string) => setForm({ ...form, confirmPassword: v })}
              otherStyles="mt-7"
            />
            {errorMessage && <ErrorMessage message={errorMessage} />}
            <CustomButton
              title="Create account"
              handlePress={handleSubmit}
              containerStyles={`w-full ${errorMessage ? 'mt-2': 'mt-11'}`}
              isLoading={isLoading}
            />
            <View
              className='flex flex-row pt-5 justify-center gap-2'
            >
              <Text className='text-lg text-gray-100 font-pregular'>Have an account already?</Text>
              <Link
                href='/sign-in'
                className='text-lg font-psemibold text-secondary'
              >
                Sign in
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default SignUp
