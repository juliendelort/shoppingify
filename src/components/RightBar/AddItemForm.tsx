import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useAddItem } from '../../firebase/dataAccess/itemsDataAccess';
import { Item } from '../../model/item';
import Spinner from '../Spinner';


export interface AddItemProps {
    onDone: () => void;
}

const Title = styled.h1`
    font-size: 1.5rem;
`;

const Error = styled.p`
    color: red;
    font-size: 0.75rem;
    margin-top: 0;
`;

const FieldLabel = styled.label`
    display: block;
    color: #34333A;
    font-size: 0.8rem;
    margin-top: 36px;
`;

const inputTextAreaCommonStyle = `
    border: 2px solid #BDBDBD;
    box-sizing: border-box;
    border-radius: 12px;

    padding: 14px 17px;
    margin-top: 5px;
    width: 100%;
`;

const Input = styled.input`
    ${inputTextAreaCommonStyle}
`;

const TextArea = styled.textarea`
    ${inputTextAreaCommonStyle}
`;

const ButtonsWrapper = styled.div`
    display: grid;
    grid-template-columns: 2fr auto 1fr auto 2fr;
    margin-top: 36px;
`;


const SaveButton = styled.button<{ disabled: boolean }>`
    background: #F9A109;
    border-radius: 12px;
    padding: 14px 17px;
    color: white;
    border: none;
    font-size: 0.8rem;
    grid-column: 4;
    cursor: pointer;

    display: flex;
    align-items: center;

    ${props => props.disabled ? `
        opacity: 0.5;
    `: ''}

`;

const CancelButton = styled.button<{ disabled: boolean }>`
    color: #34333A;
    background: transparent;
    border: none;
    font-size: 0.8rem;
    grid-column: 2;
    cursor: pointer;

    ${props => props.disabled ? `
        opacity: 0.5;
    `: ''}
`;

const StyledSpinner = styled(Spinner)`
    width: 15px;
    height: 15px;
    margin-left: 15px;
    filter: invert(1);
`

const AddItemForm: React.FunctionComponent<AddItemProps> = ({ onDone }) => {
    const { addItem, loading, error } = useAddItem();
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = async (data: Partial<Item>) => {
        try {
            await addItem(data);
            // TODO: also add to current list
            onDone();
        } catch {
            // Do nothing, error will be displayed
        }
    }
    const handleCancel = () => onDone();
    return (
        <>
            {error && <Error>{error}</Error>}
            {loading && <p>Loading...</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <Title>Add a new item</Title>
                <FieldLabel>Name</FieldLabel>
                <Input name='name' type='text' placeholder='Enter a name' ref={register({ required: true })} />
                {errors.name && <Error>This field is required</Error>}

                <FieldLabel>Note (optional)</FieldLabel>
                <TextArea name='note' placeholder='Enter a note' ref={register} />

                <FieldLabel>Image (optional)</FieldLabel>
                <Input name='imgurl' type='text' placeholder='Enter a url' ref={register} />

                <FieldLabel>Category</FieldLabel>
                <Input name='category' list='categories' type='text' placeholder='Enter a category' ref={register({ required: true })} />

                {/* TODO: Add categories from present items to this list */}
                <datalist id='categories'>
                    <option>Fruits and Vegetables</option>
                    <option>Meat and Fishes</option>
                    <option>Beverages</option>
                    <option>Misc</option>
                </datalist>
                {errors.category && <Error>This field is required</Error>}
                <ButtonsWrapper>
                    <CancelButton onClick={handleCancel} disabled={loading}>cancel</CancelButton>
                    <SaveButton type='submit' value='Save' disabled={loading} >
                        Save
                        {loading && <StyledSpinner />}
                    </SaveButton>
                </ButtonsWrapper>
            </form>
        </>
    );
};

export default AddItemForm;