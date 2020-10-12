import React from 'react';
import Firebase from 'firebase/app';
import firebase from 'firebase';
import { Item } from '../model/item';
import { firebaseAuthUI, firestoreDB } from './firebase';
import { List } from '../model/list';
import { map } from 'lodash';

type DocumentSnapshot = Firebase.firestore.QueryDocumentSnapshot<Firebase.firestore.DocumentData>;
type Snapshot = Firebase.firestore.QuerySnapshot<Firebase.firestore.DocumentData>;
type Query = Firebase.firestore.Query<Firebase.firestore.DocumentData>;

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

const itemFromFirebase = (i: DocumentSnapshot) => ({
    id: i.id,
    name: i.data().name,
    note: i.data().note,
    category: i.data().category,
    imgurl: i.data().imgurl,
    userid: i.data().userid
});

const listFromFirebase = async (l: DocumentSnapshot) => {
    const list: List = {
        id: l.id,
        name: l.data().name,
        status: l.data().status,
        items: {}
    };

    await Promise.all(map(l.data().items, async ({ item, count }, itemId) => {
        list.items[itemId] = {
            item: itemFromFirebase(await item.get()),
            count
        }
    }));

    return list;
}


const useUserDataQuery = <T>(query: Query, getDataFromSnapshot: (snapshot: Snapshot) => T[]) => {
    const [data, setData] = React.useState<T[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    const currentUser = useCurrentUser();


    React.useEffect(() => {
        // Set loading for first fetch
        try {
            const setupListener = async () => {
                query
                    .where('userid', '==', currentUser?.uid)
                    .onSnapshot(function (snapshot) {
                        try {
                            setData(getDataFromSnapshot(snapshot));
                        } finally {
                            setLoading(false);
                        }
                    }, function (error) {
                        setError(error.message);
                        setLoading(false);
                    });
            };
            if (currentUser) {
                setupListener();

            }
        } catch (e) {
            const error = e as Firebase.FirebaseError;
            setError(error.message);
            setLoading(false);
        }
    }, [currentUser, query, getDataFromSnapshot]);

    return { data, loading, error };
}
export const useItems = () => {
    const query = firestoreDB.collection('items')
        .where('deleted', '==', false);

    const { data, loading, error } = useUserDataQuery<Item>(query, (snapshot) => {
        const items: Item[] = [];
        snapshot.forEach((i) => {
            items.push(itemFromFirebase(i))
        });

        return items;
    });

    return { items: data, loading, error };
}

export const useCurrentList = () => {
    const [resolvedCurrentList, setResolvedCurrentList] = React.useState<List>();
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    const query = firestoreDB.collection('lists')
        .where('status', 'in', ['editing', 'completing']);

    const { error: initialFetchError } = useUserDataQuery<List>(query, (snapshot) => {
        const docs: DocumentSnapshot[] = [];
        snapshot.forEach(async (d) => {
            docs.push(d);
        });

        // We should only have one list. Transform it and fetch details
        if (docs.length > 0) {
            listFromFirebase(docs[0])
                .then((resolvedCurrentList: List) => setResolvedCurrentList(resolvedCurrentList))
                .catch((e) => {
                    const error = e as Firebase.FirebaseError;
                    setError(error.message);
                })
                .finally(() => setLoading(false))
        }
        // Not used
        return [];
    });

    return { currentList: resolvedCurrentList, loading: loading, error: initialFetchError || error };
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
                userid: currentUser?.uid,
                deleted: false
            });
        } catch (e) {
            const error = e as Firebase.FirebaseError;
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { addItem, loading, error };
}

export const useAddToList = () => {
    const [itemBeingAdded, setItemBeingAdded] = React.useState<string | null>(null);
    const [error, setError] = React.useState<string | null>(null);

    const addToList = async (listId: string, itemId: string) => {
        setItemBeingAdded(itemId);
        setError(null);
        try {
            await firestoreDB.collection('lists').doc(listId).update({
                [`items.${itemId}.item`]: firestoreDB.collection('items').doc(itemId),
                [`items.${itemId}.count`]: firebase.firestore.FieldValue.increment(1)
            });
        } catch (e) {
            const error = e as Firebase.FirebaseError;
            setError(error.message);
        } finally {
            setItemBeingAdded(null);
        }
    };

    return { addToList, itemBeingAdded, error };

}
