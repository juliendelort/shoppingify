import React from 'react';
import styled from 'styled-components';


const FooterWrapper = styled.p`
  font-size: 0.75rem;
  margin-top: 50px;
  text-align: center;
`;

const Footer: React.FunctionComponent = () => (
    <FooterWrapper>
        Author: Julien Delort | <a href='https://www.linkedin.com/in/juliendelort/' target='_blank' rel="noopener noreferrer" >Linkedin</a>
    </FooterWrapper>
);

export default Footer;