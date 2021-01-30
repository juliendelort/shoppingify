import { Item } from "./item";


export type ItemAndCount = { item: Item, count: number };
export type ListStatus = 'editing' | 'completing' | 'completed' | 'cancelled';

export interface List {
    id: string;
    name: string;
    status: ListStatus;
    items: { [itemId: string]: ItemAndCount };
}