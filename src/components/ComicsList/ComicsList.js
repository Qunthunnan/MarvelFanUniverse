import { memo, useEffect, useState } from "react";
import { ComicsCard } from "../ComicsCard/ComicsCard";
import { List } from "./stylesComicsList";
import { InfoList } from "../InfoList/InfoList";
import { useMarvelService } from "../../services/ApiService/ApiService";

export const ComicsList = memo(() => {
    
    const { loading, error, getComicses, getComicsCount, searchComicsesByTitle } = useMarvelService();
    const { loading: loadingMore, error: loadingMoreError, getComicses: getAddComicses, searchComicsesByTitle: searchMore} = useMarvelService (false);

    const [comicsCount, setComicsCount] = useState();

    useEffect(() => {
        getComicsCount()
        .then(setComicsCount);
    }, [])

    return (
        comicsCount ? (    
        <section>
            <InfoList
                ItemComponent = { ComicsCard }
                ListStyleComponent = { List }
                maxCount = { comicsCount }
                targetsCount = { {small: 8, big: 8} }
                onOpenItem = { () => {} }
                onCloseItemMobile = { () => {} }
                activeItem = { null }
                searchValue = { null }
                getItems = { getComicses }
                getAddItems = { getAddComicses }
                searchItems = { searchComicsesByTitle }
                searchMore = { searchMore }
                loading = { loading }
                loadingMore = { loadingMore }
                error = { error }
                loadingMoreError = { loadingMoreError }/>
        </section>) : null
    );
});