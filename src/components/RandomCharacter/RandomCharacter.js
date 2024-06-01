import { Component } from "react";

import refCharacter from '../../resources/imgs/characterRef.jpg';
import { Button } from "../style/Button";
import { Wrapper, RandomCharacterInfo, InfoWrapper, ButtonsWrapper, RandomBaner } from "./stylesRandomCharacter";
import { vars } from "../style/Vars";

export class RandomCharacter extends Component {

    render() {
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
                            <Button>HOMEPAGE</Button>
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