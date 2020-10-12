import React from 'react';
import styled from 'styled-components';
import { DESKTOP_RIGHT_BAR_WIDTH, ifMobile } from '../utils/styles';
import AddItemButton from './AddItemButton';
import AddItemForm from './AddItemForm';
import CurrentList from './CurrentList';

export interface RightBarProps {
    isOpen: boolean;
}

const Container = styled.div<{ isOpen: boolean }>`
    position: fixed;
    right: 0;
    width: ${DESKTOP_RIGHT_BAR_WIDTH};
    height: 100%;
    background: #FFF0DE;
    padding-left: 50px;
    padding-right: 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    ${(props: { isOpen: boolean }) => ifMobile(`margin-right:  ${props.isOpen ? 0 : `-${DESKTOP_RIGHT_BAR_WIDTH}`};`)}
    transition: margin-right 0.2s ease;
`;


const RightBar: React.FunctionComponent<RightBarProps> = ({ isOpen }) => {
    const [addingItem, setAddingItem] = React.useState(false);

    const handleAddItem = () => setAddingItem(true);
    const handleDoneAddItem = () => setAddingItem(false);
    return (
        <Container isOpen={isOpen}>
            {!addingItem && <AddItemButton onAddItem={handleAddItem} />}
            {
                addingItem ? (
                    <AddItemForm onDone={handleDoneAddItem} />
                ) : (
                        <CurrentList />
                    )
            }
        </Container>
    );
};

export default RightBar;