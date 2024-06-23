import { Container } from "../components/style/Container";
import { ComicsList } from "../components/ComicsList/ComicsList";
import { ComicsWrapper } from "../components/ComicsList/stylesComicsList";
import { SearchComics } from "../components/SearchItems/SearchComics";
import { SortComicsWrapper } from "../components/SortList/stylesSortList";
import { SortList } from "../components/SortList/SortList";
import { useState, useCallback } from "react";



export const ComicsListPage = () => {
    const [searchValue, setSearchValue] = useState();
    const [randomOffset, setRandomOffset] = useState(true);
	const [comicsOrder, setcomicsOrder] = useState('-modified');

    const onSearch = useCallback((name) => {
        setSearchValue(name);
    });

    const switchRandomOffset = () => {
		console.log(randomOffset, comicsOrder);
		setRandomOffset((prevOffset) => (
			!prevOffset
		));
	}

	const offRandomOffset = () => {
		console.log(randomOffset, comicsOrder);

		setRandomOffset(false);
	}

    const orders = [
		{
			name: 'Random',
			value: '-focDate',
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
            <SearchComics onSearch= { onSearch }/>
            <SortComicsWrapper>
					<SortList orders={ orders } activeOrder={comicsOrder} setOrder={setcomicsOrder}/>
			</SortComicsWrapper>
            <ComicsWrapper>
                <ComicsList isRandomOffset={randomOffset} order={comicsOrder} searchValue={searchValue}/>
            </ComicsWrapper>
        </Container>
    </>
    )
}