import { SafeAreaView, ScrollView, Text, View, Image, Platform, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import FormTextInput from '@/components/Forms/FormTextInput'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router';
import images from '@/constants/Images'
import ErrorMessage from '@/components/Forms/ErrorMessage'
import { FIREBASE_AUTH } from '@/FirebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const signUpSchema = z.object({
  fullname: z
    .string()
    .min(2, { message: 'Full name must be at least 2 characters long' })
    .max(50, { message: 'Full name must not exceed 50 characters' })
    .min(1, { message: 'Full name is required' }),
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .min(1, { message: 'Email is required' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .min(1, { message: 'Password is required' }),
  confirmPassword: z
    .string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], // path of error
})

export type SignUpFormData = z.infer<typeof signUpSchema>;

type Props = {}

const SignUp = (props: Props) => {
  const { control, handleSubmit, setError ,formState: { errors } } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  })

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submit = async (data: SignUpFormData) => {
    setIsLoading(true);

    try {
      // Firebase signup
      const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, data.email, data.password);
      const user = userCredential.user;
      console.log('Registered user:', user);

      // TODO: You might want to add user data to Firestore here

      if (user) router.replace('/(tabs)'); // Redirect to sign-in after successful signup
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setError('email', { type: 'manual', message: 'Email already in use.' });
      } else if (error.code === 'auth/invalid-email') {
        setError('email', { type: 'manual', message: 'Invalid email address.' })
      } else {
        // For other errors, you can set the error on the root level
        setError('root.signup', {
          type: 'manual',
          message: 'Unable to create your account. Please try again later.'
        });
      }
    } finally {
      setIsLoading(false)
    }
  }

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
              name="fullname"
              control={control}
              title="Full name"
              placeholder="Enter your full name"
              otherStyles="mt-10"
            />
            {errors.fullname && <ErrorMessage message={errors.fullname.message ?? ''} />}

            <FormTextInput
              name="email"
              control={control}
              title="Email"
              placeholder="Enter your email"
              otherStyles="mt-7"
              keyboardType="email-address"
            />
            {errors.email && <ErrorMessage message={errors.email.message ?? ''} />}

            <FormTextInput
              name="password"
              control={control}
              title="Password"
              placeholder="Enter your password"
              otherStyles="mt-7"
            />
            {errors.password && <ErrorMessage message={errors.password.message ?? ''} />}
            <FormTextInput
              name="confirmPassword"
              control={control}
              title="Confirm Password"
              placeholder="Confirm your password"
              otherStyles="mt-7"
            />
           {errors.confirmPassword && <ErrorMessage message={errors.confirmPassword.message ?? ''} />}
            <CustomButton
              title="Create account"
              handlePress={handleSubmit(submit)}
              containerStyles={`w-full mt-7`}
              isLoading={isLoading}
            />
            {errors.root?.signup && <ErrorMessage message={errors.root.signup.message ?? ''} />}
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
