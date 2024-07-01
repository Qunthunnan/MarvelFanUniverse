import { useCallback, useEffect, useState, useRef } from "react";
import React from "react";
import { useMarvelService } from "../../services/ApiService/ApiService";
import { Button } from "../style/Button";
import { Wrapper, RandomCharacterInfo, InfoWrapper, ButtonsWrapper, RandomBaner } from "./stylesRandomCharacter";
import { getRandNum } from "../../utils/randomValues";
import { setContent } from "../../utils/setContent";
import { isFindThumbnail } from "../../utils/isFindThumbnail";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import './transitions.css';

const View = ({character, animation, setAnimation}) => {
    let { name, description, thumbnail , id } = character;

    if (description.length > 188)
        description = description.slice(0, 188) + '...';

    if(!description || description.length === 0) 
        description = <>The data source does not have detailed information about this character. Try visiting <a target="_blank" rel="noreferrer" href="https://www.marvel.com/">https://www.marvel.com/</a> to learn more about him.</>
    
    useEffect(() => {
        setAnimation(true);
    }, [character])

    const imgRef = useRef();
    const infoRef = useRef();

    return (
        <>
            <CSSTransition in={ animation } classNames={'fade'} nodeRef={ imgRef } timeout={300}>
                <img
                src={`${thumbnail.path}.${thumbnail.extension}`} 
                alt={`character ${name}`} 
                style={{ opacity: animation ? null : 0, objectFit: isFindThumbnail(thumbnail.path) ? 'cover' : 'contain' }} 
                height={180} 
                width={180} 
                ref={ imgRef }/>
            </CSSTransition>
            <CSSTransition in={ animation } classNames={'fade'} nodeRef={ infoRef } timeout={300}>
                <InfoWrapper style={{opacity: animation ? null : 0}} ref={ infoRef }>
                    <div>
                        <h2>{name}</h2>
                        <p>{description}</p>
                    </div>
                    <ButtonsWrapper>
                        <Button as={'div'} ><Link to={`../characters/${id}`}>HOMEPAGE</Link></Button>
                    </ButtonsWrapper>
                </InfoWrapper>
            </CSSTransition>
        </>
    )
}

export const RandomCharacter = () => {
    const [character, setCharacter] = useState();
    const { process, setProcess, getCharacters, getCharactersCount } = useMarvelService();
    const [animation, setAnimation] = useState(false);

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

    const nodeRef = useRef();

    return(
        <Wrapper>
            
            <RandomCharacterInfo ref={nodeRef}>
                { setContent(process, View, {character: character, animation: animation, setAnimation: setAnimation, }, nodeRef) }
            </RandomCharacterInfo>

            <RandomBaner>
                <h2>Random character for today!<br/>Do you want to get to know him better?</h2>
                <h2>Or choose another one!</h2>
                <Button onClick={() => {updateCharacter(); setAnimation(false)}}>TRY IT</Button>
            </RandomBaner>
        </Wrapper>
    )
};

