export const YELLOW = '#F9A109';

const MOBILE_BREAKPOINT = '1024px';

export const ifNotMobile = (str: string) => `
    @media (min-width: ${MOBILE_BREAKPOINT}) {
        ${str}
    
    }
`;

export const ifMobile = (str: string) => `
    @media (max-width: ${MOBILE_BREAKPOINT}) {
        ${str}
    
    }
`; 