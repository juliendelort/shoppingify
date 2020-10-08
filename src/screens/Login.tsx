import React from 'react';
import styled from 'styled-components';

declare var fbui: any;
declare var firebase: any;


const Title = styled.h1`
    text-align: center;
`;

const Login = () => {

    React.useEffect(() => {

        fbui.start('#firebaseui-auth-container', {
            signInOptions: [
                // List of OAuth providers supported.
                firebase.auth.GoogleAuthProvider.PROVIDER_ID
            ],
            // Other config options...
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