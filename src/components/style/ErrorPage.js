import styled from "styled-components";
import { vars } from "./Vars";

const ErrorPageWrapper = styled.section`
@media (min-width: 320px) {
    h2 {
        color: ${vars.marvelRed};
        font-weight: 700;
        text-align: center;
    }
    h3 {
        text-align: center;
    }
    a {
        color: black;
    }
}
`;

const LinkWrapper = styled.div`
@media (min-width: 320px) {
    display: flex;
    justify-content: center;
}
`

export {ErrorPageWrapper, LinkWrapper};