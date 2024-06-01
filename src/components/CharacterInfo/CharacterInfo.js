import { Component } from "react";

import { vars } from "../style/Vars";
import { Button } from "../style/Button";
import { CloseBtn } from "../style/CloseBtn";
import { InfoWrapper, HeadInfo, SideHead, SkeletonSvg } from "./stylesCharacterInfo";

export class CharacterInfo extends Component {
    render() {
        const { character, onCloseMobileCharacterInfo } = this.props;
        const comicsesItems = character ? character.comics.map((item, i) => ( <li key={i}>{ item }</li> )) : null;

        const content = character ? ( <>
            <HeadInfo>
                <img height={150} width={150} src={character.image} alt={"character" + character.name}/>
                <SideHead>
                    <h2>{character.name}</h2>
                    <div>
                        <Button>HOMEPAGE</Button>
                        <Button color={vars.marvelGray}>WIKI</Button>
                    </div>
                </SideHead>
            </HeadInfo>
            <p>{ character.description }</p>
            <div>
                <h3>Comics:</h3>
                <ul> {comicsesItems} </ul>
            </div>
        </> ) : ( <>
            <h2 $active={ character }>Please select a character to see information</h2>
            <SkeletonSvg style={{ display: character ? 'none' : 'block' }} width="375" height="190" viewBox="0 0 375 190" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="20" fill="#C4C4C4"/>
                <rect x="49" y="12" width="326" height="16" fill="#C4C4C4"/>
                <rect y="55" width="375" height="35" fill="#C4C4C4"/>
                <rect y="105" width="375" height="35" fill="#C4C4C4"/>
                <rect y="155" width="375" height="35" fill="#C4C4C4"/>
            </SkeletonSvg>
        </> );
        return (
        <InfoWrapper $mobileActive={ character }>
            <CloseBtn onClick={ onCloseMobileCharacterInfo }>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                </svg>
            </CloseBtn>
            {content}
        </InfoWrapper>
        )
    }
}