import { Container } from "../components/style/Container";
import { ComicsList } from "../components/ComicsList/ComicsList";
import { ComicsWrapper } from "../components/ComicsList/stylesComicsList";
import { SearchComics } from "../components/SearchItems/SearchComics";
import { useState, useCallback } from "react";



export const ComicsListPage = () => {
    const [searchValue, setSearchValue] = useState();

    const onSearch = useCallback((name) => {
        setSearchValue(name);
    });

    return ( 
    <>
        <Container>
            <SearchComics onSearch= { onSearch }/>
            <ComicsWrapper>
                <ComicsList searchValue={searchValue}/>
            </ComicsWrapper>
        </Container>
    </>
    )
}