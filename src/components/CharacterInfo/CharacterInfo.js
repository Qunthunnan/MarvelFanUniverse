import { Component } from "react";
import styled from "styled-components"

import { vars } from "../style/Vars";
import { Button } from "../style/Button";
import { Aside } from "../style/Aside";

export class CharacterInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            character: null,
        }
    }
    render() {
        const { character } = this.props;
        const comicsesItems = character ? character.comics.map((item, i) => ( <li key={i}>{ item }</li> )) : null;

        const InfoWrapper = styled(Aside)`
            h2 {
                display: ${({active}) => ( active ? 'none' : 'block' )};
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

        `,
        HeadInfo = styled.div`
            display: flex;
            column-gap: 25px;
            img {
                object-fit: cover;
            }
        `,
        SideHead = styled.div`
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            h2 {
                text-align: unset;
                font-size: 22px;
                font-weight: 700;
            }
        `

        const content = character ? ( <>
            <HeadInfo>
                <img height={150} width={150} src={character.image} alt={"character" + character.name}/>
                <SideHead>
                    <h2>{character.name}</h2>
                    <div>
                        <Button margin={'0 0 10px 0'}>HOMEPAGE</Button>
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
            <h2 active={ character }>Please select a character to see information</h2>
            <svg style={{ display: character ? 'none' : 'block' }} width="375" height="190" viewBox="0 0 375 190" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="20" fill="#C4C4C4"/>
                <rect x="49" y="12" width="326" height="16" fill="#C4C4C4"/>
                <rect y="55" width="375" height="35" fill="#C4C4C4"/>
                <rect y="105" width="375" height="35" fill="#C4C4C4"/>
                <rect y="155" width="375" height="35" fill="#C4C4C4"/>
            </svg>
        </> );
        return (
        <InfoWrapper>
            {content}
        </InfoWrapper>
        )

    }
}