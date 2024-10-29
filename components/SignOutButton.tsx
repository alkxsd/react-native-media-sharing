import React from 'react';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import CustomButton from './CustomButton';

type Props = {}

const SignOutButton = (props: Props) => {
  return (
      <CustomButton
        title="Sign out"
        handlePress={() => FIREBASE_AUTH.signOut()}
        containerStyles="w-full justify-center items-center"
      />
    )
}

export default SignOutButton