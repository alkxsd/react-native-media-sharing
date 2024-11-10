import { View } from 'react-native'
import React, { useRef } from 'react'
import useFormStore from '@/stores/formStore'
import CustomButton from '../CustomButton';
import { useUserStore } from '@/stores/userStore';
import useAlert from '@/hooks/useAlert';

type Props = {
  steps: { id: number; component: JSX.Element }[];
};

const ApplicationForm = (props: Props) => {
  const { steps } = props;
  const currentStep = useFormStore((state) => state.currentStep)
  const setNextStep = useFormStore((state) => state.setNextStep)
  const setPrevStep = useFormStore((state) => state.setPrevStep)
  const setIsUserLoading = useUserStore((state) => state.setIsUserLoading)
  const { showAlert } = useAlert();

  const stepRefs = useRef<Record<number, { submit: () => Promise<any> } | null>>({});

  const createStepRef = (stepId: number) => (ref: any) => {
    if (ref) {
      stepRefs.current[stepId] = { submit: ref.submit };
    }
  };

  const totalSteps = steps.length;

  const handleNext = async () => {
    setIsUserLoading(true);
    try {
      const isValid = await stepRefs.current[currentStep]?.submit();
      if (isValid) {
        setIsUserLoading(false);
        setNextStep()
      } else {
        showAlert('Pleas complete the form', 'error')
      }
    } catch (error: any) {
      showAlert('Something went wrong', 'error', error.message)
    }
    setIsUserLoading(false);
  }

  const handleFinish = async () => {
    try {
      const isValid = await stepRefs.current[currentStep]?.submit();
      if (isValid) {
        console.log('FINISH SUBMITTED');
        // Here you can handle the final submission logic,
        // e.g., send data to the server
      } else {
        console.error("Validation failed on current step");
      }
    } catch (error) {
      console.error("Error submitting step:", error);
    }
  }

  const handlePrev = () => {
    setPrevStep()
  }

  const renderStep = () => {
    const currentStepData = steps.find((step) => step.id === currentStep);
    const stepWithRef = React.cloneElement(currentStepData?.component || <></>, {
      ref: createStepRef(currentStep),
    });
    return stepWithRef;
  };

  return (
    <View className="flex flex-col gap-6 w-full px-4 mt-8">
      {renderStep()}

      <View className="flex justify-between flex-row gap-2 w-full">
        <CustomButton
          title="Previous"
          handlePress={handlePrev}
          containerStyles={`flex-1 bg-secondary-100 hover:bg-gray-400 ${currentStep === 1 ? 'opacity-50' : ''}`}
          disabled={currentStep === 1}
        />
        {currentStep !== totalSteps
          ? <CustomButton
            title="Next"
            handlePress={handleNext}
            containerStyles={`flex-1 bg-secondary-100 ${currentStep === totalSteps ? 'opacity-50' : ''}`}
            textStyles="text-white"
          />
          : <CustomButton
            title="FINISH"
            handlePress={handleFinish}
            containerStyles={`flex-1 bg-secondary-100`}
            textStyles="text-white"
          />
        }
      </View>
    </View>
  )
}

export default ApplicationForm