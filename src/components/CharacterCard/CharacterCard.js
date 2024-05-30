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
        const { active } = this.state;
        const {name, image} = this.props,
        
        CharacterItem = styled.li`
            @media (min-width: 320px) {
                cursor: pointer;
                display: flex;
                height: 222.60px;
                width: 140px;
                flex-direction: column;
                box-shadow: ${({active}) => ( active ? ('0px 3px 15px 5px' + vars.marvelRed + '90')  : '0px 3px 15px 5px rgba(0, 0, 0, 0.3)')};
                transform: ${({active}) => ( active ? ('translateY(5px)')  : 'unset')};
                img {
                    height: 140px;
                    width: 140px;
                }
            }

            @media (min-width: 576px) {
                height: 318px;
                width: 200px;
                img {
                    object-fit: cover;
                    height: 200px;
                    width: 200px;
                }
            }

        `,
        CardBg = styled.div`
            background-color: ${vars.lightBlack};
            padding: 5px 15px;
            flex-grow: 1;
            h2 {
                text-transform: uppercase;
                color: #fff;
            }
        `;

        return(
            <CharacterItem active={active}>
                <img height={200} width={200} src={image} alt={`character ${name}`} />
                <CardBg>
                    <h2>{name}</h2>
                </CardBg>
            </CharacterItem>
        )
    }
}