import styled from "styled-components";
import { vars } from "./Vars";

const NotFoundPageWrapper = styled.section`
padding: 25px 0;
display: flex;
flex-direction: column;
align-items: center;
row-gap: 30px;

h2 {
    font-size: 35px;
    font-weight: 700;
}

a {
    color: ${vars.marvelRed};
    font-size: 25px;
}
`;

export { NotFoundPageWrapper }