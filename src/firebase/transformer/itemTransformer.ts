import { DocumentSnapshot } from "../dataAccess/tools";

/**
 * Transforms firebase document snapshot into Item
 * @param snapshot snapshot to transform
 */
export const itemFromFirebase = (snapshot: DocumentSnapshot) => ({
    id: snapshot.id,
    name: snapshot.data().name,
    note: snapshot.data().note,
    category: snapshot.data().category,
    imgurl: snapshot.data().imgurl,
    userid: snapshot.data().userid
});