import { setContent } from "../../utils/setContent";
import { DetailedWrapper, TextWrapper } from "./stylesComicsDetailed";
import { Link } from "react-router-dom";

export const ComicsDetailed = ({id}) => {
    const { process, setProcess, getComicsById } = useMarvelService();
    const [comics, setComics] = useState();

    useEffect(() => {
        getComicsById(id)
        .then(result => { 
            setComics(result);
        })
        .then(() => {
            setProcess('view')
        });
    }, []);


    return (
        <DetailedWrapper>
            {setContent(process, View, {comics: comics})}
        </DetailedWrapper>
    )
}

function View () {
    return (
        <>
            <img height={450} width={293} src={image} alt={'comics ' + name} />
            <TextWrapper>
                <h2>{name}</h2>
                <p>{description}</p>
                <p>{pages} pages</p>
                <p>Language: {lang}</p>
                <span>{price ? price : 'NOT AVAILABLE'}$</span>
            </TextWrapper>
            <Link to="/comics">Back to all</Link>
        </>
    )
}