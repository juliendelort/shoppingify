import { map } from "lodash";
import { List } from "../../model/list";
import { DocumentSnapshot } from "../dataAccess/tools";
import { itemFromFirebase } from "./itemTransformer";

/**
 * Transforms firebase document snapshot into List
 * @param snapshot snapshot to transform
 */
export const listFromFirebase = async (snapshot: DocumentSnapshot) => {
    const list: List = {
        id: snapshot.id,
        name: snapshot.data().name,
        status: snapshot.data().status,
        items: {}
    };

    await Promise.all(map(snapshot.data().items, async ({ item, count }, itemId) => {
        list.items[itemId] = {
            item: itemFromFirebase(await item.get()),
            count
        }
    }));

    return list;
}
