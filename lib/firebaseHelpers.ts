import { FIREBASE_DB } from "@/FirebaseConfig";
import { UserInterface } from "@/interfaces/userInterfaces";
import { useUserStore } from "@/stores/userStore";
import { doc, getDoc } from "firebase/firestore";

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

export const fetchUserDataFromFirestore = async (userId: string): Promise<UserInterface['applicationData']> => {
  try {
    const userRef = doc(FIREBASE_DB, 'users', userId);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const userData = docSnap.data() as UserInterface['applicationData'];
      return userData;
    } else {
      // Handle the case where the user document doesn't exist
      console.log('No such document!');
      throw new Error('User data not found.'); // Or return default values
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};
