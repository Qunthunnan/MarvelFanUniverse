import styled from "styled-components";
import { vars } from "../style/Vars";

const CharactersListSC = styled.section`
@media (min-width: 320px) {
    margin: 20px 0 0 0;
}
`

const DetailedWrapper = styled.section`
    @media( min-width: 320px) {
        margin: 30px 0 0 0;
        padding: 0 0 30px 0;
        display: flex;
        flex-direction: column;
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

    @media(min-width: 576px) {
        margin: 40px 0 0 0;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: flex-start;
        padding: 0 0 40px 0;
        img { 
            height: 330.20px;
            width: 215px;
        }
        a {
            font-size: 20px;
        }
    }

    @media(min-width: 768px) {
        margin: 50px 0 0 0;
        padding: 0 0 50px 0;
        a {
            font-size: 20px;
            &:hover {
                color: ${ vars.marvelRed }
            }
        }
        img {
            height: 450px;
            width: 293px;
        }
    }

    @media  (min-width: 992px) {
        a {
            margin: 0 0 0 auto;
        }
    }
    `;

    const ImgWrapper = styled.div`
    display: flex;
    flex-direction: column;
    a {
        margin: 0 0 25px 0;
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
        display: block;
    }
    `;

    const TextWrapper = styled.div`
    @media( min-width: 320px) {
        max-width: 90%;
        margin: 20px 0 0 0;

        h2 {
            font-size: 22px;
            font-weight: 700;
            margin: 0;
        }
        p {
            line-height: 22px;
            margin: 26px 0 0 0;
            font-size: 18px;
            font-weight: 400;
        }
        span {
            display: block;
            color: ${vars.marvelRed};
            font-size: 24px;
            font-weight: 700;
            margin: 26px 0 0 0;
        }
    }

    @media(min-width: 576px) {
        max-width: 300px;
        margin: 0 0 0 20px;
    }


    @media(min-width: 768px) {
        max-width: 400px;
    }

    @media(min-width: 992px) {
        max-width: 550px;
        margin: 0 0 0 50px;
    }
`;

export { DetailedWrapper, TextWrapper, CharactersListSC, AsideLink, ImgWrapper };