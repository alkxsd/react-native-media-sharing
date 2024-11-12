import { View, Text, ScrollView } from 'react-native'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUserStore } from '@/stores/userStore'
import { ApplicationData } from '@/interfaces/userInterfaces'
import ErrorMessage from '@/components/Forms/ErrorMessage'
import { GooglePlacesAutocomplete, GooglePlaceData, GooglePlaceDetail, PlaceType } from 'react-native-google-places-autocomplete'
import CustomTextInput from '@/components/Forms/CustomTextInput'
import { AppColors } from '@/constants/AppColors'
import { count } from 'firebase/firestore'

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
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<formData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...applicationData.address,
    }
  })
  const [address, setAddress] = useState<any>(null);

  useImperativeHandle(ref, () => ({
    submit: () => {
      return new Promise((resolve) => {
        handleSubmit((data: formData) => {
          const updatedData: Partial<ApplicationData> = {
            address: { ...data }
          };
          updateApplicationData(updatedData);
          resolve(true);
        }, (errors: any) => {
          resolve(false);
        })();
      });
    }
  }));

  const handleAddressSelect = (data: GooglePlaceData, details: GooglePlaceDetail | null) => {
    if (details) {
      const addressComponents = details.address_components;

      // Define a helper to safely extract a component by type
      const getAddressComponent = (type: PlaceType) => {
        const component = addressComponents?.find((comp) => comp.types.includes(type as PlaceType));
        return component ? component.long_name : '';
      };
      // Update form fields based on Google Places data
      setValue('address_line1', `${getAddressComponent('route')} ${getAddressComponent('street_number')}`.trim());
      setValue('barangay', getAddressComponent('sublocality_level_1'));
      setValue('city', getAddressComponent('locality'));
      setValue('state', getAddressComponent('administrative_area_level_1'));
      setValue('zip', getAddressComponent('postal_code'));
      setValue('country', getAddressComponent('country'));
    }
  };

  return (
    <View className='flex flex-col gap-4'>
      <ScrollView
        contentContainerStyle={{flex: 1}}
        keyboardShouldPersistTaps="handled"
        horizontal={true}
        className='mb-8'
      >
        <View className='flex-1 w-full'>
          <GooglePlacesAutocomplete
            placeholder='Search your address'
            onPress={(data, details = null) => handleAddressSelect(data, details)}
            onFail={error => console.log(error)}
            onNotFound={() => console.log('no results')}
            query={{
              key: process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY, // Replace with your actual Google Maps API key
              language: 'en',
              components: 'country:ph',
            }}
            currentLocation={false}
            currentLocationLabel="Current location"
            styles={googlePlaceStyles}
            fetchDetails={true}
          />
        </View>
      </ScrollView>
      <CustomTextInput
        name="address_line1"
        control={control}
        title="Address Line 1"
        placeholder="Enter your house/building number, street"
      />
      {errors.address_line1 && <ErrorMessage message={errors.address_line1.message ?? ''} />}


      <CustomTextInput
        name="address_line2"
        control={control}
        title="Address Line 2"
        placeholder="Enter your address line 2 (optional)"
      />
      {errors.address_line2 && <ErrorMessage message={errors.address_line2.message ?? ''} />}

      {/* You might not need these separate fields if you're extracting them from Google Places */}
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
        disabled={true}
      />
      {errors.country && <ErrorMessage message={errors.country.message ?? ''} />}

    </View>
  )
})

const googlePlaceStyles = {
  textInputContainer: {
    width: '100%',
    backgroundColor: 'transparent',
    borderRadius: 15, // Add border radius
    paddingHorizontal: 10, // Add horizontal padding
    borderWidth: 1, // Add border width
    borderColor: AppColors.secondary[100], // Add bor
  },
  textInput: {
    color: AppColors.secondary[100],
    backgroundColor: 'transparent',
    height: 50,
    fontWeight: 'bold'
  },
  listView: {
    borderWidth: 1, // Add border width
    borderColor: AppColors.secondary[100],
    borderRadius: 15, // Add border radius
    marginTop: 10,
  },
  row: {
    backgroundColor: 'transparent',
    padding: 13,
    height: 44,
    flexDirection: 'row',
  },
  separator: {
    height: 1,
    backgroundColor: AppColors.secondary[100],
  },
  poweredContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 1,
    borderTopColor:  AppColors.secondary[100],
  }
}

export default Step2