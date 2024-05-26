import { Component } from "react";

import styled from "styled-components";

import { vars } from "../style/Vars";

export class CharacterCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        }
    } 
    render() {
        const {name, image} = this.props,
        
        CharacterItem = styled.li`
            height: 318px;
            width: 200px;
            display: flex;
            flex-direction: column;
            box-shadow: ${({active}) => ( active ? '0px 2px 15px -3px rgba(0,0,0,0.1)' : 'unset')};
        `,
        CardBg = styled.div`
            background-color: ${vars.lightBlack};
            h2 {
                text-transform: uppercase;
                color: #fff;
            }
        `;

        return(
            <CharacterItem>
                <img height={200} width={200} src={image} alt={`character ${name}`} />
                <CardBg>
                    <h2>{name}</h2>
                </CardBg>
            </CharacterItem>
        )
    }
}