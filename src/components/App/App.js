import { useCallback, useEffect, useState, useMemo, useRef } from "react";
import React from "react";

import { H1 } from "../style/H1";
import { Container } from "../style/Container";
import { MainDiv, CharactersContentWrapper, AsideWrapper, MobileMenuButtons } from "./stylesApp";

import { Directory } from '../Directory/Directory';
import { ErrorBoundary } from "../ErrorBoundary/ErrorBoundary";
import { RandomCharacter } from "../RandomCharacter/RandomCharacter";
import { CharactersList } from "../CharactersList/CharactersList";
import { CharacterInfo } from "../CharacterInfo/CharacterInfo";
import { SearchCharacter } from "../SearchCharacter/SearchCharacter";
// import { ComicsBaner } from "../ComicsBaner/ComicsBaner";
// import { CharacterDetailed } from "../CharacterDetailed/CharacterDetailed";
// import { ComicsList } from "../ComicsList/ComicsList";
// import { ComicsDetailed } from "../ComicsDetailed/ComicsDetailed";
import { useMarvelService } from "../../services/ApiService/ApiService";
import { Loader } from "../Loader/Loader";
import Error from "../Error/Error";

export function App () {
	const [directories, setDirectories] = useState({
		list: ['Characters', 'Comics'],
		active: 'Characters',
	});

	const [mobileSearchShowed, setMobileSearchShowed] = useState(false);

	const [activeCharacter, setActiveCharacter] = useState();

	useEffect(()=>{ 
		console.log('main mounted, started updateCharacters');
		upadateMaxCharacterCount(); 
	}, []);
	
	const onCloseMobileCharacterInfo = useCallback(() => {
		setActiveCharacter(null);
	}, []); 

	const onSwichSearch = useCallback((e) => {
		setMobileSearchShowed(!mobileSearchShowed);
	}, []);
	
	const onOpenCharacter = useCallback((character) => {
		setActiveCharacter(character)
	}, []);

	const onSearch = useCallback((name) => {
        setSearching(name);
    }, []);

	const { error, loading, getCharactersCount } = useMarvelService();

	const [charactersMaxCount, setCharactersMaxCount] = useState(0);

	const [searching, setSearching] = useState(false);

	let background = !loading;
	console.log(`background: ${background}`);


	const loaderSpiner = loading ? (
		<Container>
			<Loader/>
		</Container> ) : null;

	const catchedError = error ? (
	<Container>
		<Error/>
		<p>A system error has occurred, please try again later</p>
	</Container>) : null;

	console.log(`render preMain, count: ${charactersMaxCount}`);

	const mainContent = useMemo(() => (!(loading || error || charactersMaxCount <= 0) ? <ContentView directories={directories} 
	charactersMaxCount = { charactersMaxCount } 
	onCloseMobileCharacterInfo = { onCloseMobileCharacterInfo }
	activeCharacter = { activeCharacter }
	onSwichSearch = { onSwichSearch }
	mobileSearchShowed = { mobileSearchShowed }
	onOpenCharacter= { onOpenCharacter }
	searching = { searching }
	onSearch={onSearch}/> : null));

	function upadateMaxCharacterCount () {
		getCharactersCount()
		.then(count => {
			console.log(`characters geted: ${count}`)
			setCharactersMaxCount(count);
		} );
	}
		
	return (
		<MainDiv $bg={ background }>
			{mainContent}
			{loaderSpiner}
			{catchedError}
		</MainDiv>
	);
}

const ContentView = React.memo(({directories, charactersMaxCount, activeCharacter, onCloseMobileCharacterInfo, mobileSearchShowed, onOpenCharacter, onSwichSearch, cancelSearch, onSearch, searching}) => {
	return (
		<Container>
			<header>
				<H1><span>Marvel</span> Fan Universe</H1>
				<Directory list={ directories.list } active={ directories.active }></Directory>
			</header>
			<ErrorBoundary>
				<RandomCharacter charactersMaxCount={charactersMaxCount}/>
			</ErrorBoundary>

			<MobileMenuButtons>
				<svg onClick={ onSwichSearch } xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
					<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
				</svg>
			</MobileMenuButtons>

			<CharactersContentWrapper>
				<ErrorBoundary>
					<CharactersList charactersMaxCount={ charactersMaxCount } 
					onCloseMobileCharacterInfo={ onCloseMobileCharacterInfo } 
					activeCharacter={ activeCharacter } 
					onOpenCharacter={ onOpenCharacter }
					searchName = { searching }/>
				</ErrorBoundary>
				<AsideWrapper>
					<ErrorBoundary>
						<CharacterInfo
						character={ activeCharacter }
						onCloseMobileCharacterInfo={onCloseMobileCharacterInfo}/>
					</ErrorBoundary>
					<SearchCharacter mobileSearchShowed={ mobileSearchShowed } 
					onSwichSearch={onSwichSearch} 
					onSearch={onSearch} 
					cancelSearch={cancelSearch}/>
				</AsideWrapper>
			</CharactersContentWrapper>
			{/* <ComicsBaner></ComicsBaner>
			<CharacterDetailed name={'Loki'} description={'In Norse mythology, Loki is a god or jötunn (or both). Loki is the son of Fárbauti and Laufey, and the brother of Helblindi and Býleistr. By the jötunn Angrboða, Loki is the father of Hel, the wolf Fenrir, and the world serpent Jörmungandr. By Sigyn, Loki is the father of Nari and/or Narfi and with the stallion Svaðilfari as the father, Loki gave birth—in the form of a mare—to the eight-legged horse Sleipnir. In addition, Loki is referred to as the father of Váli in the Prose Edda.'} image={refCharacter}></CharacterDetailed> */}
			{/* <ComicsDetailed name={'X-Men: Days of Future Past'} description={"Re-live the legendary first journey into the dystopian future of 2013 - where Sentinels stalk the Earth, and the X-Men are humanity's only hope...until they die! Also featuring the first appearance of Alpha Flight, the return of the Wendigo, the history of the X-Men from Cyclops himself...and a demon for Christmas!?"} pages={144} image={refComics} lang={'en-US'} price={9.99}></ComicsDetailed> */}
			{/* <ComicsList comicses={comicses}></ComicsList> */}
	</Container>
	)
});