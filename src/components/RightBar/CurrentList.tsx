import { forEach, groupBy, keys, map, sortBy } from 'lodash';
import React from 'react';
import styled from 'styled-components';
import { useCurrentListState } from '../../context/currentList';
import CurrentListItem from './CurrentListItem';
import CurrentListTitle from './CurrentListTitle';

export interface CurrentListProps {
}


const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    
`;

const ItemList = styled.div`
    overflow: auto;
    flex: 1;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 18px 10px;
    &::-webkit-scrollbar {
        display: none;
    }

    &::after{
        content: "";
        display: block;
        height: 50px;
        width: 100%;
    }
`;


const Loading = styled.p`
    text-align: center;
`;

const Error = styled.p`
    color: red;
`;

const CategoryTitle = styled.h3`
    margin-top: 24px;
    margin-bottom: 0;

    font-style: normal;
    font-weight: 500;
    font-size: 0.8rem;

    color: #828282;
    grid-column: 1/-1;
`;


const CurrentList: React.FunctionComponent<CurrentListProps> = () => {
    const [editingItemId, setEditingItemId] = React.useState<string | undefined>();
    const { currentList, loading, error } = useCurrentListState();

    // Group items by category and sort them by name within each category
    const itemsByCategory = React.useMemo(() => {
        const result = groupBy(currentList?.items, (i) => i.item.category);
        forEach(keys(result), (category) => {
            result[category] = sortBy(result[category], ({ item, count }) => item.name)
        })
        return result;
    }, [currentList]);

    // Displaying categories in alphabetical order
    const categories = React.useMemo(() => keys(itemsByCategory).sort(), [itemsByCategory]);

    const handleEditClicked = React.useCallback((itemId: string) => {
        setEditingItemId(itemId);
    }, [setEditingItemId]);

    return (
        <Container>
            {error && <Error>error</Error>}
            {loading ? <Loading>Loading...</Loading> : (
                <>
                    <CurrentListTitle />
                    <ItemList>
                        {map(categories, (category) => (
                            <React.Fragment key={category}>
                                <CategoryTitle>{category}</CategoryTitle>
                                {map(itemsByCategory[category], ({ item, count }) => (
                                    <CurrentListItem
                                        key={item.id}
                                        item={item}
                                        count={count}
                                        isEditing={editingItemId === item.id}
                                        currentListId={currentList?.id}
                                        onEditClicked={handleEditClicked} />
                                ))}

                            </React.Fragment>
                        ))}
                    </ItemList>
                </>
            )}
        </Container>
    );
};

export default CurrentList;