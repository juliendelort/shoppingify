import React from 'react';
import styled from 'styled-components';
import { groupBy, map } from 'lodash';
import { useItems } from '../firebase/data';
import { RouteComponentProps } from '@reach/router';
import { ifNotMobile, ifMobile, YELLOW } from '../utils/styles';
import IconButton from '../components/IconButton';
import { Item } from '../model/items';


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
    margin-top: 40px;
    ${ifMobile(`display: none;`)}
`;

const SectionTitle = styled.p`
    margin-top: 40px;
    ${ifNotMobile(`margin-top: 60px;`)}
    margin-bottom: 18px;
    font-size: 18px;
`;

const SectionContent = styled.div`
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
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.05);
`;

const GrayIconButton = styled(IconButton)`
    opacity: 0.3;
    width: 16px;
    height: 16px;
`;


const Items: React.FunctionComponent<RouteComponentProps> = (props) => {
    const items = useItems();

    const itemsByCategory = groupBy(items, ((i: Item) => i.category));

    return (
        <ItemScreen>
            <Title><span style={{ color: YELLOW }} >Shoppingify</span> allows you to take your shopping list wherever you go</Title>

            {map(itemsByCategory, (items: Item[], category: string) => (
                <React.Fragment key={category}>
                    <SectionTitle>{category}</SectionTitle>
                    <SectionContent>
                        {map(items, (item) => (
                            <ItemElem key={item.id}>
                                {item.name}
                                <GrayIconButton src='add-24px.svg' alt='Add' />
                            </ItemElem>))}
                    </SectionContent>
                </React.Fragment>
            ))}
        </ItemScreen>
    );
}

export default Items;