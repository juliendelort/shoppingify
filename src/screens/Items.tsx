import React from 'react';
import styled from 'styled-components';
import { map } from 'lodash';
import { useItems } from '../firebase/data';

const ItemElem = styled.div`

`;
const Items = () => {
    const items = useItems();

    return (
        <>
            <h1>Items</h1>
            { map(items, (item) => (<ItemElem key={item.id}>{item.name}</ItemElem>))}
        </>
    );
}

export default Items;