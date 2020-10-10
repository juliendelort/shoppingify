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
    className?: string;
    onClick?: () => void;
}

const IconButton: React.FunctionComponent<IconButtonProps> = ({ src, alt, className, onClick }) => {
    return <StyledImg src={src} alt={alt} className={className} onClick={onClick} />
}

export default IconButton;