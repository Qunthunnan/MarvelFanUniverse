import { Component } from "react";

import styled from "styled-components";

import { Directory } from '../Directory/Directory';
import { H1 } from "../style/H1";
import { Container } from "../style/Container";
import mainBg from "../../resources/imgs/mainBg.png";
import refCharacter from "../../resources/imgs/characterRef.jpg";
import refComics from "../../resources/imgs/comics.jpg";
import { RandomCharacter } from "../RandomCharacter/RandomCharacter";
import { CharactersList } from "../CharactersList/CharactersList";
import { CharacterInfo } from "../CharacterInfo/CharacterInfo";
import { SearchCharacter } from "../SearchCharacter/SearchCharacter";
import { ComicsBaner } from "../ComicsBaner/ComicsBaner";
import { CharacterDetailed } from "../CharacterDetailed/CharacterDetailed";
import { ComicsList } from "../ComicsList/ComicsList";
import { ComicsDetailed } from "../ComicsDetailed/ComicsDetailed";
import { ApiService } from "../ApiService/ApiService";

class App extends Component {
	constructor(props) {
		super(props);

		// this.characters = {}
		// this.service = new ApiService();
		// const result = this.service.getCharacter(1010903);
		// result.then( data => {this.characters = data; console.log(this.characters)} );

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
			],
			comicses: [
				{name: 'ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB', price: 10.01, image: refComics},
				{name: 'X-Men: Days of Future Past', price: null, image: refComics},
				{name: 'ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB', price: 10.01, image: refComics},
				{name: 'X-Men: Days of Future Past', price: 10.11, image: refComics},
				{name: 'ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB', price: 10.01, image: refComics},
				{name: 'ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB', price: 10.01, image: refComics},
				{name: 'X-Men: Days of Future Past', price: null, image: refComics},
				{name: 'X-Men: Days of Future Past', price: null, image: refComics},
			]
		}
	}
	render () {
		const { directories, characters, comicses } = this.state;
		const MainDiv = styled.div`
			background: ${({bg}) => ( bg === 'false' ? '' : 'url(${mainBg}) no-repeat right bottom')};
			padding: 0 0 45px;
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

		const AsideWrapper = styled.div`
			display: flex;
			flex-direction: column;
			row-gap: 30px;
		`;

	return (

		<MainDiv bg='false'>
			<Container>
				<header>
					<H1><span>Marvel</span> Fan Universe</H1>
					<Directory list={ directories.list } active={ directories.active }></Directory>
				</header>
				{/* <RandomCharacter></RandomCharacter>
				<CharactersContentWrapper>
					<CharactersList characters={characters}></CharactersList>
					<AsideWrapper>
						<CharacterInfo character={{
												name: 'Stark',
												image: refCharacter,
												description: 'In Norse mythology, Loki is a god or jötunn (or both). Loki is the son of Fárbauti and Laufey, and the brother of Helblindi and Býleistr. By the jötunn Angrboða, Loki is the father of Hel, the wolf Fenrir, and the world serpent Jörmungandr. By Sigyn, Loki is the father of Nari and/or Narfi and with the stallion Svaðilfari as the father, Loki gave birth—in the form of a mare—to the eight-legged horse Sleipnir. In addition, Loki is referred to as the father of Váli in the Prose Edda.',
												comics: ['comiscs 1', 'sfshlfshkjfshjskfhhf', 'slfhfifhkahsfkahjaksfdnslfhfifhkahsfkahjaksfdnslfhfifhkahsfkahjaksfdnslfhfifhkahsfkahjaksfdn', 'sfwihwihwwihsfwihwihwwihsfwihwihwwihsfwihwihwwihsfwihwihwwihsfwihwihwwih', 'sfwihwihwwih', 'sfwihwihwwih', 'sfwihwihwwih', 'sfwihwihwwih', 'sfwihwihwwih', 'sfwihwihwwih']
						} }></CharacterInfo>
						<SearchCharacter></SearchCharacter>
					</AsideWrapper>

				</CharactersContentWrapper> */}
				<ComicsBaner margin={'29px 0 0 0'}></ComicsBaner>
				{/* <CharacterDetailed name={'Loki'} description={'In Norse mythology, Loki is a god or jötunn (or both). Loki is the son of Fárbauti and Laufey, and the brother of Helblindi and Býleistr. By the jötunn Angrboða, Loki is the father of Hel, the wolf Fenrir, and the world serpent Jörmungandr. By Sigyn, Loki is the father of Nari and/or Narfi and with the stallion Svaðilfari as the father, Loki gave birth—in the form of a mare—to the eight-legged horse Sleipnir. In addition, Loki is referred to as the father of Váli in the Prose Edda.'} image={refCharacter} margin={'45px 0 0 0'}></CharacterDetailed> */}
				<ComicsDetailed name={'X-Men: Days of Future Past'} description={"Re-live the legendary first journey into the dystopian future of 2013 - where Sentinels stalk the Earth, and the X-Men are humanity's only hope...until they die! Also featuring the first appearance of Alpha Flight, the return of the Wendigo, the history of the X-Men from Cyclops himself...and a demon for Christmas!?"} pages={144} image={refComics} lang={'en-US'} price={9.99} margin={'45px 0 0 0'}></ComicsDetailed>
				{/* <ComicsList comicses={comicses}></ComicsList> */}
			</Container>
		</MainDiv>
	  );
  }
}

export default App;
