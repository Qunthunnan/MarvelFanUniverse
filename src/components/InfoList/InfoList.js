import { useEffect, useRef, useState, memo } from "react";
import { CharacterCard } from "../CharacterCard/CharacterCard";
import { List, Section, WideButtonBottom } from "./stylesInfoList";
import { Loader } from "../Loader/Loader";
import { useMarvelService } from "../../services/ApiService/ApiService";
import Error from "../Error/Error";
import { getRandNum } from "../../services/randomValues/randomValues";
import uniqid from 'uniqid';
import { vars } from "../style/Vars";


export const InfoList = memo(({ children, maxCount, onOpenItem, onCloseItemMobile, activeItem, searchValue }) => {
        
    const [items, setItems] = useState(null);
    const [itemsLimitReached, setitemsLimitReached] = useState(false);
    const { loading, error, getCharacters, getComicses, searchComicsesByTitle, searchCharactersByName } = useMarvelService();
    const { loading: loadingMore, error: loadingMoreError, getCharacters: getAddCharacters, searchCharactersByName: searchMore} = useMarvelService (false);
        
    let offset = useRef(0);
    const charactersRendered = characters ? characters.length : 0;
    let searchCount = useRef();
    
    const errorImage = error ? <><Error/><p>A system error has occurred, please try again later</p></>  : null;
    const loader = loading ? <Loader/> : null;
    const charactersListItems = characters && !(error || loading) ? <View onOpenCharacter={onOpenCharacter} 
    onCloseMobileCharacterInfo={onCloseMobileCharacterInfo} 
    activeCharacter={activeCharacter} 
    characters={ characters }/> : null;
    const LoadMoreLoading = loadingMore ? <Loader/> : null;
    const LoadMoreError = loadingMoreError ? <><Error/><p>A system error has occurred, please try again later</p></> : null;
    const LoadMoreButtons = !(loadingMore || loadingMoreError || charactersLimitReached || charactersRendered === 0) ? <WideButtonBottom onClick={searchName && searchName !== '' ? onLoadMoreSearchResults : onLoadMore}>LOAD MORE</WideButtonBottom> : null;

    useEffect(() => {
        loadCharacters();
        console.log('charList mounted');
    }, []);

    useEffect(() => {
        if (searchName) {
            searchCharacter();
            console.log('charList searching');
        }
        if (searchName === '') {
            loadCharacters();
        }
    }, [ searchName ])

    console.log(`renderCharList, charRendered: ${charactersRendered}, offset: ${offset.current}`);
    
    const loadCharacters = () => {
        const count = getTargetCount();
        offset.current = getRandomCharactersOffset();

       getCharacters(count, offset.current)
        .then(setCharacters)
    }

    const searchCharacter = () => {
        const count = getTargetCount();
        offset.current = 0;

       searchCharactersByName(searchName, count, offset.current)
        .then(result => {
            searchCount.current = result.count; 
            if(searchCount.current <= count)
                setCharactersLimitReached(true);
            else
                setCharactersLimitReached(false);
            
            setCharacters(result.characters);
        });
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
            getAddCharacters(count, (offset.current + count))
            .then(addCharacters)

            return undefined;
        }

        if(offset.current + (count * 2) > charactersMaxCount) {
            const diff = (charactersMaxCount) - (offset.current + count);
            let part1 = [];

            getAddCharacters((diff + 1), offset.current + count)
            .then(data => {
                part1 = data;
                offset.current = 0;
                return getAddCharacters((count - diff), offset.current);
            })
            .then(data => {
                offset.current -= diff;
                addCharactersFromParts(part1, data);
            });
        }
        else {
            offset.current += count;

            getAddCharacters(count, offset.current)
            .then(addCharacters)
        }
    }

    function onLoadMoreSearchResults() {
        const count = getTargetCount();

        if((charactersRendered + count) >= searchCount.current) {
            setCharactersLimitReached(true);
            searchMore(searchName, count, (offset.current + count))
            .then(result => {addCharacters(result.characters)});

            return undefined;
        }

        offset.current += count;

        searchMore(searchName, count, offset.current)
        .then(result => {addCharacters(result.characters)});
       
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
});



const View = memo(({characters, onOpenCharacter, onCloseMobileCharacterInfo, activeCharacter}) => {
    if(characters.length === 0) {
        return (<p style={{color: vars.marvelRed, fontSize: '24px'}}>Characters not found</p>)
    }
    return(
        <>{characters.map((character) => ( <CharacterCard isActive={(activeCharacter && activeCharacter.id === character.id) ? true : false} onCloseMobileCharacterInfo={ onCloseMobileCharacterInfo } onOpenCharacter={ () => { 
            onOpenCharacter(character); 
        } } key={uniqid()} character={character}/> ))}</>
    )
});