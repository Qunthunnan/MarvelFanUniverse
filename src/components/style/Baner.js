import styled from "styled-components";
import { vars } from "./Vars";

const Baner = styled.div`
@media( min-width: 320px) {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: ${vars.lightBlack};
    height: 100px;
    img {
        height: 65.79px;
        width: 100px;
        &:last-child {
            display: none;
        }
    }
    h2 {
        color: #fff;
        font-weight: 700;
        font-size: 18px;
        margin: 0;
    }
}

@media (min-width: 576px) {
    img {
        height: unset;
        width: unset;
    }
}

@media (min-width: 768px) {
    padding: 0 0 0 45px;
    justify-content: flex-start;
    img {
        &:last-child {
            display: unset;
            margin: 0 25px 0 auto;
        }
    }
    h2 {
        margin: 0 0 0 83px;
        font-size: 24px;
    }
}
`;

export { Baner };