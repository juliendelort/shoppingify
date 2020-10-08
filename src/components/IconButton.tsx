import React from 'react';
import styled from 'styled-components';

const StyledImg = styled.img`
    cursor: pointer;
    &:hover{
        opacity: 0.5;
    }
`;

interface IconButtonProps {
    src: string;
    alt: string;
}

const IconButton = (props: IconButtonProps) => {
    const { src: iconUrl, alt } = props;

    return <StyledImg src={iconUrl} alt={alt} />
}

export default IconButton;