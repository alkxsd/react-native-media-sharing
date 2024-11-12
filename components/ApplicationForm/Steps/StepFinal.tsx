import { View, Text, Image } from 'react-native';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useUserStore } from '@/stores/userStore';
import { ApplicationData } from '@/interfaces/userInterfaces';
import { uploadIDToFirebaseStorage, updateUserFirestoreDocument } from '@/services/firebaseService';
import useAlert from '@/hooks/useAlert';

type Props = {};

const StepFinal = forwardRef((props: Props, ref) => {
  const updateApplicationData = useUserStore((state) => state.updateApplicationData);
  const userAuthId = useUserStore((state) => state.userAuthId)
  const applicationData = useUserStore((state) => state.applicationData);
  const { showAlert } = useAlert(); // Initialize the hook

  useImperativeHandle(ref, () => ({
    submit: () => {
      return new Promise<boolean>(async (resolve) => {
        try {
          if (applicationData.idFilePath) {
            const downloadURL = await uploadIDToFirebaseStorage(applicationData.idFilePath);
            if (downloadURL) {
              const updatedApplicationData = {
                ...applicationData,
                idFilePath: downloadURL,
                applicationStatus: 'submitted' as ApplicationData['applicationStatus']
              };

              const isFirestoreUpdated = await updateUserFirestoreDocument(userAuthId!, updatedApplicationData);

              if (isFirestoreUpdated) {
                updateApplicationData(updatedApplicationData);
                showAlert('Application submitted successfully!', 'success');
                resolve(true);
              } else {
                showAlert('Failed to update application data.', 'error');
                resolve(false);
              }
            } else {
              showAlert("Failed to upload ID", 'error');
              resolve(false);
            }
          } else {
            showAlert("No ID selected", 'error');
            resolve(false);
          }
        } catch (error: any) {
          showAlert(error.message, 'error');
          resolve(false);
        }
      });
    }
  }));

  return (
    <View className="flex flex-col gap-4">
      <Text className="text-lg text-white">
        Review and confirm your application details before submitting.
      </Text>

      <View className="bg-white rounded-lg p-4">
        <Text className="font-bold">Personal Details</Text>
        <Text>Name: {applicationData.firstName} {applicationData.lastName}</Text>
        <Text>Gender: {applicationData.gender}</Text>
        {/* ... display other details ... */}

        <Text className="font-bold mt-4">Address</Text>
        <Text>Address Line 1: {applicationData.address.address_line1}</Text>
        {/* ... display other address details ... */}

        <Text className="font-bold mt-4">Employment</Text>
        <Text>Company Name: {applicationData.employment.companyName}</Text>
        {/* ... display other employment details ... */}

        <Text className="font-bold mt-4">ID Information</Text>
        <Text>ID Type: {applicationData.idType}</Text>
        <Text>ID Number: {applicationData.idNumber}</Text>

        {applicationData.idFilePath && (
          <Image
            source={{ uri: applicationData.idFilePath }}
            style={{ width: 200, height: 200, marginTop: 10 }}
          />
        )}
      </View>
    </View>
  );
});

export default StepFinal;