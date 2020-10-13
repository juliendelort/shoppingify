import React from 'react';
import { useItems } from '../firebase/data';
import { Item } from '../model/item';

export interface ItemsState {
    items: Item[];
};

const initialState: ItemsState = {
    items: []
};

const ItemsContext = React.createContext<ItemsState>(initialState);

// This fetches the current list and puts it in Context. Allows fetching only once and reusing the value
// inside the app/
export const ItemsProvider: React.FunctionComponent = ({ children }) => {
    const currentState = useItems();

    return (
        <ItemsContext.Provider value={currentState} >
            {children}
        </ItemsContext.Provider>
    );
}

export const useItemsState = () => {
    return React.useContext(ItemsContext);
}