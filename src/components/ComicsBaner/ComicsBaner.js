import styled from "styled-components";
import avengersBanerLogo from '../../resources/imgs/avengersBanerLogo.png';
import avengersBaner from '../../resources/imgs/avengersBaner.png';
import { vars } from "../style/Vars";

const ComicsBaner = function({ margin }) {
    const Baner = styled.div`
        margin: ${({margin}) => ( margin ? margin : '0 0 0 0' )};
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        background-color: ${vars.lightBlack};
        justify-content: center;
        height: 100px;
        padding: 0 25px 0 45px;
        img {
            &:first-child {
                align-self: start;
            }
            &:last-child {
                align-self: end;
            }
        }
        h2 {
            align-self: start;
            font-size: 24px;
            font-weight: 700;
            color: #fff;
            margin: 0;
        }
    `;
    return(
        <Baner margin={margin}>
            <img height={100} width={152}  src={avengersBaner} alt="Marvel characters" />
            <h2>New comics every week!<br/>Stay tuned!</h2>
            <img height={100} width={133} src={avengersBanerLogo} alt="Avangers logo" />
        </Baner>
    )
}

export { ComicsBaner };