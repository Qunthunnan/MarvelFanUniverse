import styled from "styled-components";
import mainBg from "../../resources/imgs/mainBg.png";

const MainDiv = styled.div`
background: ${({$bg}) => ( $bg ? 'url('+mainBg+')no-repeat right bottom' : '')};
padding: 0 0 45px;
header {
    padding: 52px 0 25px;
    display: flex;
    justify-content: space-between;
}

@media (min-width: 576px) {
    header {
        padding: 20px 0;
    }
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
    margin: 0;
    position: relative;
}

@media (min-width: 768px) {
    margin: 30px 0 0 0;
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    justify-content: space-between;
    margin: 53px 0 0 0;
}
`;

const AsideWrapper = styled.div`
@media (min-width: 320px) {
    display: flex;
    position: fixed;
    height: 100%;
    top: 50%;
    left: 50%;
    row-gap: 30px;
    flex-direction: column;
    transform: translate(-50%, -50%);
}

@media (min-width: 768px) {
    position: static;
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

export { MainDiv, CharactersContentWrapper, AsideWrapper, MobileMenuButtons }; 