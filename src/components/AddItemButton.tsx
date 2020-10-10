import React from 'react';
import styled from 'styled-components';

export interface AddItemButtonProps {
    onAddItem: () => void;
}

const Wrapper = styled.div`
    margin: 43px 0;
    height: 130px;

    background: #80485B;
    border-radius: 24px;

    display: flex;
    align-items: flex-start;
`;

const StyledImg = styled.img`
    margin: -16px 30px 0 16px;
`;

const VerticalLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const Button = styled.button`
    padding: 11px 30px;

    background: #FFFFFF;
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);
    border-radius: 12px;
    border: none;
    cursor: pointer;
`;

const Text = styled.p`
    color: white;
    font-weight: 700;
`;

const AddItemButton: React.FunctionComponent<AddItemButtonProps> = ({ onAddItem }) => {

    return (<Wrapper>
        <StyledImg src='source.svg' />
        <VerticalLayout>
            <Text>Didn't find what you need?</Text>
            <Button onClick={onAddItem}>Add item</Button>
        </VerticalLayout>
    </Wrapper>);

};

export default AddItemButton;