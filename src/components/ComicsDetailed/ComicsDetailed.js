import { DetailedWrapper, TextWrapper } from "./stylesComicsDetailed";
import { Link } from "react-router-dom";
import refComics from "../../resources/imgs/comics.jpg"

export const ComicsDetailed = ({id}) => {

    const { name, description, image, pages, lang, price } = {
        name: 'TestComics',
        description: 'testDescrAbouskfhskfhskfhskhfkshfkhsfkshfsfsf',
        image: refComics,
        pages: 123,
        lang: 'UA',
        price: 5.44
    }

    console.log(id);

    return (
        <DetailedWrapper>
            <img height={450} width={293} src={image} alt={'comics ' + name} />
            <TextWrapper>
                <h2>{name}</h2>
                <p>{description}</p>
                <p>{pages} pages</p>
                <p>Language: {lang}</p>
                <span>{price ? price : 'NOT AVAILABLE'}$</span>
            </TextWrapper>
            <Link to="/comics">Back to all</Link>
        </DetailedWrapper>
    )
}