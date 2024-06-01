import styled from "styled-components";

const Aside = styled.aside`
    @media (min-width: 320px) {
        background-color: #fff;
        flex-grow: 0;
        width: 100vw;
        padding: 25px;
        box-shadow: 0px 3px 15px 1px rgba(0, 0, 0, 0.3);
    }

    @media (min-width: 576px) {
        width: 90vw;
    }

    @media (min-width: 768px) {
        width: 300px;
        padding: 15px;
    }

    @media(min-width: 992px) {
        padding: 20px;
        width: 400px;
    }

    @media(min-width: 1400px) {
        padding: 25px;
        width: 425px;
    }
`;

export { Aside };