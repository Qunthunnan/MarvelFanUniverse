import styled from "styled-components";
import { vars } from "../style/Vars";

const DetailedWrapper = styled.section`
@media (min-width: 320px) {
    display: flex;
    flex-direction: column;
    margin: 30px 0 0 0;
    align-items: center;
    img {
        object-fit: cover;
    }
    a {
        margin: 20px 0 0 0;
        color: #000;
        font-size: 18px;
        font-weight: 700;
        text-decoration: none;
    }
}

@media (min-width: 576px) {
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: wrap;
    img {
        height: 200px;
        width: 200px;
    }
}

@media (min-width: 768px) {
    img {
        height: 240px;
        width: 240px;
    }
    a {
        margin: 0 0 0 auto;
        &:hover {
            color: ${ vars.marvelRed }
        }
    }
}

@media (min-width: 992px) {
    margin: 50px 0 0 0;
    img {
        height: 293px;
        width: 293px;
    }
}
`;

const TextWrapper = styled.div`
@media (min-width: 320px) {
    margin: 30px 0 0 0;
    max-width: 90%;
    h2 {
        font-size: 22px;
        font-weight: 700;
        margin: 0;
    }
    h3 {
        margin: 26px 0 0 0;
        font-size: 20px;
        font-weight: 700;
    }
    p {
        line-height: 22px;
        margin: 26px 0 0 0;
        font-size: 18px;
        font-weight: 400;
    }
}


@media (min-width: 576px) {
    margin: 0 0 0 20px;
    max-width: 300px;

}

@media (min-width: 768px) {
    margin: 0 0 0 30px;
    max-width: 360px;
}

@media (min-width: 992px) {
    margin: 0 0 0 50px;
    max-width: 550px;
}
`;

export { TextWrapper, DetailedWrapper };