import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUserStore } from '@/stores/userStore'
import { ApplicationData } from '@/interfaces/userInterfaces'
import CustomTextInput from '@/components/Forms/CustomTextInput'
import ErrorMessage from '@/components/Forms/ErrorMessage'
import CustomDropdown from '@/components/Forms/CustomDropdown'
import * as ImagePicker from 'expo-image-picker';

type Props = {}

const formSchema = z.object({
  idType: z.string().min(2, 'ID Type is required'),
  idNumber: z.string().min(2, 'ID Number is required'),
});

export type formData = z.infer<typeof formSchema>

const Step4 = forwardRef((props: Props, ref) => {
  const updateApplicationData = useUserStore((state) => state.updateApplicationData)
  const applicationData = useUserStore((state) => state.applicationData)
  const [idFilePath, setIdFilePath] = useState(applicationData.idFilePath)

  const { control, handleSubmit, formState: { errors } } = useForm<formData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      idType: applicationData.idType,
      idNumber: applicationData.idNumber,
    }
  })

  useImperativeHandle(ref, () => ({
    submit: () => {
      console.log('Submit')
      return new Promise((resolve) => {
        handleSubmit((data: formData) => {
          console.log('handleSubmit')
          const updatedData: Partial<ApplicationData> = {
            ...data,
            idFilePath: idFilePath,
          };
          updateApplicationData(updatedData);
          resolve(true);
        }, (errors: any) => {
          console.error("Form errors:", errors);
          resolve(false);
        })();
      });
    }
  }));

  const handleDocumentSelection = async () => {
    try {
      // Request media library permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need media library permissions to make this work!');
        return;
      }

      // Show options to choose between camera and library
      // TODO: Use ImagePicker.launchCameraAsync to include camera
      const option = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!option.canceled) {
        setIdFilePath(option.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  return (
    <View className='flex flex-col gap-4'>
      <CustomDropdown
        name="idType"
        control={control}
        title="ID Type"
        options={['Passport', "Driver's License", 'National ID']}
        defaultValue={applicationData.idType}
      />
      {errors.idType && <ErrorMessage message={errors.idType.message ?? ''} />}

      <CustomTextInput
        name="idNumber"
        control={control}
        title="ID Number"
        placeholder="Enter your ID number"
      />
      {errors.idNumber && <ErrorMessage message={errors.idNumber.message ?? ''} />}

      <View>
        <Text className="text-base text-secondary-100 font-pmedium">Upload ID</Text>
        <TouchableOpacity
          className="w-full h-16 bg-primary rounded-2xl border border-accent flex flex-row items-center justify-center"
          onPress={handleDocumentSelection}
        >
          <Text className="text-secondary-100 font-psemibold text-base">{!idFilePath ? 'Upload your ID' : 'Replace uploaded ID'}</Text>

        </TouchableOpacity>

        {idFilePath && (
           <View
            className='w-full mt-2 p-2 rounded-2xl border border-accent flex items-center justify-center'
          >
            <Image source={{ uri: idFilePath }} style={{ width: 200, height: 200 }} resizeMode="contain"/>
          </View>
        )}

      </View>
    </View>
  )
})

export default Step4