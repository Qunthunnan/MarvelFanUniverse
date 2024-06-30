import { Container } from "../components/style/Container";
import { ComicsList } from "../components/ComicsList/ComicsList";
import { ComicsWrapper } from "../components/ComicsList/stylesComicsList";
import { SearchComics } from "../components/SearchItems/SearchComics";
import { SortComicsWrapper } from "../components/SortList/stylesSortList";
import { SortList } from "../components/SortList/SortList";
import { useState, useCallback, useEffect, useRef } from "react";
import { usePagesContext } from "../hooks/usePagesContext";

export const ComicsListPage = () => {
	const {pageState, setSpecificPageState} = usePagesContext();
	const { comics: comicsPageState } = pageState;

    const [searchValue, setSearchValue] = useState(comicsPageState?.page?.searchValue || '');
    const [randomOffset, setRandomOffset] = useState( typeof(comicsPageState?.page?.randomOffset) === 'boolean' ? comicsPageState?.page?.randomOffset : true );
	const [comicsOrder, setcomicsOrder] = useState( comicsPageState?.page?.comicsOrder || '-modified');
	const [currentOrderValue, setCurrentOrderValue] = useState(comicsPageState?.page?.currentOrderValue || 'random');

	const searchValueStore = useRef(searchValue);
	const randomOffsetStore = useRef(randomOffset);
	const comicsOrderStore = useRef(comicsOrder);
	const currentOrderValueStore = useRef(currentOrderValue);

	useEffect(() => {
		if(searchValueStore.current !== searchValue || randomOffsetStore.current !== randomOffset || comicsOrderStore.current !== comicsOrder  || currentOrderValueStore.current !== currentOrderValue) {
			searchValueStore.current = searchValue;
			randomOffsetStore.current = randomOffset;
			comicsOrderStore.current = comicsOrder;
			currentOrderValueStore.current = currentOrderValue;

			setSpecificComponentState('page', {
				searchValue: searchValue,
				comicsOrder: comicsOrder,
				randomOffset: randomOffset,
				currentOrderValue: currentOrderValue,
			})
		}

	}, [ searchValue, comicsOrder, randomOffset ]);

	function setSpecificComponentState(component, state) {
		console.log(`set component`);
		console.log(component);
		console.log('state');
		console.log(state);

		const newState = {}
		Object.assign(newState, comicsPageState);
		newState[component] = state;
		setSpecificPageState('comics', newState);
	}	

	console.log(`page comics: `);
	console.log(pageState);

    const onSearch = useCallback((value) => {
        setSearchValue(value);
    });

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
			name: 'Random',
			value: 'random',
			action: switchRandomOffset
		},
		{
			name: 'By title A↓',
			value: 'title',
			action: offRandomOffset
		},
		{
			name: 'By title Z↓',
			value: '-title',
			action: offRandomOffset
		},
		{
			name: 'New',
			value: '-focDate',
			action: offRandomOffset
		},
		{
			name: 'Old',
			value: 'focDate',
			action: offRandomOffset,
		}
	]

    return ( 
    <>
        <Container>
            <SearchComics onSearch= { onSearch } value={ searchValue }/>
            <SortComicsWrapper>
					<SortList orders={ orders } setOrder={setcomicsOrder} defaultValue={ currentOrderValue } setDefaultValue={setCurrentOrderValue}/>
			</SortComicsWrapper>
            <ComicsWrapper>
                <ComicsList isRandomOffset={randomOffset} order={comicsOrder} searchValue={searchValue} listState={[comicsPageState?.list, (state) => {
					setSpecificComponentState('list', state);
				}]}/>
            </ComicsWrapper>
        </Container>
    </>
    )
}