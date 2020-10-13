import React from 'react';
import styled from 'styled-components';
import { Item } from '../model/item';
import IconButton from './IconButton';

export interface CurrentListItemProps {
    isEditing: boolean;
    onEditClicked: (itemId: string) => void;
    item: Item;
    count: number;
}

const ItemName = styled.span`
    font-style: normal;
    font-weight: 500;
    font-size: 1rem;

    color: #000000;
    align-self: center;
`;

const ItemCount = styled.div`
    border: 2px solid #F9A109;
    box-sizing: border-box;
    border-radius: 24px;
    padding: 8px 19px;
    color: #F9A109;
    font-size: 0.75rem;
    cursor: pointer;
    justify-self: end;
    align-self: center;
`;

const CountEditWrapper = styled.div`
    display: flex;
    background: white;
    border-radius: 12px;
    align-self: center;
    & > ${ItemCount}{
        margin: 5px 0;
    }
`;

const RemoveButton = styled(IconButton)`
    background: #F9A109;
    border-radius: 12px;
    padding: 10px;
`;

const CountControl = styled(IconButton)`
    margin: 0 10px;
`;

const CurrentListItem: React.FunctionComponent<CurrentListItemProps> = ({ item, count, isEditing, onEditClicked }) => {

    const handleEditClicked = () => {
        onEditClicked(item.id);
    }
    return (
        <>
            <ItemName>{item.name}</ItemName>
            {isEditing ? (
                <CountEditWrapper>
                    <RemoveButton src='delete-white-18dp.svg' alt='remove' />

                    <CountControl src='remove-orange-18dp.svg' alt='remove 1'>-</CountControl>
                    <ItemCount>{count}pcs</ItemCount>
                    <CountControl src='add-orange-18dp.svg' alt='add 1'>+</CountControl>


                </CountEditWrapper>
            ) : (
                    <ItemCount onClick={handleEditClicked} >{count}pcs</ItemCount>
                )}
        </>
    );
};

export default CurrentListItem;