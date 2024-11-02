import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserInfo
} from 'firebase/auth'
import { FIREBASE_AUTH, FIREBASE_DB } from '@/FirebaseConfig'
import { SignUpUserInterface, UserInterface } from '@/interfaces/userInterfaces';
import { addDoc,  query, where, getDocs, collection } from "firebase/firestore";
import { InitialApplicationData } from '@/interfaces/userInterfaces';

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

export const signUpUser = async ( user: SignUpUserInterface ) => {

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

export const createUserFirestoreCollection = async (userAuthInfo: UserInfo, user: SignUpUserInterface) => {
  try {
    const usersCollection = collection(FIREBASE_DB, 'users') // Get the users collection
    const userAppData = InitialApplicationData // initial user collection

    userAppData.firstName = user.firstName
    userAppData.lastName = user.lastName

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



export const getFirebaseErrorMessage = (errorCode: string) => {
  switch (errorCode) {
    case 'auth/invalid-credential':
      return 'Incorrect email or password!';
    case 'auth/invalid-email':
      return 'Invalid email address.';
    case 'auth/email-already-in-use':
      return 'Email already in use.';
    // ... add more cases for other Firebase error codes as needed
    default:
      console.log('errocode', errorCode);
      return 'Unable to sign in. Please try again later.';
  }
}

export const fetchUserDataFromFirestore = async (
  userAuthId: string
): Promise<UserInterface['applicationData']> => {
  try {
    const usersCollection = collection(FIREBASE_DB, 'users');
    const q = query(usersCollection, where('userAuthId', '==', userAuthId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docSnap = querySnapshot.docs[0];
      const userData = docSnap.data() as UserInterface['applicationData'];
      return userData;
    } else {
      console.log('No document found with the given userAuthId:', userAuthId);
      throw new Error('User data not found.');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};