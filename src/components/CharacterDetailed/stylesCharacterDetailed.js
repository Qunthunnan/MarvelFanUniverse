import styled from "styled-components";
import { vars } from "../style/Vars";
import { WideButton } from "../style/WideButton";

const DetailedWrapper = styled.section`
@media (min-width: 320px) {
    display: flex;
    flex-direction: column;
    margin: 30px 0 0 0;
    padding: 0 0 30px 0;
    align-items: center;
    img {
        object-fit: cover;
    }
    a {
        margin: 20px 0 0 0;
        color: #000;
        font-size: 1rem;
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
    padding: 0 0 50px 0;
    img {
        height: 293px;
        width: 293px;
    }
}
`;

const ImgWrapper = styled.div`
@media (min-width: 320px) {
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    padding: 0 5svw;
    a {
        margin: 0 0 25px 0;
    }
}

@media (min-width: 576px) {
    align-self: normal;
    padding: 0;
}

@media (min-width: 1200px) {
    a {
        display: none;
    }
}
`;

const AsideLink = styled.div`
@media (min-width: 320px) {
    display: none;
}
@media (min-width: 1200px) {
    margin: 0 0 0 auto;
    display: block;
}
`;

const SearchForm = styled.form`
@media (min-width: 320px) {
    margin: 20px 0 0 0;
    display: flex;
    div {
        width: 100%;
        position: relative;
    }
    svg {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
    }
    input {
        width: 100%;
        border: none;
        font-size: 14px;
        font-weight: 400;
        padding: 0 30px 0 10px;
        height: 38px;
        box-shadow: 0px 4px 5px 1px rgba(0, 0, 0, 0.1);
        &::placeholder {
            color: #00000080;
        }
    }
    label {
        margin: 0 0 0 20px;
        font-size: 16px;
        font-weight: 700;
        color: ${vars.marvelRed}   
    }
}

@media (min-width: 768px) {
    div {
        width: 60%;
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

const ListDataWrapper = styled.div`
@media (min-width: 320px) {
    margin: 30px 0 0 0;
    && a {
        margin: 0;
        font-weight: 400;
        font-size: 14px;
    }
}
`;

const LoadMoreBtn = styled(WideButton)`
&&& {
    @media (min-width: 320px) {
        margin: 20px 0 0 0;
        color: #fff;
    }
}`;

export { TextWrapper, DetailedWrapper, AsideLink, ImgWrapper, ListDataWrapper, LoadMoreBtn, SearchForm };