import { isEqual, isNil } from 'lodash';
import React from 'react';
import styled from 'styled-components';
import { useAddToList, useDecrementFromList, useRemoveFromList } from '../../firebase/dataAccess/listDataAccess';
import { Item } from '../../model/item';
import IconButton from '../IconButton';

export interface CurrentListItemProps {
    isEditing: boolean;
    currentListId?: string;
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

const CountEditWrapper = styled.div<{ disabled: boolean }>`
    display: flex;
    background: white;
    border-radius: 12px;
    align-self: center;
    & > ${ItemCount}{
        margin: 5px 0;
    }

    ${props => props.disabled ? `
        opacity: 0.5;
        pointer-events: none;
    `: ''}
`;

const RemoveButton = styled(IconButton)`
    background: #F9A109;
    border-radius: 12px;
    padding: 10px;
`;

const CountControl = styled(IconButton)`
    margin: 0 10px;
`;

const CurrentListItem: React.FunctionComponent<CurrentListItemProps> = ({ currentListId, item, count, isEditing, onEditClicked }) => {
    const { addToList, itemBeingAdded, error: errorAddToList } = useAddToList();
    const { decrementFromList, itemBeingDecremented, error: errorDecrementFromList } = useDecrementFromList();
    const { removeFromList, itemBeingRemoved, error: errorRemoveFromList } = useRemoveFromList();

    const error = errorAddToList || errorDecrementFromList || errorRemoveFromList;
    const disabled = !isNil(itemBeingAdded) || !isNil(itemBeingDecremented) || !isNil(itemBeingRemoved);

    const handleEditClicked = React.useCallback(() => {
        onEditClicked(item.id);
    }, [onEditClicked, item.id]);

    const handlePlusClicked = React.useCallback(() => {
        currentListId && addToList(currentListId, item.id);
    }, [currentListId, item.id, addToList]);

    const handleMinusClicked = React.useCallback(() => {
        if (currentListId) {
            // Decrement or remove.
            // TODO: manage this in the backend
            if (count > 1) {
                decrementFromList(currentListId, item.id)
            } else {
                removeFromList(currentListId, item.id)
            }
        }
    }, [currentListId, item.id, count, decrementFromList, removeFromList]);

    const handleRemoveClicked = React.useCallback(() => {
        currentListId && removeFromList(currentListId, item.id);
    }, [currentListId, item.id, removeFromList]);

    return (
        <>
            <ItemName>{item.name}</ItemName>
            {isEditing ? (
                <CountEditWrapper disabled={disabled}>
                    <RemoveButton src='delete-white-18dp.svg' alt='remove' onClick={handleRemoveClicked} />

                    <CountControl src='remove-orange-18dp.svg' alt='remove 1' onClick={handleMinusClicked}>-</CountControl>
                    <ItemCount>{count}pcs</ItemCount>
                    <CountControl src='add-orange-18dp.svg' alt='add 1' onClick={handlePlusClicked}>+</CountControl>
                    {error && <img src='error_outline-red-18dp.svg' title={error} alt='error' />}

                </CountEditWrapper>
            ) : (
                    <ItemCount onClick={handleEditClicked} >{count}pcs</ItemCount>
                )}
        </>
    );
};

// Using deep prop comparison here to avoid rendering all items when the list has changed
export default React.memo(CurrentListItem, isEqual); 