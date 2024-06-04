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
import Error from "../Error/Error";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			directories: {
				list: ['Characters', 'Comics'],
				active: 'Characters',
			},
			loading: false,
			error: false,
			activeCharacter: null,
			mobileSearchShowed: false,
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
		this.charactersMaxCount = 0;
	}
	render () {
		const { loading, error, directories, comicses, mobileSearchShowed, activeCharacter } = this.state;
		const { charactersMaxCount } = this;

		const contentView = ( 
			<Container>
			<header>
				<H1><span>Marvel</span> Fan Universe</H1>
				<Directory list={ directories.list } active={ directories.active }></Directory>
			</header>

			<RandomCharacter charactersMaxCount={charactersMaxCount}/>

			<MobileMenuButtons>
				<svg onClick={ this.onSwichSearch } xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
					<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
				</svg>
			</MobileMenuButtons>

			<CharactersContentWrapper>
				<CharactersList charactersMaxCount={charactersMaxCount} onCloseMobileCharacterInfo={this.onCloseMobileCharacterInfo} activeCharacter={activeCharacter} onOpenCharacter={this.onOpenCharacter}></CharactersList>
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
		);

		const LoaderSpiner = loading ? (<Container>
				<Loader/>
			</Container> ) : null;

		const Error = error ? (<Container>
			<Error/>
		</Container>) : null;

		const MainContent = !(loading || error || this.charactersMaxCount <= 0) ? contentView : null;

		
		return (
			<MainDiv $bg={ true }>
				{MainContent}
				{LoaderSpiner}
				{Error}
			</MainDiv>
		);
  }

  	componentDidMount() {
		this.upadateMaxCharacterCount();
	}

	componentDidUpdate(prevProps, prevState) {
		console.log(this.state, prevState);
	}

	onSwichSearch = (e) => {
		this.setState(({mobileSearchShowed}) => ({mobileSearchShowed: !mobileSearchShowed}) );
	}
	
	onOpenCharacter = (character) => {
		console.log('onOpenChar');
		this.setState({
			activeCharacter: character
		});
 	}

	onCloseMobileCharacterInfo = () => {
		this.setState({
			activeCharacter: null
		});
	}

	setCharactersMaxCount = (count) => {
		this.charactersMaxCount = count;
	}

	upadateMaxCharacterCount = () => {
		this.setState({
			error: false,
			loading: true,
		});
		const marvelService = new ApiService();
		marvelService.getCharactersCount()
		.then(count => {
			this.setCharactersMaxCount(count);
			this.setState({
				error: false,
				loading: false
			});
		} )
		.catch(error => {
			this.setState({
				loading: false,
				error: true
			})
		});
	}

}

export default App;
