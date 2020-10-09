import React from 'react';
import styled from 'styled-components';
import { map } from 'lodash';
import { useItems } from '../firebase/data';
import { RouteComponentProps } from '@reach/router';
import { ifNotMobile, ifMobile, YELLOW } from '../utils/styles';
import IconButton from '../components/IconButton';


const ItemScreen = styled.div`
    padding-left: 13px;
    padding-right: 13px;
    ${ifNotMobile(`
        padding-left: 80px;
        padding-right: 80px;
    `)}
`;

const Title = styled.h1`
    font-size: 26px;
    margin-bottom : 20px;
    margin-top: 40px;
    ${ifMobile(`display: none;`)}
`;


const ItemsWrapper = styled.div`
    margin-top: 40px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 45px 20px;

    ${ifMobile(`
        grid-template-columns: 1fr 1fr;
        grid-gap: 24px 9px;
    `)}

`;
const ItemElem = styled.div`
    padding: 18px 17px;
    background: white;
    border-radius: 12px;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
`;

const GrayIconButton = styled(IconButton)`
    opacity: 0.3;
    width: 16px;
    height: 16px;
`;


const Items: React.FunctionComponent<RouteComponentProps> = (props) => {
    const items = useItems();

    return (
        <ItemScreen>
            <Title><span style={{ color: YELLOW }} >Shoppingify</span> allows you to take your shopping list wherever you go</Title>
            <ItemsWrapper>
                {map(items, (item) => (
                    <ItemElem key={item.id}>
                        {item.name}
                        <GrayIconButton src='add-24px.svg' alt='Add' />
                    </ItemElem>))}
            </ItemsWrapper>
        </ItemScreen>
    );
}

export default Items;