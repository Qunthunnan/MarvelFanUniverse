import { Component } from "react";
import { ApiService } from "../../services/ApiService/ApiService";
import { Button } from "../style/Button";
import { Wrapper, RandomCharacterInfo, InfoWrapper, ButtonsWrapper, RandomBaner } from "./stylesRandomCharacter";
import { vars } from "../style/Vars";
import { Loader } from "../Loader/Loader";
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
                    <Button href={urls[0].url} >HOMEPAGE</Button>
                    <Button href={urls[1].url} color={vars.marvelGray}>WIKI</Button>
                </ButtonsWrapper>
            </InfoWrapper>
        </>
    )
}

export class RandomCharacter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            character: null,
            loading: null,
            error: null
        }
    }
    render() {
        const { character, loading, error } = this.state;

        const loader = loading ? <Loader/> : null;
        const errrorImage = error ? <Error/> : null;
        const content = !(error || loading) && character ? <View character={character}/> : null;

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
                    <Button onClick={this.updateCharacter}>TRY IT</Button>
                </RandomBaner>
            </Wrapper>
        )
    }

    componentDidMount() {
        console.log('did mount');
        this.updateCharacter();
    }

    updateCharacter = () => {
        function getRandNum(min, max) {
            return Math.round(Math.random() * (max - min) + min);
        }
        const marverlApi = new ApiService();


        this.setState({
            loading: true,
            error: null
        });

        marverlApi.getCharactersCount()
        .then(count => ( marverlApi.getCharacters(1, getRandNum(1, count)) ))
        .then(([{name, description, thumbnail, urls}]) => {
            this.setState({
                loading: false,
                character: {
                    name: name,
                    description: description,
                    thumbnail: thumbnail, 
                    urls: urls
                }
            });
        })
        .catch(() => {
            this.setState({
                loading: false,
                error: true
            });
        });
    }
}

