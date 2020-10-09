import React from 'react';
import Firebase from 'firebase/app';
import firebase from 'firebase';
import { Item } from '../model/items';
import { firestoreDB } from './firebase';

export const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = React.useState<Firebase.User | null>();

    React.useEffect(() => {
        firebase.auth().onAuthStateChanged((user: Firebase.User | null) => setCurrentUser(user));
    }, []);

    return currentUser;
}

export const useItems: () => Item[] = () => {
    const [items, setItems] = React.useState<Item[]>([]);

    React.useEffect(() => {

        const setupListener = async () => {
            firestoreDB.collection('items').onSnapshot(function (snapshot) {
                const items: Item[] = [];
                snapshot.forEach((i) => {
                    items.push({
                        id: i.id,
                        name: i.data().name,
                        note: i.data().note,
                        category: i.data().category,
                        imgurl: i.data().imgurl
                    })
                })
                setItems(items);
            });
        };

        setupListener();
    }, []);

    return items;
}
