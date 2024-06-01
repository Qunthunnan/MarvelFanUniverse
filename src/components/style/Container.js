import styled from "styled-components";

const Container = styled.div`
    width: 1100px;
    margin: 0 auto;
    @media (min-width: 320px) {
        width: 100%;
    }
    @media (min-width: 576px) {
        width: 540px;
    }
    @media (min-width: 768px) {
        width: 720px;
    }
    @media (min-width: 992px) {
        width: 960px;
    }
    @media (min-width: 1200px) {
        width: 1000px;
    }
    @media (min-width: 1400px) {
        width: 1100px;
    }
`;

export { Container }