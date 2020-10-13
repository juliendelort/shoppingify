import React from 'react';
import { useCurrentList } from '../firebase/dataAccess/listDataAccess';
import { List } from '../model/list';

export interface CurrentListState {
    currentList?: List;
    loading: boolean;
    error: string | null;
};

const initialState: CurrentListState = {
    loading: false,
    error: null
};

const CurrentListContext = React.createContext<CurrentListState>(initialState);

// This fetches the current list and puts it in Context. Allows fetching only once and reusing the value
// inside the app/
export const CurrentListProvider: React.FunctionComponent = ({ children }) => {
    const currentState = useCurrentList();

    return (
        <CurrentListContext.Provider value={currentState} >
            {children}
        </CurrentListContext.Provider>
    );
}

export const useCurrentListState = () => {
    return React.useContext(CurrentListContext);
}