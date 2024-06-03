import styled from "styled-components"
import { Aside } from "../style/Aside";


const InfoWrapper = styled(Aside)`
@media (min-width: 320px) {
    order: 2;
    display: ${ ({$mobileActive}) => ( $mobileActive ? 'unset' : 'none' ) };
    position: relative;
    height: 100%;
    width: 100vw;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: auto;
    h2 {
        display: ${({$active}) => ( $active ? 'none' : 'unset' )};
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
    ul {
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
            cursor: pointer;
            margin: 0 0 10px 0;
            padding: 0 10px;
            &:last-child {
                margin: 0;
            }
        }
    }
}

@media (min-width: 576px) {
    height: 90vh;
    width: 90vw;
}

@media (min-width: 768px) {
    position: static;
    overflow: unset;
    transform: none;
    display: unset;
    height: unset;
    width: 300px;
    order: 1;
}

@media(min-width: 992px) {
    width: 400px;
}

@media(min-width: 1400px) {
    width: 425px;
}
`,
HeadInfo = styled.div`
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
`,
SideHead = styled.div`
@media (min-width: 320px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h2 {
        text-align: unset;
        font-size: 22px;
        font-weight: 700;
    }
    div {
        display: flex;
        column-gap: 20px;
        row-gap: 10px;
    }
}

@media (min-width: 768px) {
    div {
        flex-direction: row;
        column-gap: 20px;
    }
}

@media (min-width: 992px) {
    div {
        flex-direction: column;
        row-gap: 10px;
    }
}
`,
SkeletonSvg = styled.svg`
    margin: 30px 0 0 0;
    width: 100%;
`;

export { InfoWrapper, HeadInfo, SideHead, SkeletonSvg };