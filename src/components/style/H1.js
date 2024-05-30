import styled from "styled-components";
import { vars } from './Vars';

const H1 = styled.h1`
    margin: 0;
    font-size: 28px;
    font-weight: 700;
    span {
        color: ${vars.marvelRed};
    }

    @media (max-width: 576px) {
        font-size: 20px;
    }
`;

export {H1};