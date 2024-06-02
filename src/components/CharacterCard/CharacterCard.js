import { Component, act } from "react";
import { CharacterItem, CardBg } from './stylesCharacterCard';

export class CharacterCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
        }
    }
    render() {
        const {name, thumbnail, onOpenCharacter} = this.props;
        const { active } = this.state;

        return(
            <CharacterItem onClick={ onOpenCharacter } $active={active}>
                <img height={200} width={200} src={thumbnail.path + '.' + thumbnail.extension} alt={`character ${name}`} />
                <CardBg>
                    <h2>{name}</h2>
                </CardBg>
            </CharacterItem>
        )
    }

    onClick = () => {
        const { active } = this.state;
        const { onOpenCharacter } = this.props;

        if(!active) {
            this.setState({
                active: true,
            });

            onOpenCharacter();
        }
    }

    onCloseMobileCharacterInfo = () => {
        const { active } = this.state;
        if ( active )
            this.setState({
                active: false
        });
    }
}