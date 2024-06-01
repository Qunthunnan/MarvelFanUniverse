import { Component } from "react";
import { CharacterItem, CardBg } from './stylesCharacterCard';

export class CharacterCard extends Component {
    render() {
        const {name, image, onOpenCharacter, active} = this.props;

        return(
            <CharacterItem onClick={ onOpenCharacter } $active={active}>
                <img height={200} width={200} src={image} alt={`character ${name}`} />
                <CardBg>
                    <h2>{name}</h2>
                </CardBg>
            </CharacterItem>
        )
    }
}