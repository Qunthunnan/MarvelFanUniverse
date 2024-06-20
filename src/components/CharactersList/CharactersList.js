import { memo } from "react";
import { CharacterCard } from "../CharacterCard/CharacterCard";
import { List } from "./stylesCharacterList";
import { useMarvelService } from "../../services/ApiService/ApiService";
import { InfoList } from "../InfoList/InfoList";

export const CharactersList = memo(({ onOpenCharacter, onCloseMobileCharacterInfo, activeCharacter, searchName }) => {
   
    const { process, setProcess, getCharacters, getCharactersCount, searchCharactersByName } = useMarvelService ();
    const { process: downloadProcess, setProcess: setDownloadProcess, getCharacters: getAddCharacters, searchCharactersByName: searchMore} = useMarvelService ();

    return (
        <InfoList
            targetsCount = {{ small: 8, big: 9 }}
            onOpenItem = { onOpenCharacter } 
            onCloseItemMobile = { onCloseMobileCharacterInfo }
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
            ItemComponent = { CharacterCard }
            ListStyleComponent = { List } />
    );
});