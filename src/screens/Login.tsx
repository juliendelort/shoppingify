import React from 'react';
import styled from 'styled-components';
import { useDemoSignIn, useLoginUI } from '../firebase/dataAccess/authDataAccess';

const Container = styled.div`
    flex: 1;
`;
const Title = styled.h1`
    text-align: center;
`;

const DemoButton = styled.button`
    border: none;
    cursor: pointer;
    display: block;
    margin: 0 auto;
    text-decoration: underline;
    background: none;
`;

const Error = styled.p`
    text-align: center;
    color: red;
`;

const Login: React.FunctionComponent = () => {
    const { demoSignIn, loading, error } = useDemoSignIn();
    useLoginUI('#firebaseui-auth-container');

    const handleDemoAccountClicked = () => {
        demoSignIn();
    }

    return (
        <Container>
            <Title>Welcome to Shoppingify!</Title>
            <div id='firebaseui-auth-container' />
            <DemoButton onClick={handleDemoAccountClicked} disabled={loading}>Demo account</DemoButton>
            {error && <Error>{error}</Error>}
        </Container>
    )

}


export default Login;