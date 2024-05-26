import { Component } from "react";

import styled from "styled-components";

import { Directory } from '../Directory/Directory';
import { H1 } from "../style/H1";
import { Container } from "../style/Container";
import mainBg from "../../resources/imgs/mainBg.png";
import refCharacter from "../../resources/imgs/characterRef.jpg"
import { RandomCharacter } from "../RandomCharacter/RandomCharacter";
import { CharactersList } from "../CharactersList/CharactersList";

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
		`;

	return (

		<MainDiv>
			<Container>
				<header>
					<H1><span>Marvel</span> fan portal</H1>
					<Directory list={ directories.list } active={ directories.active }></Directory>
				</header>
				<RandomCharacter></RandomCharacter>
				<CharactersContentWrapper>
					<CharactersList characters={characters}></CharactersList>
				</CharactersContentWrapper>
			</Container>
		</MainDiv>
	  );
  }
}

export default App;
