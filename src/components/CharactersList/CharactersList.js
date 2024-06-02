import { Component } from "react";

import { CharacterCard } from "../CharacterCard/CharacterCard";
import refCharacter from '../../resources/imgs/characterRef.jpg';

import { List, Section, WideButtonBottom } from "./stylesCharacterList";

export class CharactersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeCharacter: undefined
        }
    }
    render() {
        const { activeCharacter } = this.state;
        const { characters, onOpenCharacter } = this.props;

        const character = {
            name: 'Stark',
            image: refCharacter,
            description: 'In Norse mythology, Loki is a god or jötunn (or both). Loki is the son of Fárbauti and Laufey, and the brother of Helblindi and Býleistr. By the jötunn Angrboða, Loki is the father of Hel, the wolf Fenrir, and the world serpent Jörmungandr. By Sigyn, Loki is the father of Nari and/or Narfi and with the stallion Svaðilfari as the father, Loki gave birth—in the form of a mare—to the eight-legged horse Sleipnir. In addition, Loki is referred to as the father of Váli in the Prose Edda.',
            comics: ['comiscs 1', 'sfshlfshkjfshjskfhhf', 'slfhfifhkahsfkahjaksfdnslfhfifhkahsfkahjaksfdnslfhfifhkahsfkahjaksfdnslfhfifhkahsfkahjaksfdn', 'sfwihwihwwihsfwihwihwwihsfwihwihwwihsfwihwihwwihsfwihwihwwihsfwihwihwwih', 'sfwihwihwwih', 'sfwihwihwwih', 'sfwihwihwwih', 'sfwihwihwwih', 'sfwihwihwwih', 'sfwihwihwwih']
        };

        const charactersListItems = characters.map(({name, image}, i) => ( <CharacterCard onOpenCharacter={ () => { 
            onOpenCharacter(character); 
            this.onClickCharacter(i); 
        } } key={i} name={ name } active={ activeCharacter === i ? true : false } image={ image }></CharacterCard> ));
        return (
        <Section>
            <List>
                {[...charactersListItems]}
            </List>
            <WideButtonBottom>LOAD MORE</WideButtonBottom>
        </Section>
        );
    }

    onClickCharacter = (id) => {
        this.setState({
            activeCharacter: id
        });
    }
}