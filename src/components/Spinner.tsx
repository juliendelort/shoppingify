import React from 'react';

export interface SpinnerProps {
    className?: string;
}

const Spinner: React.FunctionComponent<SpinnerProps> = ({ className }) => (
    <img src='tail-spin.svg' alt='loading' className={className} />
);

export default Spinner;