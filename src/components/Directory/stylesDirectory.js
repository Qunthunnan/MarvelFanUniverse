import styled from "styled-components";
import { vars } from "../style/Vars";

const Header = styled.header`
     
padding: 52px 0 25px;
display: flex;
justify-content: space-between;

@media (min-width: 576px) {
    padding: 20px 0;
    a {
        color: #000;
        text-decoration: none;
    }
}

@media (max-width: 576px) {
    padding: 15px 10px;
}

`;

const DirectorySpan = styled.span`
    font-size: 24px;
    font-weight: 700;
    margin: 0 5px 0 0;
    a {
        color: #000;
        text-decoration: none;
    }
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

export { DirectorySpan, Header };