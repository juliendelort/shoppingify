import React from 'react';
import styled from 'styled-components';
import IconButton from './IconButton';

export interface AddIconButtonProps {
    itemId: string;
    onClick: (itemId: string) => void;
}


const GrayIconButton = styled(IconButton)`
    opacity: 0.3;d
    width: 16px;
    height: 16px;
`;

const AddIconButton: React.FunctionComponent<AddIconButtonProps> = ({ itemId, onClick }) => {
    const handleAddClicked = () => { onClick(itemId); }
    return (
        <GrayIconButton src='add-24px.svg' alt='Add' onClick={handleAddClicked} />
    );
};

export default AddIconButton;