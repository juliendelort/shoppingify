import { groupBy, map } from 'lodash';
import React from 'react';
import styled from 'styled-components';
import { useCurrentListState } from '../context/currentList';
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
    &::-webkit-scrollbar {
        display: none;
      }
`;


const Loading = styled.p`
    text-align: center;
`;

const Error = styled.p`
    color: red;
`;

const CategoryTitle = styled.h3`
    margin-top: 32px;
    margin-bottom: 20px;

    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;

    color: #828282;
`;

const ItemWrapper = styled.div`
    margin-bottom: 34px;
`;

const CurrentList: React.FunctionComponent<CurrentListProps> = () => {
    const { currentList, loading, error } = useCurrentListState();

    const itemsByCategory = groupBy(currentList?.items, (i) => i.item.category);

    return (
        <Container>
            {error && <Error>error</Error>}
            {loading ? <Loading>Loading...</Loading> : (
                <>
                    <CurrentListTitle />
                    <ItemList>
                        {map(itemsByCategory, (items, category) => (
                            <React.Fragment key={category}>
                                <CategoryTitle >{category}</CategoryTitle>
                                {map(items, ({ item, count }) => (
                                    <ItemWrapper key={item.id}>{item.name} : {count}</ItemWrapper>
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