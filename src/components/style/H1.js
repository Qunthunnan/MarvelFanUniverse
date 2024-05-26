import styled from "styled-components";
import { vars } from './Vars';

const H1 = styled.h1`
    font-size: 28px;
    font-weight: 700;
    span {
        color: ${vars.marvelRed};
    }
`;

export {H1};