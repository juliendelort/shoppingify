import { reduce } from 'lodash';
import React from 'react';
import styled from 'styled-components';
import { useCurrentListState } from '../../context/currentList';
import { DESKTOP_LEFT_BAR_WIDTH, ifNotMobile, MOBILE_LEFT_BAR_WIDTH, YELLOW } from '../../utils/styles';
import NavigationLink from './NavigationLink';

export interface LeftBarProps {
    onToggleBar: () => void;
}

const Container = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  bottom: 0px;
  background: #FFFFFF;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 1000;
  align-items: center;
  padding: 30px 0;

  width: ${MOBILE_LEFT_BAR_WIDTH};
  ${ifNotMobile(`width: ${DESKTOP_LEFT_BAR_WIDTH};`)}
`;

const LeftBarButtons = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: auto;
  justify-items: center;
  grid-gap: 32px;
  width: 100%;
`;

const CartIcon = styled.img`
    background: ${YELLOW};
    width: 42px;
    height: 42px;
    border-radius: 100%;
    padding: 11px;
    box-sizing: border-box;
    position
`;

const LogoCountWrapper = styled.div`
    position: relative;
`;

const Logo = styled.img`
    width: 40px;
    height: 40px;
`;

const Count = styled.span`
    padding: 3px 7px;
    box-sizing: border-box;
    font-size: 0.75rem;
    color: white;
    background: #EB5757;
    border-radius: 4px;

    position: absolute;
    top: 0;
    right: 0;
    transform: translate(25%, -25%);
`;

const LeftBar: React.FunctionComponent<LeftBarProps> = ({ onToggleBar }) => {
    const { currentList } = useCurrentListState();
    const currentListCount = reduce(currentList?.items, (count, value, key) => {
        return count + value.count;
    }, 0);

    return (
        <Container>
            <Logo src='logo.svg' />
            <LeftBarButtons>
                <NavigationLink name='items' url='/' imgsrc='format_list_bulleted-24px.svg' />
                <NavigationLink name='history' url='/history' imgsrc='replay-24px.svg' />
                <NavigationLink name='statistics' url='/stats' imgsrc='insert_chart_outlined-24px.svg' />
            </LeftBarButtons>
            <LogoCountWrapper onClick={onToggleBar} >
                <CartIcon src='shopping_cart-white-18dp.svg' alt='open list' />
                {currentListCount > 0 && <Count>{currentListCount}</Count>}
            </LogoCountWrapper>
        </Container>
    );
};

export default LeftBar;