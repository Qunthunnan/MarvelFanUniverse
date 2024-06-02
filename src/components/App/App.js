import { Component } from "react";

import { H1 } from "../style/H1";
import { Container } from "../style/Container";
import { MainDiv, CharactersContentWrapper, AsideWrapper, MobileMenuButtons } from "./stylesApp";

import { Directory } from '../Directory/Directory';
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
import { ApiService } from "../../services/ApiService/ApiService";
import { Loader } from "../Loader/Loader";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			directories: {
				list: ['Characters', 'Comics'],
				active: 'Characters'
			},
			activeCharacter: null,
			mobileSearchShowed: false,
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
		const { directories, characters, comicses, mobileSearchShowed, activeCharacter } = this.state;
	return (
		<MainDiv $bg={ true }>
			<Container>
				<header>
					<H1><span>Marvel</span> Fan Universe</H1>
					<Directory list={ directories.list } active={ directories.active }></Directory>
				</header>

				<RandomCharacter/>

				<MobileMenuButtons>
					<svg onClick={ this.onSwichSearch } xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
						<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
					</svg>
				</MobileMenuButtons>

				<CharactersContentWrapper>
					<CharactersList onCloseMobileCharacterInfo={this.onCloseMobileCharacterInfo} onOpenCharacter={this.onOpenCharacter} characters={characters}></CharactersList>
					<AsideWrapper>
						<CharacterInfo
						character={ activeCharacter }
						onCloseMobileCharacterInfo={this.onCloseMobileCharacterInfo}></CharacterInfo>
						<SearchCharacter mobileSearchShowed={ mobileSearchShowed } onSwichSearch={this.onSwichSearch}></SearchCharacter>
					</AsideWrapper>
				</CharactersContentWrapper>
				{/* <ComicsBaner></ComicsBaner>
				<CharacterDetailed name={'Loki'} description={'In Norse mythology, Loki is a god or jötunn (or both). Loki is the son of Fárbauti and Laufey, and the brother of Helblindi and Býleistr. By the jötunn Angrboða, Loki is the father of Hel, the wolf Fenrir, and the world serpent Jörmungandr. By Sigyn, Loki is the father of Nari and/or Narfi and with the stallion Svaðilfari as the father, Loki gave birth—in the form of a mare—to the eight-legged horse Sleipnir. In addition, Loki is referred to as the father of Váli in the Prose Edda.'} image={refCharacter}></CharacterDetailed> */}
				{/* <ComicsDetailed name={'X-Men: Days of Future Past'} description={"Re-live the legendary first journey into the dystopian future of 2013 - where Sentinels stalk the Earth, and the X-Men are humanity's only hope...until they die! Also featuring the first appearance of Alpha Flight, the return of the Wendigo, the history of the X-Men from Cyclops himself...and a demon for Christmas!?"} pages={144} image={refComics} lang={'en-US'} price={9.99}></ComicsDetailed> */}
				{/* <ComicsList comicses={comicses}></ComicsList> */}
			</Container>
		</MainDiv>
	  );
  }

	onSwichSearch = (e) => {
		this.setState(({mobileSearchShowed}) => ({mobileSearchShowed: !mobileSearchShowed}) );
	}
	
	onOpenCharacter = (character) => {
		this.setState({
			activeCharacter: character
		});
 	}

	onCloseMobileCharacterInfo = () => {
		this.setState({
			activeCharacter: null
		});
	}
}

export default App;
