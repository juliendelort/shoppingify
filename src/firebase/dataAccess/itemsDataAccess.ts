import React from 'react';
import { Item } from '../../model/item';
import { itemFromFirebase } from '../transformer/itemTransformer';
import Firebase from 'firebase/app';
import { firestoreDB } from '../firebase';
import { DocumentSnapshot, useUserDataQuery } from './tools';
import { useCurrentUserState } from '../../context/currentUser';

/**
 * Hook to fetch all items. This listens and gets notified when items have changed
 * @returns object { 
 *      items: Fetched items
 *      loading:  true if still fetching, false if fetching done
 *      error: null if no error, or error description (string)
 * }
 */
export const useItems = () => {
    // Must use useMemo here, otherwise we get a new reference everytime and useUserDataQuery would
    // subscribe for every render
    const query = React.useMemo(() => firestoreDB.collection('items')
        .where('deleted', '==', false), []);

    const getDataFromSnapshot = React.useCallback((snapshot) => {
        const items: Item[] = [];
        snapshot.forEach((i: DocumentSnapshot) => {
            items.push(itemFromFirebase(i))
        });

        return items;
    }, []);

    const { data, loading, error } = useUserDataQuery<Item>(query, getDataFromSnapshot);

    return { items: data, loading, error };
}

/**
 * Hook to add a new item
 * @returns object { 
 *      addItem: function (item: Item)=>void that adds item to the backend
 *      loading:  true if still adding, false if adding done
 *      error: null if no error, or error description (string)
 * }
 */
export const useAddItem = () => {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const { currentUser } = useCurrentUserState();

    const addItem = async (item: Partial<Item>) => {
        setLoading(true);
        setError(null);
        try {
            await firestoreDB.collection('items').add({
                ...item,
                userid: currentUser?.id,
                deleted: false
            });
        } catch (e) {
            const error = e as Firebase.FirebaseError;
            setError(error.message);
            throw new Error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { addItem, loading, error };
}
