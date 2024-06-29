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
import { usePagesContext } from "../hooks/usePagesContext";

export const MainPage = () => {
	const {pageState, setSpecificPageState} = usePagesContext();
	const { main: mainPageState } = pageState;

    const [mobileSearchShowed, setMobileSearchShowed] = useState(false);

	const [activeCharacter, setActiveCharacter] = useState(mainPageState?.main?.activeCharacter);
	const [randomOffset, setRandomOffset] = useState(  typeof(mainPageState?.main?.randomOffset) === 'boolean' ? mainPageState?.main?.randomOffset : true );
	const [charactersOrder, setCharactersOrder] = useState(mainPageState?.main?.charactersOrder || '-modified');
	const [searchValue, setSearchValue] = useState(mainPageState?.main?.searchValue || '');

	function setSpecificComponentState(component, state) {
		const newState = {}
		Object.assign(newState, mainPageState);
		newState[component] = state;
		setSpecificPageState('main', newState);
	}

	useEffect(()=>{

		// setSpecificComponentState('list', {
		// 	items: mainPageState?.list?.items || undefined,
		// 	offset: mainPageState?.list?.offset >= 0 ? mainPageState.list.offset : 0,
		// 	maxCount: mainPageState?.list?.maxCount ? mainPageState.list.maxCount : undefined,
		// 	searchCount: mainPageState?.list?.searchCount ? mainPageState.list.searchCount : undefined,
		// })
	}, []);

	console.log(pageState);

	useEffect(() => {
		setSpecificComponentState('main', {
			searchValue: searchValue,
			charactersOrder: charactersOrder,
			randomOffset: randomOffset,
			activeCharacter: activeCharacter
		})
	}, [ searchValue, charactersOrder, randomOffset, activeCharacter ]);
	
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
        setSearchValue(name);
    }, []);

	const switchRandomOffset = () => {
		setRandomOffset((prevOffset) => (
			!prevOffset
		));
	}

	const offRandomOffset = () => {
		setRandomOffset(false);
	}

	console.log(`randomOffset: ${randomOffset}`);

	const orders = [
		{
			name: 'Last updated',
			value: '-modified',
			action: offRandomOffset
		},
		{
			name: 'A little forgotten',
			value: 'modified',
			action: offRandomOffset,
		},
		{
			name: 'Random',
			value: 'random',
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

	]

    return ( 
			<MainDiv $bg={ true }>
				<Container>
					{/* <ErrorBoundary>
						<RandomCharacter />
					</ErrorBoundary> */}

					<MobileMenuButtons >
						<svg onClick={ onSwichSearch } xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
							<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
						</svg>
					</MobileMenuButtons>

					<SortMainWraper>
						<SortList orders={ orders } setOrder={setCharactersOrder} defaultValue={'random'}/>
					</SortMainWraper>

					<CharactersContentWrapper>
						{/* <ErrorBoundary>
							<CharactersList 
								activeCharacter={ activeCharacter } 
								onOpenCharacter={ onOpenCharacter }
								searchName = { searching }
								isRandomOffset = { randomOffset }
								order = { charactersOrder }/>
						</ErrorBoundary> */}
						<AsideWrapper>
							{/* <ErrorBoundary>
								<CharacterInfo
									character={ activeCharacter }
									onCloseMobileCharacterInfo={onCloseMobileCharacterInfo}/>
							</ErrorBoundary> */}
							
							<SearchCharacters mobileSearchShowed={ mobileSearchShowed } 
							onSwichSearch={ onSwichSearch } 
							onSearch={ onSearch } />
						</AsideWrapper>
					</CharactersContentWrapper>
				</Container>
			</MainDiv>
    )
}