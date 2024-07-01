import styled from "styled-components";
import mainBg from "../../resources/imgs/mainBg.png";

const AppContentWrapper = styled.div`
@media (min-width: 320px) {
    padding: 80px 0 0 0;
}

@media (min-width: 576px) {
    padding: 100px 0 0 0;
}

@media (min-width: 768px) {
    padding: 100px 0 0 0;
}
`

const MainDiv = styled.div`
padding: 0 0 45px;
@media (min-width: 576px) {
    background: ${({$bg}) => ( $bg ? 'url('+mainBg+') no-repeat right bottom' : '')};
}

@media (max-width: 576px) {
    header {
        padding: 15px 10px;
    }
    padding: 0 0 25px;
}
`;

const CharactersContentWrapper = styled.div`
@media (min-width: 320px) {
    margin: 30px 0 0 0;
    position: relative;
}

@media (min-width: 768px) {
    margin: 30px 0 0 0;
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    justify-content: space-between;
    margin: 53px 0 0 0;
    column-gap: 15px;
}

@media (min-width: 992px) {
    column-gap: 25px;
}
`;

const AsideWrapper = styled.div`
@media (min-width: 320px) {
    position: fixed;
    height: 100svh;
    top: 0;
    z-index: 2;
    transform: translateX(100%);
}

@media (min-width: 320px) {
    left: 0;
    top: 0;
}

@media (min-width: 768px) {
    display: flex;
    height: max-content;
    flex-direction: column;
    position: sticky;
    row-gap: 30px;
    left: none;
    top: 100px;
    transform: none;
}
`;

const MobileMenuButtons = styled.nav`
@media (min-width: 320px) {
    display: flex;
    justify-content: flex-end;
    column-gap: 30px;
    padding: 15px;
    svg {
        height: 30px;
        width: 30px;
    }
}
@media (min-width: 768px) {
    display: none;
}
`;

export { MainDiv, CharactersContentWrapper, AsideWrapper, MobileMenuButtons, AppContentWrapper }; 