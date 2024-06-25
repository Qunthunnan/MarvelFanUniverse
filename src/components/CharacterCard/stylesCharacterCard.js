import styled from "styled-components";
import { vars } from "../style/Vars";

const CharacterItem = styled.li`
            @media (min-width: 320px) {
                cursor: pointer;
                display: flex;
                aspect-ratio: 200 / 318;
                flex-direction: column;
                box-shadow: ${({$active}) => ( $active ? ('0px 3px 15px 5px' + vars.marvelRed + '90')  : '0px 3px 15px 5px rgba(0, 0, 0, 0.3)')};
                transform: ${({$active}) => ( $active ? ('translateY(-5px)')  : null )};
                transition: all 0.5s;
                &:focus {
                    box-shadow: 0px 3px 15px 5px ${vars.marvelRed}90;
                }
                img {
                    object-fit: cover;
                    width: 100%;
                    height: fit-content;
                    aspect-ratio: 1 / 1;
                }
                h2 {
                    font-size: 1.2rem;
                    font-weight: 700;
                    word-break: break-word;
                }
            }

            @media (min-width: 576px) {
                h2 {
                    font-size: 1.3rem;
                }
            }
`;
const CardBg = styled.div`
    background-color: ${vars.lightBlack};
    padding: 15px;
    flex-grow: 1;
    h2 {
        text-transform: uppercase;
        color: #fff;
    }
`;

export { CharacterItem, CardBg }