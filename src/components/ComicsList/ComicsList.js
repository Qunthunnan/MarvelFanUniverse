import { memo, useCallback, useEffect, useState } from "react";
import { ComicsCard } from "../ComicsCard/ComicsCard";
import { List } from "./stylesComicsList";
import { InfoList } from "../InfoList/InfoList";
import { useMarvelService } from "../../services/ApiService/ApiService";

export const ComicsList = memo(({searchValue}) => {
    
    const { process, setProcess, getComicses, getComicsCount, searchComicsesByTitle } = useMarvelService();
    const { process: downloadProcess, setProcess: setDownloadProcess, getComicses: getAddComicses, searchComicsesByTitle: searchMore} = useMarvelService ();

    return (
        <section>
            <InfoList
                targetsCount = { {small: 8, big: 8} }
                onOpenItem = { () => {} }
                onCloseItemMobile = { () => {} }
                activeItem = { null }
                searchValue = { searchValue }
                getMaxCount = { getComicsCount }
                getItems = { getComicses }
                getAddItems = { getAddComicses }
                searchItems = { searchComicsesByTitle }
                searchMore = { searchMore }
                process = { process }
                setProcess = { setProcess }
                downloadProcess = { downloadProcess }
                setDownloadProcess = { setDownloadProcess } 
                ItemComponent = { ComicsCard }
                ListStyleComponent = { List }/>
        </section>
    );
});