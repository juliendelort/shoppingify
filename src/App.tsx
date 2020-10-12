import React from 'react';
import styled from 'styled-components';
import Login from './screens/Login';

import { useCurrentUser } from './firebase/data';
import ReactTooltip from 'react-tooltip';
import RightBar from './components/RightBar';
import { CurrentListProvider } from './context/currentList';
import Footer from './components/Footer';
import LeftBar from './components/LeftBar';
import TabContent from './components/TabContent';


const AppContainer = styled.div`
  display: flex;
`;


const Loading = styled.p`
  transform: translate(-50%, -50%);
  display: inline;
  position: fixed;
  left: 50%;
  top: 50%;
`;

const LoginPage = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;


function App() {
  const currentUser = useCurrentUser();
  const [rightBarOpen, setRightBarOpen] = React.useState(false);

  const handleToggleBar = React.useCallback(() => {
    setRightBarOpen(open => !open);
  }, [setRightBarOpen]);

  if (currentUser === undefined) {
    return (
      <Loading>Loading...</Loading>
    );
  }
  return (
    <>
      {currentUser ? (
        <CurrentListProvider>
          <AppContainer>
            <LeftBar onToggleBar={handleToggleBar} />
            <TabContent rightBarOpen={rightBarOpen} />
            <RightBar isOpen={rightBarOpen} />
            <ReactTooltip place='top' type='dark' effect='solid' />
          </AppContainer>
        </CurrentListProvider>
      ) : (
          <LoginPage >
            <Login />
            <Footer />
          </LoginPage>
        )}

    </>);

}

export default App;
