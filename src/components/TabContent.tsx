import { Router, RouteComponentProps } from '@reach/router';
import React from 'react';
import styled from 'styled-components';
import { ItemsProvider } from '../context/items';
import Items from './ItemsTabContent/Items';
import { DESKTOP_LEFT_BAR_WIDTH, DESKTOP_RIGHT_BAR_WIDTH, ifMobile } from '../utils/styles';
import Footer from './Footer';


export interface TabContentProps {
    rightBarOpen: boolean;
}

const Container = styled.div<{ rightBarOpen: boolean }>`
  flex:1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;

  margin-left: ${DESKTOP_LEFT_BAR_WIDTH};
  margin-right: ${DESKTOP_RIGHT_BAR_WIDTH};

  // Toggle rightbar only in mobile mode
  ${(props: { rightBarOpen: boolean }) => ifMobile(`
      margin-right: ${props.rightBarOpen ? DESKTOP_RIGHT_BAR_WIDTH : 0};
  `)}
  

  overflow: hidden;
`;

const MainContent = styled.div`
  flex: 1;
`;


const ItemsWithData = (props: RouteComponentProps) => <ItemsProvider><Items /></ItemsProvider>;

// Temporary
const Lists = (props: RouteComponentProps) => <div>Lists</div>
const Stats = (props: RouteComponentProps) => <div>Statistics</div>

const TabContent: React.FunctionComponent<TabContentProps> = ({ rightBarOpen }) => {
    return (
        <Container rightBarOpen={rightBarOpen}>
            <MainContent>
                <Router>
                    <ItemsWithData path='/' />
                    <Lists path='history' />
                    <Stats path='stats' />
                </Router>
            </MainContent>
            <Footer />
        </Container>
    );
};

export default TabContent;