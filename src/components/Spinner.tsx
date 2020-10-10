import React from 'react';

export interface SpinnerProps {
    className?: string;
}

const Spinner: React.FunctionComponent<SpinnerProps> = ({ className }) => (
    <img src='ajax-loader.gif' alt='loading' className={className} />
);

export default Spinner;