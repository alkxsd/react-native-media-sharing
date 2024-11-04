import { View, Text, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import useFormStore from '@/stores/formStore'
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import CustomButton from '../CustomButton';

type Props = {}


const ApplicationForm = (props: Props) => {
  const currentStep = useFormStore((state) => state.currentStep)
  const setNextStep = useFormStore((state) => state.setNextStep)
  const setPrevStep = useFormStore((state) => state.setPrevStep)

  const stepRefs = useRef<Record<number, { submit: () => Promise<any> } | null>>({});

  const createStepRef = (stepId: number) => (ref: any) => {
    if (ref) {
      stepRefs.current[stepId] = { submit: ref.submit };
    }
  };

  const steps = [
    { id: 1, component: <Step1 ref={createStepRef(1)} /> },
    { id: 2, component: <Step2 ref={createStepRef(2)} /> },
    // ... other steps
  ];

  const totalSteps = steps.length;

  const handleNext = async () => {
    try {
      // Validate and get data from the current step
      await stepRefs.current[currentStep]?.submit();

      // setNextStep()
    } catch (error) {
      console.error("Error submitting step:", error);
      // Handle the error, e.g., show an error message to the user
    }
  }

  const handlePrev = () => {
    setPrevStep()
  }


  const renderStep = () => {
    const currentStepData = steps.find((step) => step.id === currentStep);
    return currentStepData ? currentStepData.component : null;
  };
  return (
    <View className="flex flex-col gap-6 w-full px-4">
      {/* Progress Indicator */}
      <View className="flex justify-between mt-4 w-full flex-row">
        {steps.map((step) => (
          <View
            key={step.id}
            className={`w-1/${totalSteps} h-1 ${currentStep >= step.id ? 'bg-accent-100' : 'bg-primary-200'}`}
          />
        ))}
      </View>

      {/* Render the current step's component */}
      {renderStep()}

      {/* Navigation buttons */}
      <View className="flex justify-between flex-row gap-2 w-full">
        <CustomButton
          title="Previous"
          handlePress={handlePrev}
          containerStyles={`flex-1 bg-secondary-100 hover:bg-gray-400 ${currentStep === 1 ? 'opacity-50' : ''}`}
          disabled={currentStep === 1}
        />
        <CustomButton
          title="Next"
          handlePress={handleNext}
          containerStyles={`flex-1 bg-secondary-100 ${currentStep === totalSteps ? 'opacity-50' : ''}`}
          textStyles="text-white"
          disabled={currentStep === totalSteps}
        />
      </View>
    </View>
  )
}

export default ApplicationForm