import styled from "styled-components";

const List = styled.ul`
    margin: 49px 0 0 0;
    display: grid;
    grid-auto-rows: auto;


    @media (min-width: 320px) {
        padding: 0;
        
        grid-template: auto auto / auto auto;
        row-gap: 30px;
        justify-content: space-around;
    }

    @media (min-width: 576px) {
        row-gap: 40px;
        justify-content: space-between;
    }

    @media (min-width: 786px) {
        grid-template: auto auto / auto auto auto;
    }


    @media (min-width: 992px) {
        row-gap: 55px;
    }

    @media (min-width: 1200px) {
        grid-template: auto auto / auto auto auto auto;

    }
`;

export { List };