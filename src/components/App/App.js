import { Component } from "react";

import styled from "styled-components";

import { Directory } from '../Directory/Directory';
import { H1 } from "../style/H1";
import { Container } from "../style/Container";
import mainBg from "../../resources/imgs/mainBg.png";
import refCharacter from "../../resources/imgs/characterRef.jpg"
import { RandomCharacter } from "../RandomCharacter/RandomCharacter";
import { CharactersList } from "../CharactersList/CharactersList";
import { CharacterInfo } from "../CharacterInfo/CharacterInfo";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			directories: {
				list: ['Characters', 'Comics'],
				active: 'Characters'
			},
			characters: [
				{name: 'Abys', image: refCharacter},
				{name: 'Loki', image: refCharacter},
				{name: 'Adam Warlok', image: refCharacter},
				{name: 'Boom Boom', image: refCharacter},
				{name: 'Calypso', image: refCharacter},
				{name: 'Colleen Wing', image: refCharacter},
				{name: 'Daimon Helstorm', image: refCharacter},
				{name: 'Damage Control', image: refCharacter},
				{name: 'Hulk', image: refCharacter},
			]
		}
	}
	render () {
		const { directories, characters } = this.state;
		const MainDiv = styled.div`
			background: url(${mainBg}) no-repeat right bottom;
			padding: 0 0 1000px;
			header {
				padding: 52px 0 25px;
				display: flex;
				justify-content: space-between;
			}
		`;

		const CharactersContentWrapper = styled.div`
			display: flex;
			align-items: flex-start;
            flex-direction: row;
			justify-content: space-between;
			margin: 53px 0 0 0;
		`;

	return (

		<MainDiv>
			<Container>
				<header>
					<H1><span>Marvel</span> Fan Universeortal</H1>
					<Directory list={ directories.list } active={ directories.active }></Directory>
				</header>
				<RandomCharacter></RandomCharacter>
				<CharactersContentWrapper>
					<CharactersList characters={characters}></CharactersList>
					<CharacterInfo character={{
											name: 'Stark',
											image: refCharacter,
											description: 'In Norse mythology, Loki is a god or jötunn (or both). Loki is the son of Fárbauti and Laufey, and the brother of Helblindi and Býleistr. By the jötunn Angrboða, Loki is the father of Hel, the wolf Fenrir, and the world serpent Jörmungandr. By Sigyn, Loki is the father of Nari and/or Narfi and with the stallion Svaðilfari as the father, Loki gave birth—in the form of a mare—to the eight-legged horse Sleipnir. In addition, Loki is referred to as the father of Váli in the Prose Edda.',
											comics: ['comiscs 1', 'sfshlfshkjfshjskfhhf', 'slfhfifhkahsfkahjaksfdn', 'sfwihwihwwih']
					} }></CharacterInfo>
				</CharactersContentWrapper>
			</Container>
		</MainDiv>
	  );
  }
}

export default App;
