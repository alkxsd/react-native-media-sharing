import { View, Text } from 'react-native'
import React, { forwardRef, useImperativeHandle } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUserStore } from '@/stores/userStore'
import { ApplicationData } from '@/interfaces/userInterfaces'
import CustomTextInput from '@/components/Forms/CustomTextInput'
import ErrorMessage from '@/components/Forms/ErrorMessage'

type Props = {}

const formSchema = z.object({
  address_line1: z.string().min(2, 'Address Line 1 is required'),
  address_line2: z.string().optional(),
  barangay: z.string().min(2, 'Barangay is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zip: z.string().min(2, 'Zip Code is required'),
  country: z.string().min(2, 'Country is required'),
});

export type formData = z.infer<typeof formSchema>

const Step2 = forwardRef((props: Props, ref) => {
  const updateApplicationData = useUserStore((state) => state.updateApplicationData)
  const applicationData = useUserStore((state) => state.applicationData)

  const { control, handleSubmit, setError, formState: { errors } } = useForm<formData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...applicationData.address, // Use address from applicationData
    }
  })

  useImperativeHandle(ref, () => ({
    submit: async () => {
      await handleSubmit(onSubmit)();
    }
  }));

  const onSubmit = (data: formData) => {
    const updatedData: Partial<ApplicationData> = {
      address: { ...data } // Update the address in applicationData
    };
    updateApplicationData(updatedData);
  };

  return (
    <View className='flex flex-col gap-4'>
      <CustomTextInput
        name="address_line1"
        control={control}
        title="Address Line 1"
        placeholder="Enter your address line 1"
      />
      {errors.address_line1 && <ErrorMessage message={errors.address_line1.message ?? ''} />}

      <CustomTextInput
        name="address_line2"
        control={control}
        title="Address Line 2"
        placeholder="Enter your address line 2"
      />
      {errors.address_line2 && <ErrorMessage message={errors.address_line2.message ?? ''} />}

      <CustomTextInput
        name="barangay"
        control={control}
        title="Barangay"
        placeholder="Enter your barangay"
      />
      {errors.barangay && <ErrorMessage message={errors.barangay.message ?? ''} />}

      <CustomTextInput
        name="city"
        control={control}
        title="City"
        placeholder="Enter your city"
      />
      {errors.city && <ErrorMessage message={errors.city.message ?? ''} />}

      <CustomTextInput
        name="state"
        control={control}
        title="State/Province"
        placeholder="Enter your state/province"
      />
      {errors.state && <ErrorMessage message={errors.state.message ?? ''} />}

      <CustomTextInput
        name="zip"
        control={control}
        title="Zip Code"
        placeholder="Enter your zip code"
      />
      {errors.zip && <ErrorMessage message={errors.zip.message ?? ''} />}

      <CustomTextInput
        name="country"
        control={control}
        title="Country"
        placeholder="Enter your country"
      />
      {errors.country && <ErrorMessage message={errors.country.message ?? ''} />}
    </View>
  )
})

export default Step2