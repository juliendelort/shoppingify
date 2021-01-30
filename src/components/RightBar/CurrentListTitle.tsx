import { isEmpty } from 'lodash';
import React from 'react';
import styled from 'styled-components';
import { useCurrentListState } from '../../context/currentList';
import { useSetListStatus } from '../../firebase/dataAccess/listDataAccess';
import IconButton from '../IconButton';

export interface CurrentListTitleProps {
}

const Container = styled.div`
    display: flex;
    padding-bottom: 24px;
    align-items: center;
`;

const Title = styled.h2`
    flex: 1;
    margin: 0;
    align-items: center;

    font-style: normal;
    font-weight: bold;
    font-size: 1.5rem;
    line-height: 30px;
    color: #34333A;
`;

// TODO: disable status IconButton when saving is in progress + handle status update error
const CurrentListTitle: React.FunctionComponent<CurrentListTitleProps> = () => {
    const { currentList } = useCurrentListState();
    const { setListStatus, listBeingModified } = useSetListStatus();

    const title = isEmpty(currentList?.name) ? 'Shopping list' : currentList?.name;

    const handleStatusClicked = () => {
        if (currentList && !listBeingModified) {
            setListStatus(currentList.id, currentList?.status === 'editing' ? 'completing' : 'editing');
        }
    };

    return (
        <Container>
            <Title>{title}</Title>
            <IconButton
                onClick={handleStatusClicked}
                src={currentList?.status === 'editing' ? 'playlist_add_check-24px.svg' : 'edit-24px.svg'}
                alt={currentList?.status === 'editing' ? 'complete' : 'edit'}
            />
        </Container>
    );
};

export default CurrentListTitle;