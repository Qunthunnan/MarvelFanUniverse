import styled from "styled-components";
import { vars } from "../style/Vars";

const CharacterItem = styled.li`
    cursor: pointer;
    height: 318px;
    width: 200px;
    display: flex;
    flex-direction: column;
    box-shadow: ${({$active}) => ( $active ? ('0px 3px 15px 5px' + vars.marvelRed + '90')  : '0px 3px 15px 5px rgba(0, 0, 0, 0.3)')};
    transform: ${({$active}) => ( $active ? ('translateY(5px)')  : 'unset')};
`;
const CardBg = styled.div`
    background-color: ${vars.lightBlack};
    padding: 5px 15px;
    flex-grow: 1;
    h2 {
        text-transform: uppercase;
        color: #fff;
    }
`;

export {CharacterItem, CardBg}