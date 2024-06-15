import { TextWrapper, DetailedWrapper } from './stylesCharacterDetailed.js';
import refImage from "../../resources/imgs/characterRef.jpg"
import { Link } from 'react-router-dom/cjs/react-router-dom.min.js';

export const CharacterDetailed = ({id}) => {

    const { name, description, image } = {
        name: 'test',
        description: 'sfhksfhskfhskfhskhfkshfskhfshfs',
        image: refImage 
    };

    console.log(id);

    return (
        <DetailedWrapper>
            <img height={293} width={293} src={image} alt={name} />
            <TextWrapper>
                <h2>{name}</h2>
                <p>{description}</p>
            </TextWrapper>
            <Link to="/">Back to all</Link>
        </DetailedWrapper>
    )

}