import { Match, Link } from '@reach/router';
import React from 'react';
import styled from 'styled-components';
import { YELLOW } from '../utils/styles';
import IconButton from './IconButton';

export interface NavigationLinkProps {
    name: string;
    url: string;
    imgsrc: string;
}

const SelectedIndicator = styled.div`
  background: ${YELLOW};
  width: 6px;
  height: 100%;
  border-radius: 0px 4px 4px 0px;
  position: absolute;
  left: 0;
  top: 0;
`;

const StyledLink = styled(Link)`
  width: 100%;
  height: 46px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavigationLink: React.FunctionComponent<NavigationLinkProps> = ({ name, url, imgsrc }) => (
    <Match path={url} data-tip={name} >
        {({ match }) => (
            <StyledLink to={url} data-tip={name}>
                {match && <SelectedIndicator />}
                <IconButton src={imgsrc} alt={name} />
            </StyledLink>
        )}
    </Match>
);

export default NavigationLink;