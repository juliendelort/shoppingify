import React from 'react';
import Firebase from 'firebase/app';
import firebase from 'firebase';
import { userFromFirebase } from '../transformer/userTransformer';
import { User } from '../../model/user';
import { firebaseAuthUI } from '../firebase';

const DEMO_EMAIL = 'test@shoppingify.com';
const DEMO_PASSWORD = 'test12345';

/**
 * Hook to get current user. This listens and gets notified when current user has changed (login, logout)
 * @returns object { 
 *      currentUser: the current user or null if not authenticated
 *      loading: true if initial loading, false otherwise
 * }
 */
export const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = React.useState<User | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user: Firebase.User | null) => {
            setCurrentUser(userFromFirebase(user));
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { currentUser, loading };
}

/**
 * Hook to display generic firebase login ui
 * @param id: id of DOM element in which the login UI should be rendered
 */
export const useLoginUI = (id: string) => {
    React.useEffect(() => {
        firebaseAuthUI.start(id, {
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID
            ]
        });
    }, [id]);
}

export const signOut = () => {
    firebase.auth().signOut();
}

export const useDemoSignIn = () => {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const isMountedRef = React.useRef<boolean | null>(null);

    // Check if the component is still mounted
    React.useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false
        };
    });


    const demoSignIn = async () => {
        setLoading(true);
        try {
            await firebase.auth().signInWithEmailAndPassword(DEMO_EMAIL, DEMO_PASSWORD);
        } catch (error) {
            setError(error.message);
        } finally {
            // Do not update state if component is not mounted anymore
            if (isMountedRef.current) {
                setLoading(false);
            }
        }
    }

    return { demoSignIn, loading, error };
}