import { Component } from "react";
import styled from "styled-components"

import { vars } from "../style/Vars";
import { Button } from "../style/Button";
import { Aside } from "../style/Aside";
import { CloseBtn } from "../style/CloseBtn";

export class CharacterInfo extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { character, onCloseMobileCharacterInfo } = this.props;
        const comicsesItems = character ? character.comics.map((item, i) => ( <li key={i}>{ item }</li> )) : null;

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