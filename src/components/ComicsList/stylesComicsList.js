import styled from "styled-components";

const List = styled.ul`
    margin: 49px 0 0 0;
    display: grid;
    grid-auto-rows: auto;


    @media (min-width: 320px) {
        padding: 0 10px;
        grid-template: auto auto / minmax(140px, auto) minmax(140px, auto);
        column-gap: 20px;
        row-gap: 20px;
        justify-content: space-evenly;
    }

    @media (min-width: 576px) {
        row-gap: 40px;
    }

    @media (min-width: 786px) {
        grid-template: auto auto / minmax(160px, auto) minmax(160px, auto) minmax(160px, auto);
    }


    @media (min-width: 992px) {
        row-gap: 55px;
        column-gap: 25px;
    }

    @media (min-width: 1200px) {
        grid-template: auto auto / minmax(200px, auto) minmax(200px, auto) minmax(200px, auto) minmax(200px, auto);

    }
`;

const ComicsWrapper = styled.section`
@media (min-width: 320px) {
    display: block;
    padding: 0 0 25px;
}
@media (min-width: 576px) {
    padding: 0 0 45px;
}
`;

export { List, ComicsWrapper };