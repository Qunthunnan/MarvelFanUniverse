import { Component } from "react";

import styled from "styled-components";

import { CharacterCard } from "../CharacterCard/CharacterCard";
import { WideButton } from "../style/WideButton";
import refCharacter from '../../resources/imgs/characterRef.jpg';

export class CharactersList extends Component {
    render() {
        const { characters, onOpenCharacter } = this.props;
        const List = styled.ul`
            @media (min-width: 320px) {
                margin: 0;
                padding: 0;
                display: grid;
                justify-content: space-evenly;
                grid-template: auto auto / auto auto;
                grid-auto-rows: auto;
                row-gap: 20px;
            }

            @media (min-width: 576px) {
                justify-content: space-around;
            }

            @media (min-width: 768px) {
                justify-content: flex-start;
                column-gap: 20px;
            }

            @media (min-width: 992px) {
                grid-template: auto auto auto / auto auto auto;
                column-gap: 25px;
            }
        `;

        const Section = styled.section`
            @media (min-width: 320px) {
                flex: 1;
            }
        `;

        const character = {
            name: 'Stark',
            image: refCharacter,
            description: 'In Norse mythology, Loki is a god or jötunn (or both). Loki is the son of Fárbauti and Laufey, and the brother of Helblindi and Býleistr. By the jötunn Angrboða, Loki is the father of Hel, the wolf Fenrir, and the world serpent Jörmungandr. By Sigyn, Loki is the father of Nari and/or Narfi and with the stallion Svaðilfari as the father, Loki gave birth—in the form of a mare—to the eight-legged horse Sleipnir. In addition, Loki is referred to as the father of Váli in the Prose Edda.',
            comics: ['comiscs 1', 'sfshlfshkjfshjskfhhf', 'slfhfifhkahsfkahjaksfdnslfhfifhkahsfkahjaksfdnslfhfifhkahsfkahjaksfdnslfhfifhkahsfkahjaksfdn', 'sfwihwihwwihsfwihwihwwihsfwihwihwwihsfwihwihwwihsfwihwihwwihsfwihwihwwih', 'sfwihwihwwih', 'sfwihwihwwih', 'sfwihwihwwih', 'sfwihwihwwih', 'sfwihwihwwih', 'sfwihwihwwih']
        };

        const WideButtonBottom = styled(WideButton)`
            margin: 45px auto 0;
        `;

        const charactersListItems = characters.map(({name, image}, i) => ( <CharacterCard onOpenCharacter={ () => { onOpenCharacter(character) } } key={i} name={ name } image={ image }></CharacterCard> ));
        return (
        <Section>
            <List>
                {[...charactersListItems]}
            </List>
            <WideButtonBottom>LOAD MORE</WideButtonBottom>
        </Section>
        );
    }
}