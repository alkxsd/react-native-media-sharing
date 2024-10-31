import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserInfo
} from 'firebase/auth'
import { FIREBASE_AUTH, FIREBASE_DB } from '@/FirebaseConfig'
import { getFirebaseErrorMessage } from './firebaseHelpers';
import { signUpUserInterface } from '@/interfaces/userInterfaces';
import { addDoc, collection } from "firebase/firestore";
import { initialUserState } from '@/stores/userStore';

// Todo: implement Google Login

export const signInUser = async (email: string, password: string) => {
  try {
    console.log(email, password)
    const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
    const userRef = userCredential.user
    return userRef
  } catch (error: any) {
    console.log('test', error)
    // Handle Firebase errors (e.g., throw a custom error with a user-friendly message)
    throw new Error(getFirebaseErrorMessage(error.code))
  }
};

export const signUpUser = async ( user: signUpUserInterface ) => {

  try {
    const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, user.email, user.password)
    const userRef: UserInfo = userCredential.user

    // Create the user's Firestore document with the updated application data
    await createUserFirestoreCollection(userRef, user);

    return userRef
  } catch (error: any) {
    throw new Error(getFirebaseErrorMessage(error.code))
  }
}

export const createUserFirestoreCollection = async (userAuthInfo: UserInfo, user: signUpUserInterface) => {
  try {
    const usersCollection = collection(FIREBASE_DB, 'users') // Get the users collection
    const userAppData = initialUserState.applicationData // initial user collection

    userAppData.firstName = user.firstName
    userAppData.lastName = user.lastName

    console.log('collection to add', {   userAuthId: userAuthInfo.uid, userAppData})
    // Create a new document with an auto-generated ID
    const docRef = await addDoc(usersCollection, {
      userAuthId: userAuthInfo.uid, // Include userAuthId
      ...userAppData,
    });

    console.log('Document written with ID: ', docRef.id);
  } catch (error) {
    console.error('Error creating user collection:', error);
    throw new Error('Failed to create user data. Please try again later.');
  }
};