import { Component } from "react";
import styled from "styled-components";

import refCharacter from '../../resources/imgs/characterRef.jpg';
import hammer from '../../resources/imgs/hammer.png';
import { vars } from "../style/Vars";
import { Button } from "../style/Button";


export class RandomCharacter extends Component {

    render() {
        const Wrapper = styled.section`
            margin: 19px 0 0 0;
            display: grid;
            grid-template: 1fr / 1fr 1fr;
            box-shadow: 0px 3px 15px 1px rgba(0, 0, 0, 0.3);
        `
        const RandomCharacterInfo = styled.div`
            display: flex;
            column-gap: 30px;
            padding: 35px 40px;
            div {

            }
            h2 {
                margin: 0 0 10px 0;
                font-size: 22px;
                font-weight: 700;
            }
            p {
                line-height: 16px;
                font-size: 14px;
                font-weight: 400;
                margin: 0 0 0px 0;
            }
        `,
        InfoWrapper = styled.div`
                display: flex;
                flex-direction: column;
                justify-content: space-between;
        `,
        RandomBaner = styled.div`
            display: flex;    
            flex-direction: column;
            justify-content: space-between;
            color: #fff;
            padding: 35px 40px;
            background: url(${hammer}) no-repeat 110% 77%;
            background-color: ${vars.lightBlack};
            h2 {
                font-size: 24px;
                font-weight: 700;
                &:nth-child(2) {
                    margin: 20px 0 0 0;
                }
            }
        `;

        const ButtonsWrapper = styled.div`
            display: flex;
        `;
        return(
            <Wrapper>
                <RandomCharacterInfo>
                    <img src={refCharacter} alt="character" height={180} width={180} />
                    <InfoWrapper>
                        <div>
                            <h2>Character Name</h2>
                            <p>As the Norse God of thunder and lightning, Thor wields one of the greatest weapons ever made, the enchanted hammer Mjolnir. While others have described Thor as an over-muscled, oafish imbecile, he's quite smart and compassionate...</p>
                        </div>
                        <ButtonsWrapper>
                            <Button margin={'0 35px 0 0'}>HOMEPAGE</Button>
                            <Button color={vars.marvelGray}>WIKI</Button>
                        </ButtonsWrapper>
                    </InfoWrapper>
                </RandomCharacterInfo>
                <RandomBaner>
                    <h2>Random character for today!<br/>Do you want to get to know him better?</h2>
                    <h2>Or choose another one!</h2>
                    <Button>TRY IT</Button>
                </RandomBaner>
            </Wrapper>
        )
    }
}