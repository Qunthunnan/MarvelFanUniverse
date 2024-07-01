import styled from "styled-components";
import { vars } from "../style/Vars";

const Header = styled.header`
padding: 52px 10px 25px;
display: flex;
justify-content: space-between;
position: fixed;
top: 0;
left: 0;
width: 100%;
background: #fff;
z-index: 2;
box-shadow: 0px 3px 15px 0px rgba(0, 0, 0, 0.3);

@media (min-width: 320px) {
    padding: 20px 10px;
    a {
        color: #000;
        text-decoration: none;
    }
    nav {
        display: flex;
        align-items: center;
    }
}

@media (max-width: 576px) {
    padding: 15px 10px;
}

`;

const DirectorySpan = styled.span`
    @media (min-width: 320px) {
        font-size: 0.9rem;
        font-weight: 700;
        margin: 0 5px 0 0;
        transition: color 0.3s;
        a {
            color: #000;
            text-decoration: none;
        }
        &:last-child {
            margin: 0;
        }
    }

    @media (min-width: 576px) {
        font-size: 24px;
    }
`;

export { DirectorySpan, Header };