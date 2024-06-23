import { useState, useEffect, useCallback } from "react";
import { Container } from "../components/style/Container";
import { ErrorBoundary } from "../components/ErrorBoundary/ErrorBoundary";
import { RandomCharacter } from "../components/RandomCharacter/RandomCharacter";
import { MainDiv, MobileMenuButtons, CharactersContentWrapper, AsideWrapper } from "../components/App/stylesApp";
import { CharactersList } from "../components/CharactersList/CharactersList";
import { CharacterInfo } from "../components/CharacterInfo/CharacterInfo";
import { SearchCharacters } from "../components/SearchItems/SearchCharacters";
import { SortList } from "../components/SortList/SortList";
import { SortMainWraper } from "../components/SortList/stylesSortList";

export const MainPage = () => {
    const [mobileSearchShowed, setMobileSearchShowed] = useState(false);
	const [activeCharacter, setActiveCharacter] = useState();
	const [searching, setSearching] = useState(false);
	const [randomOffset, setRandomOffset] = useState(true);
	const [charactersOrder, setCharactersOrder] = useState('-modified');

	useEffect(()=>{ 
		console.log('main mounted, started updateCharacters');
	}, []);
	
	const onCloseMobileCharacterInfo = useCallback(() => {
		setActiveCharacter(null);
	}, []); 

	const onSwichSearch = useCallback((e) => {
		setMobileSearchShowed((prevSearchShowed) => (!prevSearchShowed) );
	}, []);
	
	const onOpenCharacter = useCallback((character) => {
		setActiveCharacter(character)
	}, []);

	const onSearch = useCallback((name) => {
        setSearching(name);
    }, []);

	const switchRandomOffset = () => {
		console.log(randomOffset, charactersOrder);
		setRandomOffset((prevOffset) => (
			!prevOffset
		));
	}

	const offRandomOffset = () => {
		console.log(randomOffset, charactersOrder);

		setRandomOffset(false);
	}

	const orders = [
		{
			name: 'Random',
			value: '-modified',
			action: switchRandomOffset
		},
		{
			name: 'By name A↓',
			value: 'name',
			action: offRandomOffset
		},
		{
			name: 'By name Z↓',
			value: '-name',
			action: offRandomOffset
		},
		{
			name: 'Last updated',
			value: '-modified',
			action: offRandomOffset
		},
		{
			name: 'A little forgotten',
			value: 'modified',
			action: offRandomOffset,
		}
	]

    return ( 
		<MainDiv $bg={ true }>
			<Container>
				<ErrorBoundary>
					<RandomCharacter />
				</ErrorBoundary>

				<MobileMenuButtons >
					<svg onClick={ onSwichSearch } xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
						<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
					</svg>
				</MobileMenuButtons>

				<SortMainWraper>
					<SortList orders={ orders } activeOrder={charactersOrder} setOrder={setCharactersOrder}/>
				</SortMainWraper>

				<CharactersContentWrapper>
					<ErrorBoundary>
						<CharactersList 
							activeCharacter={ activeCharacter } 
							onOpenCharacter={ onOpenCharacter }
							searchName = { searching }
							isRandomOffset = { randomOffset }
							order = { charactersOrder }/>
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