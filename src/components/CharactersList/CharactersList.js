import { memo } from "react";
import { CharacterCard } from "../CharacterCard/CharacterCard";
import { CharacterItem } from "../CharacterCard/stylesCharacterCard";
import { List, WideButtonBottom } from "./stylesCharacterList";
import { useMarvelService } from "../../services/ApiService/ApiService";
import { Section } from "./stylesCharacterList";
import { InfoList } from "../InfoList/InfoList";
import { useList } from "../../hooks/useList";

export const CharactersList = memo(({ onOpenCharacter, activeCharacter, isRandomOffset, order, searchName,  }) => {
   
    const { process, setProcess, getCharacters, getCharactersCount, searchCharactersByName } = useMarvelService ();
    const { process: downloadProcess, setProcess: setDownloadProcess, getCharacters: getAddCharacters, searchCharactersByName: searchMore} = useMarvelService ();
    const { listState, setListState } = useList();

    return (
        <InfoList
            ListSC={ List }
            ItemSC={ CharacterItem }
            ItemChildren={ CharacterCard }
            LoadButtonSC= { WideButtonBottom }
            ContentWrapperSC={ Section }
            targetsCount = {{ small: 8, big: 9 }}
            onOpenItem = { onOpenCharacter } 
            activeItem = { activeCharacter }
            searchValue = { searchName } 
            getMaxCount = { getCharactersCount }
            getItems = { getCharacters }
            getAddItems = { getAddCharacters }
            searchItems = { searchCharactersByName }
            searchMore = { searchMore }
            process = { process }
            setProcess = { setProcess }
            downloadProcess = { downloadProcess }
            setDownloadProcess = { setDownloadProcess }
            tabIndexOnLi 
            isRandomOffset={isRandomOffset}
            order={ order }
            listState={ listState }
            setListState={ setListState }
            />
    );
});