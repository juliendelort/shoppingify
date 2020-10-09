import React from 'react';
import { useForm } from 'react-hook-form';
import { useAddItem } from '../firebase/data';
import { Item } from '../model/items';
import styled from 'styled-components';

const Title = styled.h1`
    font-size: 24px;
`;

const AddItem: React.FunctionComponent = () => {
    const { addItem, loading, error } = useAddItem();
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data: Partial<Item>) => addItem(data);

    return (
        <>
            {error && <p>{error}</p>}
            {loading && <p>Loading...</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Add a new item</h1>
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

                <button>cancel</button>
                <input type='submit' value='Save' />

            </form>
        </>
    );
};

export default AddItem;