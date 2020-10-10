import { map } from 'lodash';
import React from 'react';
import styled from 'styled-components';
import { Item } from '../model/item';
import { List } from '../model/list';
import AddItem from './AddItem';

export interface RightBarProps {
    currentList?: List;
    loading: boolean;
    error: string | null;
}
const CurrentList = styled.div`

`;
const ItemList = styled.div`
`;


const Loading = styled.p`
    text-align: center;
`;

const Error = styled.p`
    color: red;
`;

const RightBar: React.FunctionComponent<RightBarProps> = ({ currentList, loading, error }) => {
    const [addingItem, setAddingItem] = React.useState(false);

    const handleAddItem = () => setAddingItem(true);
    const handleDoneAddItem = () => setAddingItem(false);
    return (
        <>
            <button onClick={handleAddItem}>Add item</button>
            {
                addingItem ? (<AddItem onDone={handleDoneAddItem} />) : (
                    <CurrentList>
                        {error && <Error>error</Error>}
                        {loading ? <Loading>Loading...</Loading> : (
                            <ItemList>
                                {map(currentList?.items, (item: Item) => (
                                    <p key={item.id}>{item.name}</p>
                                ))}
                            </ItemList>)}
                    </CurrentList>
                )
            }
        </>
    );
};

export default RightBar;