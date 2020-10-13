import React from 'react';
import firebase from 'firebase';
import { List } from '../../model/list';
import { firestoreDB } from '../firebase';
import { listFromFirebase } from '../transformer/listTransformer';
import { DocumentSnapshot, useUserDataQuery } from './tools';
import Firebase from 'firebase/app';

/**
 * Hooks to fetch the current (active) shopping list. This listens and gets notified when resul have changed
 * @returns object { 
 *      current list: the current list
 *      loading:  true if still fetching, false if fetching done
 *      error: null if no error, or error description (string)
 * }
 */
export const useCurrentList = () => {
    const [resolvedCurrentList, setResolvedCurrentList] = React.useState<List>();
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    const query = React.useMemo(() => firestoreDB.collection('lists').where('status', 'in', ['editing', 'completing']), []);

    const getDataFromSnapshot = React.useCallback((snapshot) => {
        const docs: DocumentSnapshot[] = [];
        snapshot.forEach(async (d: DocumentSnapshot) => {
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
    }, []);

    const { error: initialFetchError } = useUserDataQuery<List>(query, getDataFromSnapshot);

    return { currentList: resolvedCurrentList, loading: loading, error: initialFetchError || error };
}

/**
 * Hook to add an Item to a List in the backend
 * @returns object {
 *    addToList: function (listId, itemId): calls backend and adds item <itemId> to list <listId>
 *    itemBeingAdded: If backend call in progress, itemId of item being added. null if no backend 
 *                    call in progress
 *    error: null if no error, or error description (string)
 * }
 */
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