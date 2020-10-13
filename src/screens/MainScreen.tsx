import React from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import Footer from '../components/Footer';
import TabContent from '../components/TabContent';
import LeftBar from '../components/LeftBar/LeftBar';
import RightBar from '../components/RightBar/RightBar';
import { CurrentListProvider } from '../context/currentList';
import { useCurrentUserState } from '../context/currentUser';
import Login from './Login';

export interface MainScreenProps {
}

const MainContainer = styled.div`
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

const MainScreen: React.FunctionComponent<MainScreenProps> = () => {
    const { currentUser } = useCurrentUserState();
    const [rightBarOpen, setRightBarOpen] = React.useState(false);

    const handleToggleBar = React.useCallback(() => {
        setRightBarOpen(open => !open);
    }, [setRightBarOpen]);


    if (!currentUser) {
        return (
            <Loading>Loading...</Loading>
        );
    }
    return currentUser ? (
        <CurrentListProvider>
            <MainContainer>
                <LeftBar onToggleBar={handleToggleBar} />
                <TabContent rightBarOpen={rightBarOpen} />
                <RightBar isOpen={rightBarOpen} />
                <ReactTooltip place='top' type='dark' effect='solid' />
            </MainContainer>
        </CurrentListProvider>
    ) : (
            <LoginPage >
                <Login />
                <Footer />
            </LoginPage>
        );
};

export default MainScreen;