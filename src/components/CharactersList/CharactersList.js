import { Component } from "react";

import styled from "styled-components";

import { CharacterCard } from "../CharacterCard/CharacterCard";
import { WideButton } from "../style/WideButton";

export class CharactersList extends Component {
    render() {
        const { characters } = this.props;
        const List = styled.ul`
            padding: 0;
            display: grid;
			grid-template: auto auto auto / auto auto auto;
            grid-auto-rows: auto;
            row-gap: 30px;
            column-gap: 25px;
        `;

        const charactersListItems = characters.map(({name, image}, i) => ( <CharacterCard key={i} name={ name } image={ image }></CharacterCard> ));
        return (
        <section>
            <List>
                {[...charactersListItems]}
            </List>
            <WideButton margin={'45px auto 0'}>LOAD MORE</WideButton>
        </section>

        );


    }
}