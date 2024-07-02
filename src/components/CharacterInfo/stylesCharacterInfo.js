import styled from "styled-components"
import { Aside } from "../style/Aside";


const InfoWrapper = styled(Aside)`
@media (min-width: 320px) {
    order: 2; 
    position: relative;
    height: 70svh;
    transform: ${ ({$mobileActive}) => ( $mobileActive ? 'translate(-100%, 40svh)' : 'translate(-100%, 150svh)') };
    width: 100vw;
    overflow: auto;
    transition: transform 300ms;
    h2 {
        display: ${ ({$active}) => ( $active ? 'none' : 'unset' )};
        font-size: 18px;
        font-weight: 700;
        text-align: center;
    }
    p {
        line-height: 18px;
        font-size: 14px;
        font-weight: 400;
        margin: 15px 0 0 0;
    }
    h3 {
        margin: 10px 0 0 0;
        font-size: 18px;
        font-weight: 700;
    }
}

@media (min-width: 576px) {
    height: 90vh;
    transform: ${ ({$mobileActive}) => ( $mobileActive ? 'translate(-100%, 30%)' : 'translate(-100%, 100svh)') };
    width: 100vw;
}

@media (min-width: 768px) {
    position: static;
    transform: none;
    display: unset;
    height: unset;
    max-height: 67vh;
    width: 100%;
    order: 1;
}

@media(min-width: 992px) {
    width: 400px;
}

@media(min-width: 1400px) {
    width: 425px;
}
`;

const ItemsList = styled.ul`
margin: 10px 0 0 0;
display: flex;
flex-direction: column;
padding: 0;
list-style: none;
li {
    flex: 1;
    min-height: 24px;
    max-width: 100%;
    word-wrap: break-word;
    font-size: 14px;
    line-height: 24px;
    font-weight: 400;
    box-shadow: 0px 4px 5px 1px rgba(0, 0, 0, 0.1);
    margin: 0 0 10px 0;
    &:last-child {
        margin: 0;
    }
    a {
        display: block;
        height: 100%;
        color: black;
        text-decoration: none;
        padding: 0 10px;
    }
}
`;

const HeadInfo = styled.div`
@media (min-width: 320px) {
    display: flex;
    align-items: center;
    column-gap: 25px;
    flex-direction: column;
    row-gap: 10px;
    img {
        object-fit: cover;
    }
}

@media (min-width: 576px) {
    align-items: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
}
@media (min-width: 992px) {
    flex-direction: row;
    column-gap: 25px;
}
`;

const TitleWrapper = styled.div`
@media (min-width: 320px) {
    width: 100%;
}
`;

const SideHead = styled.div`
@media (min-width: 320px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    h2 {
        text-align: unset;
        font-size: 22px;
        font-weight: 700;
    }
}
`;

const ButtonWrap = styled.div`
@media (min-width: 320px) {
    display: flex;
    column-gap: 20px;
    row-gap: 10px;
}

@media (min-width: 768px) {
    flex-direction: row;
    column-gap: 20px;
}

@media (min-width: 992px) {
    flex-direction: column;
    row-gap: 10px;
}
`

const SkeletonSvg = styled.svg`
    margin: 30px 0 0 0;
    width: 100%;
`;

export { InfoWrapper, ItemsList, HeadInfo, ButtonWrap, TitleWrapper, SideHead, SkeletonSvg };