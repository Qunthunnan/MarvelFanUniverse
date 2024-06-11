import { useCallback, useEffect, useState } from "react";
import { useMarvelService } from "../../services/ApiService/ApiService";
import { Button } from "../style/Button";
import { Wrapper, RandomCharacterInfo, InfoWrapper, ButtonsWrapper, RandomBaner } from "./stylesRandomCharacter";
import { vars } from "../style/Vars";
import { Loader } from "../Loader/Loader";
import { getRandNum } from "../../services/randomValues/randomValues";
import Error from "../Error/Error";

const View = ({character}) => {
    let { name, description, thumbnail, urls } = character;
    let findThumbNail = true;
    if (description.length > 188)
        description = description.slice(0, 188) + '...';

    if(!description || description.length === 0) 
        description = <>The data source does not have detailed information about this character. Try visiting <a href="https://www.marvel.com/">https://www.marvel.com/</a> to learn more about him.</>

    if(thumbnail.path === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" || thumbnail.path === "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708")
        findThumbNail = false;
    return (
        <>
            <img src={`${thumbnail.path}.${thumbnail.extension}`} alt={`character ${name}`} style={{ objectFit: findThumbNail ? 'cover' : 'contain' }}  height={180} width={180} />
            <InfoWrapper>
                <div>
                    <h2>{name}</h2>
                    <p>{description}</p>
                </div>
                <ButtonsWrapper>
                    <Button target="blank" href={urls[0].url} >HOMEPAGE</Button>
                    <Button target="blank" href={urls[1].url} color={vars.marvelGray}>WIKI</Button>
                </ButtonsWrapper>
            </InfoWrapper>
        </>
    )
}

export const RandomCharacter = ({charactersMaxCount}) => {
        const [character, setCharacter] = useState();
        const { loading, error, getCharacters } = useMarvelService();

        useEffect(() => {
            console.log('random did mount');
            updateCharacter();
        }, [])

        useEffect(() => {
            console.log('random render');
        });

        const loader = loading ? <Loader/> : null;
        const errrorImage = error ? <><Error/><p>A system error has occurred, please try again later</p></> : null;
        const content = !(error || loading) && character ? <View character={character}/> : null;
        
        const updateCharacter = useCallback(() => {

            getCharacters(1, getRandNum(1, (charactersMaxCount - 1)))
            .then(result => { setCharacter(...result) })
        });

        return(
            <Wrapper>
                <RandomCharacterInfo>
                    {loader}
                    {errrorImage}
                    {content}
                </RandomCharacterInfo>
                <RandomBaner>
                    <h2>Random character for today!<br/>Do you want to get to know him better?</h2>
                    <h2>Or choose another one!</h2>
                    <Button onClick={updateCharacter}>TRY IT</Button>
                </RandomBaner>
            </Wrapper>
        )
    }

