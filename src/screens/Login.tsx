import React from 'react';
import styled from 'styled-components';
import firebase from 'firebase';
import { firebaseAuthUI } from '../firebase/firebase';


const Title = styled.h1`
    text-align: center;
`;

const Login = () => {
    React.useEffect(() => {
        firebaseAuthUI.start('#firebaseui-auth-container', {
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID
            ]
        });
    }, []);

    return (
        <>
            <Title>Welcome to Shoppingify!</Title>
            <div id='firebaseui-auth-container' />

        </>
    )

}


export default Login;