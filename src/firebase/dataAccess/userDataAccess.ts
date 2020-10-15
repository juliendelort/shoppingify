import React from 'react';
import Firebase from 'firebase/app';
import firebase from 'firebase';
import { userFromFirebase } from '../transformer/userTransformer';
import { User } from '../../model/user';
import { firebaseAuthUI } from '../firebase';

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
        firebase.auth().onAuthStateChanged((user: Firebase.User | null) => {
            setCurrentUser(userFromFirebase(user));
            setLoading(false);
        });
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