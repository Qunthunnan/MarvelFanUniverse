import styled from "styled-components";
import { vars } from "../style/Vars";

const DirectorySpan = styled.a`
    font-size: 24px;
    font-weight: 700;
    color: ${ ({active}) => (active ? vars.marvelRed : '#000') };
    margin: 0 5px 0 0;
    text-decoration: none;
    &:last-child {
        margin: 0;
    }

    @media (max-width: 576px) {
        font-size: 18px;
        &:last-child {
            margin: 0 10px 0 0;
        }
    }
`;

export { DirectorySpan };