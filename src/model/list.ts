import { Item } from "./item";


export type ItemAndCount = { item: Item, count: number };

export interface List {
    id: string;
    name: string;
    status: 'editing' | 'completing' | 'completed' | 'cancelled';
    items: { [itemId: string]: ItemAndCount };
}