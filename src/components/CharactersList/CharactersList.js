import { memo } from "react";
import { CharacterCard } from "../CharacterCard/CharacterCard";
import { List } from "./stylesCharacterList";
import { useMarvelService } from "../../services/ApiService/ApiService";
import { InfoList } from "../InfoList/InfoList";

export const CharactersList = memo(({ charactersMaxCount, onOpenCharacter, onCloseMobileCharacterInfo, activeCharacter, searchName }) => {
   
    const { loading, error, getCharacters, searchCharactersByName } = useMarvelService ();
    const { loading: loadingMore, error: loadingMoreError, getCharacters: getAddCharacters, searchCharactersByName: searchMore} = useMarvelService (false);

    return (
        <InfoList maxCount = {charactersMaxCount}
            targetsCount = {{ small: 8, big: 9 }}
            onOpenItem = { onOpenCharacter } 
            onCloseItemMobile = { onCloseMobileCharacterInfo }
            activeItem = { activeCharacter }
            searchValue = { searchName } 
            getItems = { getCharacters }
            getAddItems = { getAddCharacters }
            searchItems = { searchCharactersByName }
            searchMore = { searchMore }
            loading = { loading }
            loadingMore = { loadingMore }
            error = { error }
            loadingMoreError = {loadingMoreError}
            ItemComponent = { CharacterCard }
            ListStyleComponent = { List }/>
    );
});