import React from 'react';
import styled from 'styled-components';
import { useLoginUI } from '../firebase/dataAccess/userDataAccess';

const Container = styled.div`
    flex: 1;
`;
const Title = styled.h1`
    text-align: center;
`;

const Login: React.FunctionComponent = () => {
    useLoginUI('#firebaseui-auth-container');

    return (
        <Container>
            <Title>Welcome to Shoppingify!</Title>
            <div id='firebaseui-auth-container' />
        </Container>
    )

}


export default Login;