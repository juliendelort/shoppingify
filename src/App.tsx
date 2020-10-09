import React from 'react';
import styled from 'styled-components';
import Login from './screens/Login';

import Items from './screens/Items';
import { useCurrentUser } from './firebase/data';
import { Router, RouteComponentProps } from '@reach/router';
import ReactTooltip from 'react-tooltip';
import NavigationLink from './components/NavigationLink';
import { ifNotMobile } from './utils/styles';
import RightBar from './components/RightBar';

const MOBILE_LEFT_BAR_WIDTH = '65px';
const DESKTOP_LEFT_BAR_WIDTH = '95px';

const DESKTOP_RIGHT_BAR_WIDTH = '390px';

const AppContainer = styled.div`
  display: flex;
`;

const LeftBar = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  bottom: 0px;
  background: #FFFFFF;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  width: ${MOBILE_LEFT_BAR_WIDTH};
  ${ifNotMobile(`width: ${DESKTOP_LEFT_BAR_WIDTH};`)}
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

  margin-left: ${MOBILE_LEFT_BAR_WIDTH};
  ${ifNotMobile(`margin-left: ${DESKTOP_LEFT_BAR_WIDTH};`)}

  margin-right: ${DESKTOP_RIGHT_BAR_WIDTH};
  overflow: hidden;
`;

const Loading = styled.p`
  transform: translate(-50%, -50%);
  display: inline;
  position: fixed;
  left: 50%;
  top: 50%;
`;

const RightBarWrapper = styled.div`
  position: fixed;
  right: 0;
  width: ${DESKTOP_RIGHT_BAR_WIDTH};
  height: 100%;
  background: #FFF0DE;
  padding-left: 50px;
  padding-right: 30px;
  box-sizing: border-box;
`;


// Temporary
const Lists = (props: RouteComponentProps) => <div>Lists</div>
const Stats = (props: RouteComponentProps) => <div>Statistics</div>


function App() {
  const currentUser = useCurrentUser();

  if (currentUser === undefined) {
    return (
      <Loading>Loading...</Loading>
    );
  }

  return currentUser ? (

    <AppContainer>
      <LeftBar>
        <LeftBarButtons>
          <NavigationLink name='items' url='/' imgsrc='format_list_bulleted-24px.svg' />
          <NavigationLink name='history' url='/history' imgsrc='replay-24px.svg' />
          <NavigationLink name='statistics' url='/stats' imgsrc='insert_chart_outlined-24px.svg' />
        </LeftBarButtons>
      </LeftBar>
      <TabContent>
        <Router>
          <Items path='/' />
          <Lists path='history' />
          <Stats path='stats' />
        </Router>
      </TabContent>
      <RightBarWrapper>
        <RightBar />
      </RightBarWrapper>
      <ReactTooltip place='top' type='dark' effect='solid' />
    </AppContainer>
  ) : (

      <Login />

    );
}

export default App;
