import { Component } from "react";

import { CharacterCard } from "../CharacterCard/CharacterCard";

export class CharactersList extends Component {
    render() {
        const { characters } = this.props;

        const charactersListItems = characters.map(({name, image}, i) => ( <CharacterCard name={ name } image={ image }></CharacterCard> ));
        return (<ul>
            {[...charactersListItems]}
        </ul>)
    }
}