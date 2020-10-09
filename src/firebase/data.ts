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
    }, []);
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
