import { useCallback, useEffect, useState, useRef } from "react";
import React from "react";
import { useMarvelService } from "../../services/ApiService/ApiService";
import { Button } from "../style/Button";
import { Wrapper, RandomCharacterInfo, InfoWrapper, ButtonsWrapper, RandomBaner } from "./stylesRandomCharacter";
import { vars } from "../style/Vars";
import { getRandNum } from "../../utils/randomValues";
import { setContent } from "../../utils/setContent";
import { isFindThumbnail } from "../../utils/isFindThumbnail";
import { Link } from "react-router-dom";

const View = ({character}) => {
    let { name, description, thumbnail, urls,id } = character;

    if (description.length > 188)
        description = description.slice(0, 188) + '...';

    if(!description || description.length === 0) 
        description = <>The data source does not have detailed information about this character. Try visiting <a target="_blank" href="https://www.marvel.com/">https://www.marvel.com/</a> to learn more about him.</>

    return (
        <>
            <img src={`${thumbnail.path}.${thumbnail.extension}`} alt={`character ${name}`} style={{ objectFit: isFindThumbnail(thumbnail.path) ? 'cover' : 'contain' }}  height={180} width={180} />
            <InfoWrapper>
                <div>
                    <h2>{name}</h2>
                    <p>{description}</p>
                </div>
                <ButtonsWrapper>
                    <Button ><Link to={`../characters/${id}`}>HOMEPAGE</Link></Button>
                    <Button target="blank" href={urls[1].url} color={vars.marvelGray}>Marvel WIKI</Button>
                </ButtonsWrapper>
            </InfoWrapper>
        </>
    )
}

export const RandomCharacter = () => {
    const [character, setCharacter] = useState();
    const { process, setProcess, getCharacters, getCharactersCount } = useMarvelService();

    let charactersMaxCount = useRef();

    useEffect(() => {
        getCharactersCount()
        .then(result => {
            charactersMaxCount.current = result;
        })
        .then(updateCharacter);
    }, [])

    useEffect(() => {
        console.log('random render');
    });
    
    const updateCharacter = useCallback(() => {
        getCharacters(1, getRandNum(1, (charactersMaxCount.current - 1)))
        .then(({data}) => { 
            setCharacter(...data) 
        })
        .then(() => { setProcess('view') });
    }, []);

    return(
        <Wrapper>
            <RandomCharacterInfo>
                { setContent(process, View, {character: character}) }
            </RandomCharacterInfo>
            <RandomBaner>
                <h2>Random character for today!<br/>Do you want to get to know him better?</h2>
                <h2>Or choose another one!</h2>
                <Button onClick={updateCharacter}>TRY IT</Button>
            </RandomBaner>
        </Wrapper>
    )
};

