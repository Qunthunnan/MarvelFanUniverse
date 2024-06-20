import { DetailedWrapper, TextWrapper } from "./stylesComicsDetailed";
import { Link } from "react-router-dom";
import { isFindThumbnail } from "../../utils/isFindThumbnail";

export const ComicsDetailed = ({title, thumbnail, description, pageCount, prices}) => {
    return (
        <DetailedWrapper>
            <img style={{ 
            objectFit: isFindThumbnail(thumbnail.path) ? 'inherit' : 'cover',
            objectPosition: isFindThumbnail(thumbnail.path) ? 'inherit' : 'left'
            }} 
            height={450} 
            width={293} 
            src={`${thumbnail.path}.${thumbnail.extension}`} 
            alt={'comics ' + title} />
            <TextWrapper>
                <h2>{title}</h2>
                <p>{ description && description.length > 0 ? description : <>The data source does not have detailed information about this comics. Try visiting <a target="_blank" href="https://www.marvel.com/">https://www.marvel.com/</a> to learn more about him.</>}</p>

                {pageCount && pageCount > 0 ? <p>{pageCount} pages</p> : null}

                <span>Printed edition: {prices[0] && prices[0].price > 0 ? `${prices[0].price} $` : 'NOT AVAILABLE'}</span>
                <span>Digital edition: {prices[1] && prices[1].price > 0 ? `${prices[1].price} $` : 'NOT AVAILABLE'}</span>
            </TextWrapper>
            <Link to="/comics">Back to all</Link>
        </DetailedWrapper>
    )
}

function View () {
    return (
        <>

        </>
    )
}