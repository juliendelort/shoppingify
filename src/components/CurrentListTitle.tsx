import { isEmpty } from 'lodash';
import React from 'react';
import styled from 'styled-components';
import { useCurrentListState } from '../context/currentList';
import IconButton from './IconButton';

export interface CurrentListTitleProps {
}

const Container = styled.div`
    display: flex;
`;

const Title = styled.h2`
    flex: 1;
    margin: 0;
    align-items: center;

    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 30px;
    color: #34333A;
`;

const CurrentListTitle: React.FunctionComponent<CurrentListTitleProps> = () => {
    const { currentList } = useCurrentListState();

    const title = isEmpty(currentList?.name) ? 'Shopping list' : currentList?.name;

    return (
        <Container>
            <Title>{title}</Title>
            <IconButton
                src={currentList?.status === 'editing' ? 'playlist_add_check-24px.svg' : 'edit-24px.svg'}
                alt={currentList?.status === 'editing' ? 'complete' : 'edit'}
            />
        </Container>
    );
};

export default CurrentListTitle;