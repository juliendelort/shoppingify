export const YELLOW = '#F9A109';

export const MOBILE_LEFT_BAR_WIDTH = '65px';
export const DESKTOP_LEFT_BAR_WIDTH = '95px';
export const DESKTOP_RIGHT_BAR_WIDTH = '390px';

const MOBILE_BREAKPOINT = '768px';


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