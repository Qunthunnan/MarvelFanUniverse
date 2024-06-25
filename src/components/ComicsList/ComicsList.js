import { memo } from "react";
import { ComicsCard } from "../ComicsCard/ComicsCard";
import { List } from "./stylesComicsList";
import { InfoList } from "../InfoList/InfoList";
import { ComicsItem } from "../ComicsCard/stylesComicsCard";
import { useMarvelService } from "../../services/ApiService/ApiService";
import { WideButtonBottom } from "../CharactersList/stylesCharacterList";
import { Section } from "../CharactersList/stylesCharacterList";
import { useList } from "../../hooks/useList";

export const ComicsList = memo(({searchValue, isRandomOffset, order}) => {
    
    const { process, setProcess, getComicses, getComicsCount, searchComicsesByTitle } = useMarvelService();
    const { process: downloadProcess, setProcess: setDownloadProcess, getComicses: getAddComicses, searchComicsesByTitle: searchMore} = useMarvelService ();
    const { listState, setListState } = useList();

    return (
        <section>
            <InfoList
                ListSC={ List }
                ItemSC={ ComicsItem }
                LoadButtonSC={ WideButtonBottom }
                ContentWrapperSC= { Section }
                ItemChildren={ ComicsCard }
                targetsCount = { {small: 8, big: 8} }
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
                tabIndexOnLi 
                isRandomOffset={ isRandomOffset }
                order={ order }
                listState={listState}
                setListState={setListState}
                />
        </section>
    );
});