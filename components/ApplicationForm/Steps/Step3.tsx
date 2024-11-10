// components/Steps/Step3.tsx
import { View, Text } from 'react-native'
import React, { forwardRef, useImperativeHandle } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUserStore } from '@/stores/userStore'
import { ApplicationData, Employment } from '@/interfaces/userInterfaces'
import CustomTextInput from '@/components/Forms/CustomTextInput'
import ErrorMessage from '@/components/Forms/ErrorMessage'

type Props = {}

const formSchema = z.object({
  companyName: z.string().min(2, 'Company Name is required'),
  contact: z.string().min(2, 'Company Contact is required'),
  designation: z.string().min(2, 'Designation is required'),
  position: z.string().min(2, 'Position is required'),
  location: z.string().min(2, 'Location is required'),
});

export type formData = z.infer<typeof formSchema>

const Step3 = forwardRef((props: Props, ref) => {
  const updateApplicationData = useUserStore((state) => state.updateApplicationData)
  const applicationData = useUserStore((state) => state.applicationData)

  const { control, handleSubmit, formState: { errors } } = useForm<formData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...applicationData.employment,
    }
  });

  useImperativeHandle(ref, () => ({
    submit: () => {
      return new Promise((resolve) => {
        handleSubmit((data: formData) => {
          const updatedData: Partial<ApplicationData> = {
            employment: { ...data }
          };
          updateApplicationData(updatedData);
          resolve(true);
        }, (errors: any) => {
          resolve(false);
        })();
      });
    }
  }));


  return (
    <View className='flex flex-col gap-4'>
      <CustomTextInput
        name="companyName"
        control={control}
        title="Company Name"
        placeholder="Enter your company name"
      />
      {errors.companyName && <ErrorMessage message={errors.companyName.message ?? ''} />}

      <CustomTextInput
        name="contact"
        control={control}
        title="Company Contact"
        placeholder="Enter company contact"
      />
      {errors.contact && <ErrorMessage message={errors.contact.message ?? ''} />}

      <CustomTextInput
        name="designation"
        control={control}
        title="Designation"
        placeholder="Enter your designation"
      />
      {errors.designation && <ErrorMessage message={errors.designation.message ?? ''} />}

      <CustomTextInput
        name="position"
        control={control}
        title="Position"
        placeholder="Enter your position"
      />
      {errors.position && <ErrorMessage message={errors.position.message ?? ''} />}

      <CustomTextInput
        name="location"
        control={control}
        title="Location"
        placeholder="Enter your location"
      />
      {errors.location && <ErrorMessage message={errors.location.message ?? ''} />}
    </View>
  )
})

export default Step3