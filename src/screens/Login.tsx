import React from 'react';
import styled from 'styled-components';
import { useLoginUI } from '../firebase/data';


const Title = styled.h1`
    text-align: center;
`;

const Login: React.FunctionComponent = () => {
    useLoginUI('#firebaseui-auth-container');

    return (
        <>
            <Title>Welcome to Shoppingify!</Title>
            <div id='firebaseui-auth-container' />

        </>
    )

}


export default Login;