import { TextWrapper, DetailedWrapper } from './stylesCharacterDetailed.js';
import { Link, redirect } from 'react-router-dom';
import { isFindThumbnail } from '../../utils/isFindThumbnail.js';
import { useMarvelService } from '../../services/ApiService/ApiService.js';
import { setContent } from '../../utils/setContent.js';
import { useEffect, useState } from 'react';

export const CharacterDetailed = ({ id }) => {
    const { process, setProcess, getCharacterById } = useMarvelService();
    const [character, setCharacter] = useState();

    useEffect(() => {
        getCharacterById(id)
        .then(result => { 
            setCharacter(result) 
        })
        .then(() => {
            setProcess('view')
        });
    }, []);

    return (
        <DetailedWrapper>
            {setContent(process, View, character)}
        </DetailedWrapper>
    )
}

function View (props) {
    try {
        const {name, description, thumbnail} = props;
        return (
            <>
                <img height={293} width={293} style={ { objectFit: isFindThumbnail(thumbnail.path) ? 'cover' : 'contain' }} src={`${thumbnail.path}.${thumbnail.extension}`} alt={name} />
                <TextWrapper>
                    <h2>{name}</h2>
                    <p>{ description && description.length > 0 ? description : <>The data source does not have detailed information about this character. Try visiting <a href="https://www.marvel.com/">https://www.marvel.com/</a> to learn more about him.</>}</p>
                </TextWrapper>
                <Link to="/">Back to all</Link>
            </>
        )
    } catch (error) {
        redirect("/404");
    }
}