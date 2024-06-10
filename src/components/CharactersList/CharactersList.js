import { useEffect, useRef, useState } from "react";

import { CharacterCard } from "../CharacterCard/CharacterCard";

import { List, Section, WideButtonBottom } from "./stylesCharacterList";
import { Loader } from "../Loader/Loader";
import { useMarvelService } from "../../services/ApiService/ApiService";
import Error from "../Error/Error";
import { getRandNum } from "../../services/randomValues/randomValues";
import uniqid from 'uniqid';


export function CharactersList ({ charactersMaxCount, onOpenCharacter, onCloseMobileCharacterInfo, activeCharacter }) {
        
    const [characters, setCharacters] = useState(null);
    const [charactersLimitReached, setCharactersLimitReached] = useState(false);
    const { loading, error, getCharacters } = useMarvelService ();
    const { loading: loadingMore, error: loadingMoreError, getCharacters: getAddCharacters} = useMarvelService (false);
    const count = useRef(null);

        
    let offset = useRef(0);
    const charactersRendered = characters ? characters.length : 0;
    
    const errorImage = error ? <><Error/><p>A system error has occurred, please try again later</p></>  : null;
    const loader = loading ? <Loader/> : null;
    const charactersListItems = characters && !(error || loading) ? <View onOpenCharacter={onOpenCharacter} onCloseMobileCharacterInfo={onCloseMobileCharacterInfo} activeCharacter={activeCharacter} characters={ characters }/> : null;
    const LoadMoreLoading = loadingMore ? <Loader/> : null;
    const LoadMoreError = loadingMoreError ? <><Error/><p>A system error has occurred, please try again later</p></> : null;
    const LoadMoreButtons = !(loadingMore || loadingMoreError || charactersLimitReached) ? <WideButtonBottom onClick={onLoadMore}>LOAD MORE</WideButtonBottom> : null;

    useEffect(() => {
        loadCharacters();
    }, []);

    console.log('real curent rendered: ' + charactersRendered);
    
    const loadCharacters = () => {
        const count = getTargetCount();
        offset = getRandomCharactersOffset();

       getCharacters(count, offset)
        .then(setCharacters)
    }
    
    const getTargetCount = () => {
        return document.documentElement.clientWidth >= 992 ? 9 : 8;
    }

    const getRandomCharactersOffset = () => {
        return getRandNum(1, (charactersMaxCount - 1) - (getTargetCount() * 5));
    }

    function onLoadMore () {
        const count = getTargetCount();

        if(charactersRendered + count >= charactersMaxCount) {
            setCharactersLimitReached(true);
            getAddCharacters(count, (offset + count))
            .then(addCharacters)

            return undefined;
        }

        if(offset + (count * 2) > charactersMaxCount) {
            const diff = (charactersMaxCount) - (offset + count);
            let part1 = [];

            getAddCharacters((diff + 1), offset + count)
            .then(data => {
                part1 = data;
                offset = 0;
                return getAddCharacters((count - diff), offset);
            })
            .then(data => {
                offset -= diff;
                addCharactersFromParts(part1, data);
            });
        }
        else {
            offset += count;

            getAddCharacters(count, offset)
            .then(addCharacters)
        }
    }

    const addCharacters = (addCharacters) => {
        setCharacters([...characters, ...addCharacters]);
    }

    const addCharactersFromParts = (part1, part2) => {
        setCharacters([...characters, ...part1, ...part2]);
    }

    return (
        <Section>
            <List>
                {errorImage}
                {loader}
                {charactersListItems}
            </List>
            {LoadMoreLoading}
            {LoadMoreError}
            {LoadMoreButtons}
        </Section>
    );
}



const View = ({characters, onOpenCharacter, onCloseMobileCharacterInfo, activeCharacter}) => {
    return(
        <>{characters.map((character) => ( <CharacterCard isActive={(activeCharacter && activeCharacter.id === character.id) ? true : false} onCloseMobileCharacterInfo={ onCloseMobileCharacterInfo } onOpenCharacter={ () => { 
            onOpenCharacter(character); 
        } } key={uniqid()} character={character}/> ))}</>
    )
}