import React from 'react';
import styled from 'styled-components';
import * as firebaseui from 'firebaseui';
import firebase from 'firebase';
import { FireBaseUIContext } from '..';

// declare var fbui: any;
// declare var firebase: any;


const Title = styled.h1`
    text-align: center;
`;

// const fbui = new firebaseui.auth.AuthUI(firebase.auth());

const Login = () => {
    const loginUI = React.useContext(FireBaseUIContext);
    React.useEffect(() => {
        if (loginUI) {
            loginUI.start('#firebaseui-auth-container', {
                signInOptions: [
                    // List of OAuth providers supported.
                    firebase.auth.GoogleAuthProvider.PROVIDER_ID
                ],
                // Other config options...
            });
        }
    }, [loginUI]);

    return (
        <>
            <Title>Welcome to Shoppingify!</Title>
            <div id='firebaseui-auth-container' />

        </>
    )

}


export default Login;