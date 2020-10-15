import React from "react";
import Firebase from 'firebase/app';
import { useCurrentUserState } from "../../context/currentUser";

export type Snapshot = Firebase.firestore.QuerySnapshot<Firebase.firestore.DocumentData>;
export type Query = Firebase.firestore.Query<Firebase.firestore.DocumentData>;
export type DocumentSnapshot = Firebase.firestore.QueryDocumentSnapshot<Firebase.firestore.DocumentData>;

/**
 * Hook to fetch data from firebase with a specific query
 * @param query Query to execute
 * @param getDataFromSnapshot : transform function to transform the result snapshot into desired model
 */
export const useUserDataQuery = <T>(query: Query, getDataFromSnapshot: (snapshot: Snapshot) => T[]) => {
    const [data, setData] = React.useState<T[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    const { currentUser } = useCurrentUserState();


    React.useEffect(() => {
        // Set loading for first fetch
        try {

            const setupListener = () => {
                return query
                    .where('userid', '==', currentUser?.id)
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
                const unsubscribe = setupListener();
                return () => unsubscribe();

            }
        } catch (e) {
            const error = e as Firebase.FirebaseError;
            setError(error.message);
            setLoading(false);
        }
    }, [currentUser, query, getDataFromSnapshot]);

    return { data, loading, error };
}