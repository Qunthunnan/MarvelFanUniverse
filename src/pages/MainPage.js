import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { Container } from "../components/style/Container";
import { ErrorBoundary } from "../components/ErrorBoundary/ErrorBoundary";
import { RandomCharacter } from "../components/RandomCharacter/RandomCharacter";
import { MainDiv, MobileMenuButtons, CharactersContentWrapper, AsideWrapper } from "../components/App/stylesApp";
import { Loader } from "../components/Loader/Loader";
import Error from "../components/Error/Error";
import { CharactersList } from "../components/CharactersList/CharactersList";
import { CharacterInfo } from "../components/CharacterInfo/CharacterInfo";
import { SearchCharacter } from "../components/SearchCharacter/SearchCharacter";
import { useMarvelService } from "../services/ApiService/ApiService";

export const MainPage = () => {
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

	const mainContent = useMemo(() => (!(loading || error || charactersMaxCount <= 0) ? <ContentView
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
	<MainDiv $bg={ false }>
		{mainContent}
		{loaderSpiner}
		{catchedError}
	</MainDiv>
    )
}

const ContentView = memo( ({ charactersMaxCount, activeCharacter, onCloseMobileCharacterInfo, mobileSearchShowed, onOpenCharacter, onSwichSearch, cancelSearch, onSearch, searching }) => {
    return (
        <Container>
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
        </Container>
    )
} );