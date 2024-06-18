import { TextWrapper, DetailedWrapper } from './stylesCharacterDetailed.js';
import { isFindThumbnail } from '../../utils/isFindThumbnail.js';
import { Link } from 'react-router-dom';


export const CharacterDetailed = ({ name, description, thumbnail }) => {
    return (
        <DetailedWrapper>
            <img height={293} width={293} style={ { objectFit: isFindThumbnail(thumbnail.path) ? 'cover' : 'contain' }} src={`${thumbnail.path}.${thumbnail.extension}`} alt={name} />
            <TextWrapper>
                <h2>{name}</h2>
                <p>{ description && description.length > 0 ? description : <>The data source does not have detailed information about this character. Try visiting <a target="_blank" href="https://www.marvel.com/">https://www.marvel.com/</a> to learn more about him.</>}</p>
            </TextWrapper>
            <Link to="/">Back to all</Link>
        </DetailedWrapper>
    )
}