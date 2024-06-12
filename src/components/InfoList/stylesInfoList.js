import styled from "styled-components";
import { WideButton } from "../style/WideButton";

const List = styled.ul`
@media (min-width: 320px) {
    margin: 0;
    padding: 0;
    display: grid;
    justify-content: space-evenly;
    grid-template: auto auto / auto auto;
    grid-auto-rows: auto;
    row-gap: 20px;
}

@media (min-width: 576px) {
    justify-content: space-around;
}

@media (min-width: 768px) {
    justify-content: flex-start;
    column-gap: 20px;
}

@media (min-width: 992px) {
    grid-template: auto auto auto / auto auto auto;
    column-gap: 25px;
}
`;

const Section = styled.section`
@media (min-width: 320px) {
    flex: 1;
}
`;

const WideButtonBottom = styled(WideButton)`
    margin: 45px auto 0;
`;

export { List, Section, WideButtonBottom };