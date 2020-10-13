import React from 'react';
import { useCurrentUser } from '../firebase/dataAccess/userDataAccess';
import { User } from '../model/user';

export interface CurrentUserState {
    currentUser?: User | null
};

const initialState: CurrentUserState = {
    currentUser: null
};

const CurrentUserContext = React.createContext<CurrentUserState>(initialState);

// This fetches the current list and puts it in Context. Allows fetching only once and reusing the value
// inside the app/
export const CurrentUserProvider: React.FunctionComponent = ({ children }) => {
    const currentState = useCurrentUser();

    return (
        <CurrentUserContext.Provider value={currentState} >
            {children}
        </CurrentUserContext.Provider>
    );
}

export const useCurrentUserState = () => {
    return React.useContext(CurrentUserContext);
}