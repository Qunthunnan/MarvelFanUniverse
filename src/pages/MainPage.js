import { useState, useEffect, useCallback, useRef } from "react";
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
	const [currentSearchValue, setCurrentSearchValue] = useState('');

	const [activeCharacter, setActiveCharacter] = useState(mainPageState?.page?.activeCharacter);
	const [randomOffset, setRandomOffset] = useState( typeof(mainPageState?.page?.randomOffset) === 'boolean' ? mainPageState?.page?.randomOffset : true );
	const [charactersOrder, setCharactersOrder] = useState(mainPageState?.page?.charactersOrder || '-modified');
	const [searchValue, setSearchValue] = useState(mainPageState?.page?.searchValue || '');
	const [currentOrderValue, setCurrentOrderValue] = useState(mainPageState?.page?.currentOrderValue || 'random');

	const searchValueStore = useRef(searchValue);
	const randomOffsetStore = useRef(randomOffset);
	const charactersOrderStore = useRef(charactersOrder);
	const activeCharacterStore = useRef(activeCharacter);
	const currentOrderValueStore = useRef(currentOrderValue);
	const mainPageStateStore = useRef();
	const scrollPosition = useRef(mainPageState?.page?.scrollPosition || 0);

	const itemsMounted = useRef(false);

	function setSpecificComponentState(component, state) {
		console.log(`set component`);
		console.log(component);
		console.log('state');
		console.log(state);
		
		const newState = {}
		Object.assign(newState, mainPageState || mainPageStateStore.current);
		newState[component] = state;
		setSpecificPageState('main', newState);
	}

	const onScrolling = (e) => {
        scrollPosition.current = window.scrollY;
    }

	console.log(`page main: `);
	console.log(pageState);

	useEffect(() => {
		document.addEventListener('scroll', onScrolling);
		return () => {
			document.removeEventListener('scroll', onScrolling);
			setSpecificComponentState('page', {
				searchValue: searchValue,
				charactersOrder: charactersOrder,
				randomOffset: randomOffset,
				activeCharacter: activeCharacter,
				currentOrderValue: currentOrderValue,
				scrollPosition: scrollPosition.current
			});
		}
	}, []);

	useEffect(()=>{
		mainPageStateStore.current = mainPageState;
	});

	useEffect(() => {
		if(searchValueStore.current !== searchValue || randomOffsetStore.current !== randomOffset || charactersOrderStore.current !== charactersOrder || activeCharacterStore.current !== charactersOrder || currentOrderValueStore.current !== currentOrderValue) {
			searchValueStore.current = searchValue;
			randomOffsetStore.current = randomOffset;
			charactersOrderStore.current = charactersOrder;
			activeCharacterStore.current = activeCharacter;
			currentOrderValueStore.current = currentOrderValue;
	
			setSpecificComponentState('page', {
				searchValue: searchValue,
				charactersOrder: charactersOrder,
				randomOffset: randomOffset,
				activeCharacter: activeCharacter,
				currentOrderValue: currentOrderValue,
				scrollPosition: scrollPosition.current
			});
		}
	}, [ searchValue, charactersOrder, randomOffset, activeCharacter, currentOrderValue ]);
	
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

	const onListLoaded = useCallback(() => {
		if(!itemsMounted.current) {
			itemsMounted.current = true;
			setTimeout(() => {window.scrollTo({top: scrollPosition.current, behavior:'instant'})}, 5);
		}
	}, []);

	const switchRandomOffset = () => {
		setRandomOffset((prevOffset) => (
			!prevOffset
		));
	}

	const offRandomOffset = () => {
		setRandomOffset(false);
	}

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
						<SortList orders={ orders } setOrder={setCharactersOrder} defaultValue={ currentOrderValue } setDefaultValue={ setCurrentOrderValue }/>
					</SortMainWraper>

					<CharactersContentWrapper>
						<ErrorBoundary>
							<CharactersList 
								activeCharacter={ activeCharacter } 
								onOpenCharacter={ onOpenCharacter }
								searchValue = { searchValue }
								isRandomOffset = { randomOffset }
								onListLoaded = { onListLoaded }
								order = { charactersOrder } 
								listState = {[ mainPageState?.list, (state) => {
									setSpecificComponentState('list', state);
								} ]} />
						</ErrorBoundary>
						<AsideWrapper>
							<ErrorBoundary>
								<CharacterInfo
									character={ activeCharacter }
									onCloseMobileCharacterInfo={onCloseMobileCharacterInfo}/>
							</ErrorBoundary>
							
							<SearchCharacters 
							mobileSearchShowed={ mobileSearchShowed } 
							setCurrentSearchValue={ setCurrentSearchValue }
							onSwichSearch={ onSwichSearch } 
							onSearch={ onSearch } 
							value={ currentSearchValue || searchValue }/>
						</AsideWrapper>
					</CharactersContentWrapper>
				</Container>
			</MainDiv>
    )
}