import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useAddItem } from '../../firebase/dataAccess/itemsDataAccess';
import { Item } from '../../model/item';


export interface AddItemProps {
    onDone: () => void;
}

const Title = styled.h1`
    font-size: 1.5rem;
`;

const Error = styled.p`
    margin-top: 40px;
    color: red;
`;


const AddItemForm: React.FunctionComponent<AddItemProps> = ({ onDone }) => {
    const { addItem, loading, error } = useAddItem();
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = async (data: Partial<Item>) => {
        try {
            await addItem(data);
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
                <label>Name</label>
                <input name='name' type='text' placeholder='Enter a name' ref={register({ required: true })} />
                {errors.name && <span>This field is required</span>}

                <label>Note (optional)</label>
                <input name='note' type='text' placeholder='Enter a note' ref={register} />

                <label>Image (optional)</label>
                <input name='imgurl' type='text' placeholder='Enter a url' ref={register} />

                <label>Category</label>
                <input name='category' type='text' placeholder='Enter a category' ref={register({ required: true })} />
                {errors.category && <span>This field is required</span>}

                <button onClick={handleCancel}>cancel</button>
                <input type='submit' value='Save' />

            </form>
        </>
    );
};

export default AddItemForm;