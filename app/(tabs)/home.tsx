// Home.tsx
import { SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, View, Text } from 'react-native'
import React from 'react'
import useFormStore from '@/stores/formStore';
import ApplicationForm from '@/components/ApplicationForm'
import Step1 from '@/components/ApplicationForm/Steps/Step1';
import Step2 from '@/components/ApplicationForm/Steps/Step2';
import Step3 from '@/components/ApplicationForm/Steps/Step3';
import Step4 from '@/components/ApplicationForm/Steps/Step4';
import StepFinal from '@/components/ApplicationForm/Steps/StepFinal';
import { useUserStore } from '@/stores/userStore';
import { Ionicons } from '@expo/vector-icons';

type Props = {}

const Home = (props: Props) => {
  const currentStep = useFormStore((state) => state.currentStep);

  const applicationData = useUserStore((state) => state.applicationData)

  const applicationStatus = applicationData.applicationStatus

  const steps = [
    { id: 1, title: 'Personal Details', component: <Step1 /> },
    { id: 2, title: 'Your Address', component: <Step2 /> },
    { id: 3, title: 'Current Employment', component: <Step3 /> },
    { id: 4, title: 'Upload I.D', component: <Step4 /> }, // Include Step4
    { id: 5, title: 'Submit your Application', component: <StepFinal /> },
  ];

  const totalSteps = steps.length;

  const currentStepData = steps.find((step) => step.id === currentStep);

  return (
    <SafeAreaView className='bg-primary h-full'>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View className="flex flex-col h-full">
          <View
            className='flex flex-col gap-2'
          >
            <Text
              className='text-2xl font-psemibold text-secondary-100 px-4'
            >{applicationStatus !== 'submitted' ? currentStepData?.title : 'Hi ' + applicationData.firstName + '!'}

            </Text>
            <View className="z-50 flex justify-between w-full flex-row">
              {steps.map((step) => (
                <View
                  key={step.id}
                  style={{ width: `${applicationStatus !== 'submitted' ? 100 / totalSteps : 100}%` }}
                  className={`h-2 ${currentStep >= step.id ? 'bg-accent-100' : 'bg-primary-200'}`}
                />
              ))}
            </View>
          </View>
          {applicationStatus !== 'submitted' ? (
            <ScrollView className="flex-1">
              <ApplicationForm steps={steps} />
            </ScrollView>
          ) : (
            <View className="flex-1 flex justify-center items-center">
              <Ionicons name="checkmark-circle" size={80} color="green" />
              <Text className="text-2xl font-bold text-secondary-100 mt-4 text-center">
                Thank you for submitting your application!
              </Text>
              <Text className="text-lg text-secondary-200 mt-2">
                Your application is awaiting for approval.
              </Text>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Home