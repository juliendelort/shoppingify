import React from 'react';
import Firebase from 'firebase/app';
import firebase from 'firebase';
import { Item } from '../model/items';
import { firebaseAuthUI, firestoreDB } from './firebase';


export const useLoginUI = (id: string) => {
    React.useEffect(() => {
        firebaseAuthUI.start(id, {
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID
            ]
        });
    }, [id]);
}

export const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = React.useState<Firebase.User | null>();

    React.useEffect(() => {
        firebase.auth().onAuthStateChanged((user: Firebase.User | null) => setCurrentUser(user));
    }, []);

    return currentUser;
}

export const useItems: () => Item[] = () => {
    const [items, setItems] = React.useState<Item[]>([]);
    const currentUser = useCurrentUser();

    React.useEffect(() => {

        const setupListener = async () => {
            firestoreDB.collection('items').where('userid', '==', currentUser?.uid).onSnapshot(function (snapshot) {
                const items: Item[] = [];
                snapshot.forEach((i) => {
                    items.push({
                        id: i.id,
                        name: i.data().name,
                        note: i.data().note,
                        category: i.data().category,
                        imgurl: i.data().imgurl,
                        userid: i.data().userid
                    })
                })
                setItems(items);
            });
        };

        if (currentUser) {
            setupListener();

        }
    }, [currentUser]);

    return items;
}

export const useAddItem = () => {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const currentUser = useCurrentUser();

    const addItem = async (item: Partial<Item>) => {
        setLoading(true);
        setError(null);
        try {
            await firestoreDB.collection('items').add({
                ...item,
                userid: currentUser?.uid
            })

        } catch (e) {
            const error = e as Firebase.FirebaseError;
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { addItem, loading, error };

}
