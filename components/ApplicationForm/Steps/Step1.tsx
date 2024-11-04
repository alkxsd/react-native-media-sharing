import { View, Text } from 'react-native'
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUserStore } from '@/stores/userStore'
import { ApplicationData } from '@/interfaces/userInterfaces'
import CustomTextInput from '@/components/Forms/CustomTextInput'
import ErrorMessage from '@/components/Forms/ErrorMessage'
import CustomDropdown from '@/components/Forms/CustomDropdown'
import DateTimePicker from '@react-native-community/datetimepicker'

type Props = {}

const formSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  middleName: z.string().optional(),
  suffixName: z.string().optional(),
  gender: z.enum(['male', 'female', 'other', '']).optional(),
  genderOther: z.string().optional(), // Add genderOther to the schema
  birthDate: z.date().nullable().optional(),
  birthPlace: z.string().optional(),
});

export type formData = z.infer<typeof formSchema>

const Step1 = forwardRef((props: Props, ref) => {
  const updateApplicationData = useUserStore((state) => state.updateApplicationData)
  const applicationData = useUserStore((state) => state.applicationData)

  const [showOtherGenderInput, setShowOtherGenderInput] = useState(applicationData.gender === 'other');

  const { control, handleSubmit, setError, formState: { errors }} = useForm<formData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...applicationData, // Destructure applicationData here
    }
  })

  // Use useImperativeHandle to expose the submit function
  useImperativeHandle(ref, () => ({
    submit: async () => {
      await handleSubmit(onSubmit)();
    }
  }));

  const onSubmit = (data: formData) => {
    const updatedData: Partial<ApplicationData> = {
      firstName: data.firstName,
      lastName: data.lastName,
      middleName: data.middleName || '',
      suffixName: data.suffixName || '',
      gender: data.gender || '',
      genderOther: data.genderOther || '', // I
      birthDate: data.birthDate || null,
      birthPlace: data.birthPlace || '',
    };
    console.log('Saving Step1', updatedData)
    updateApplicationData(updatedData);
  };


  return (
    <View className='flex flex-col gap-4'>
      <CustomTextInput
        name="firstName"
        control={control}
        title="First Name"
        placeholder="Enter your first name"
        otherStyles=""
      />
      {errors.firstName && <ErrorMessage message={errors.firstName.message ?? ''} />}

      <CustomTextInput
        name="lastName"
        control={control}
        title="Last Name"
        placeholder="Enter your last name"
        otherStyles=""
      />
      {errors.lastName && <ErrorMessage message={errors.lastName.message ?? ''} />}

      <CustomDropdown
        name="gender"
        control={control}
        title="Gender"
        options={['male', 'female', 'other']} // Provide the dropdown options
        onSelect={(option) => {
          setShowOtherGenderInput(option === 'other');
        }}
        defaultValue={applicationData.gender}
      />
      {errors.gender && <Text>{errors.gender.message}</Text>}

      {showOtherGenderInput && (
        <CustomTextInput
          name="genderOther"
          control={control}
          title="Please specify your gender"
          placeholder="Enter your gender"
        />
      )}

      <CustomTextInput
        name="birthPlace"
        control={control}
        title="Place of Birth"
        placeholder="Enter your place of birth"
      />
      {errors.birthPlace && <ErrorMessage message={errors.birthPlace.message ?? ''} />}
    </View>
  )
})

export default Step1