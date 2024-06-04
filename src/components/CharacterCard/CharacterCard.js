import { Component, act } from "react";
import { CharacterItem, CardBg } from './stylesCharacterCard';

export class CharacterCard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { character: { name, thumbnail }, onOpenCharacter, isActive } = this.props;

        return(
            <CharacterItem onClick={ onOpenCharacter } title={name} $active={isActive}>
                <img height={200} width={200} style={{objectFit: this.isFindThumbnail(thumbnail) ? 'cover' : 'fill'}} src={thumbnail.path + '.' + thumbnail.extension} alt={`character ${name}`} />
                <CardBg>
                    <h2>{this.cutName(name)}</h2>
                </CardBg>
            </CharacterItem>
        )
    }

    cutName(name) {
        if(name.length >= 15) {
            return name.slice(0, 15) + '...';
        }
        return name;
    }

    isFindThumbnail(thumbnail) {
        let findThumbNail = true;
        if(thumbnail.path === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" || thumbnail.path === "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708")
            findThumbNail = false;

        return findThumbNail;
    }

    onCloseMobileCharacterInfo = () => {
        const { active } = this.state;
        if ( active )
            this.setState({
                active: false
        });
    }
}