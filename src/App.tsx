import React from 'react';
import IconButton from './components/IconButton';
import styled from 'styled-components';
import Login from './screens/Login';
import Firebase from 'firebase/app';
import * as firebase from 'firebase';

const AppContainer = styled.div`
  display: flex;
`;

const LeftBar = styled.div`
  position: fixed;
  width: 95px;
  left: 0px;
  top: 0px;
  bottom: 0px;
  background: #FFFFFF;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const LeftBarButtons = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: auto;
  justify-items: center;
  grid-gap: 70px;
`;

const TabContent = styled.div`
  flex:1;
  height: 100%;
  margin-left: 95px;
`;

const Loading = styled.p`
    transform: translate(-50%, -50%);
    display: inline;
    position: fixed;
    left: 50%;
    top: 50%;
`;

function App() {
  const [currentUser, setCurrentUser] = React.useState<Firebase.User | null>();


  const handleSignout = () => {
    firebase.auth().signOut();
  }

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user: Firebase.User | null) => setCurrentUser(user));
  }, []);

  if (currentUser === undefined) {
    return (
      <Loading>Loading...</Loading>
    );
  }

  return currentUser ? (

    <AppContainer>
      <LeftBar>
        <LeftBarButtons>
          <IconButton src='format_list_bulleted-24px.svg' alt='lists' />
          <IconButton src='replay-24px.svg' alt='history' />

          <IconButton src='insert_chart_outlined-24px.svg' alt='statistics' />
        </LeftBarButtons>
      </LeftBar>
      <TabContent>
        <button onClick={handleSignout}>Sign out</button>
      </TabContent>
    </AppContainer>
  ) : (

      <Login />

    );
}

export default App;
