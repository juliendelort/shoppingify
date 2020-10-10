import { Item } from "./item";

export interface List {
    id: string;
    name: string;
    status: 'editing' | 'completing' | 'completed' | 'cancelled';
    items: Item[];
}