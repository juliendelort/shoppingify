import React from 'react';
import styled from 'styled-components';
import { groupBy, map } from 'lodash';
import { ifNotMobile, ifMobile, YELLOW } from '../../utils/styles';
import { Item } from '../../model/item';
import Spinner from '../Spinner';
import { useCurrentListState } from '../../context/currentList';
import AddIconButton from './AddIconButton';
import { useItemsState } from '../../context/items';
import { useAddToList } from '../../firebase/dataAccess/listDataAccess';

const ItemScreen = styled.div`
    padding-left: 13px;
    padding-right: 13px;
    ${ifNotMobile(`
        padding-left: 80px;
        padding-right: 80px;
    `)}
`;

const Title = styled.h1`
    font-size: 1.75rem;
    margin-top: 32px 0;
    margin-bottom: 20px;
    ${ifMobile(`display: none;`)}
`;

const CategoryTitle = styled.span`
    margin-top: 20px;
    ${ifNotMobile(`margin-top: 30px;`)}
    font-size: 1.25rem;
    grid-column: 1 / -1;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(min-content, 200px));
    grid-gap: 45px 18px;

    ${ifMobile(`
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
    overflow: hidden;
`;

const ItemName = styled.span`
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Loading = styled.p`
    text-align: center;
    margin-top: 40px;
`;

const Error = styled.p`
    margin-top: 40px;
    color: red;
`;

const StyledSpinner = styled(Spinner)`
    opacity: 0.8;
    width: 18px;
    height: 18px;
`;


const Items: React.FunctionComponent = () => {
    const { items, loading: fetchingItems, error: fetchItemsError } = useItemsState();
    const { addToList, itemBeingAdded, error: addItemError } = useAddToList();
    const { currentList } = useCurrentListState();

    const itemsByCategory = React.useMemo(() => groupBy(items, ((i: Item) => i.category)), [items]);
    const handleAddClicked = React.useCallback(
        (itemId: string) => currentList?.id && addToList(currentList.id, itemId),
        [currentList, addToList]);

    return (
        <ItemScreen>
            <Title><span style={{ color: YELLOW }} >Shoppingify</span> allows you to take your shopping list wherever you go</Title>
            {fetchItemsError && <Error>{fetchItemsError}</Error>}
            {addItemError && <Error>{addItemError}</Error>}

            {fetchingItems ? <Loading>Loading...</Loading> : (
                <Grid>
                    {map(itemsByCategory, (items: Item[], category: string) => (
                        <React.Fragment key={category}>
                            <CategoryTitle>{category}</CategoryTitle>
                            {map(items, (item) => (
                                <ItemElem key={item.id}>
                                    <ItemName>{item.name}</ItemName>
                                    {itemBeingAdded === item.id ? <StyledSpinner /> : (
                                        <AddIconButton itemId={item.id} onClick={handleAddClicked} />
                                    )}
                                </ItemElem>))}
                        </React.Fragment>

                    ))}
                </Grid>)}
        </ItemScreen>
    );
}

export default Items;