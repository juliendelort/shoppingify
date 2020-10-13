import Firebase from 'firebase/app';
import { User } from '../../model/user';

/**
 * Transforms firebase user into User
 * @param firebaseUser firebase user to transform
 */
export const userFromFirebase: (firebaseUser: Firebase.User | null) => User | null =
    (firebaseUser: Firebase.User | null) => firebaseUser ? {
        id: firebaseUser.uid,
        displayName: firebaseUser.displayName
    } : firebaseUser;