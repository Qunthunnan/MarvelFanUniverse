import styled from "styled-components";

const SortSelect = styled.select`
@media (min-width: 320px)  {
    padding: 10px;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px;
    font-size: 15px;
}
`;

const SortMainWraper = styled.nav`
@media (min-width: 320px) {
    margin: 0 0 0 20px;
}
@media (min-width: 576px) {
    margin: 30px 0 0 0;
}
`;
const SortComicsWrapper = styled.nav`
@media (min-width: 320px) {
    margin: 20px 0 0 20px;
}
@media (min-width: 576px) {
    margin: 30px 0 0 0;
}
`;

const SortDetailedWrapper = styled.nav`
@media (min-width: 320px) {
    margin: 20px 0 0 0px;
}
@media (min-width: 576px) {
    margin: 30px 0 0 0;
}
`;

export { SortSelect, SortMainWraper, SortComicsWrapper, SortDetailedWrapper }