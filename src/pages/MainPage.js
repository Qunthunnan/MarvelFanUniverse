import { useState, useEffect, useCallback } from "react";
import { Container } from "../components/style/Container";
import { ErrorBoundary } from "../components/ErrorBoundary/ErrorBoundary";
import { RandomCharacter } from "../components/RandomCharacter/RandomCharacter";
import { MainDiv, MobileMenuButtons, CharactersContentWrapper, AsideWrapper } from "../components/App/stylesApp";
import { CharactersList } from "../components/CharactersList/CharactersList";
import { CharacterInfo } from "../components/CharacterInfo/CharacterInfo";
import { SearchCharacters } from "../components/SearchItems/SearchCharacters";

export const MainPage = () => {
    const [mobileSearchShowed, setMobileSearchShowed] = useState(false);
	const [activeCharacter, setActiveCharacter] = useState();
	const [searching, setSearching] = useState(false);

	useEffect(()=>{ 
		console.log('main mounted, started updateCharacters');
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

    return ( 
		<MainDiv $bg={ true }>
			<Container>
				<ErrorBoundary>
					<RandomCharacter />
				</ErrorBoundary>

				<MobileMenuButtons>
					<svg onClick={ onSwichSearch } xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
						<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
					</svg>
				</MobileMenuButtons>

				<CharactersContentWrapper>
					<ErrorBoundary>
						<CharactersList 
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
						<SearchCharacters mobileSearchShowed={ mobileSearchShowed } 
						onSwichSearch={ onSwichSearch } 
						onSearch={ onSearch } />
					</AsideWrapper>
				</CharactersContentWrapper>
			</Container>
		</MainDiv>
    )
}