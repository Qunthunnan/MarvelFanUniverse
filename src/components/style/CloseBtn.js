import styled from "styled-components";

const CloseBtn = styled.button`
    @media (min-width: 320px) {
        padding: 0;
        position: absolute;
        top: 5px;
        right: 5px;
        border: none;
        background: none;
        svg {
            height: 30px;
            width: 30px;
        }
    }
    @media (min-width: 768px) {
        display: none;
    }
`;

export { CloseBtn };