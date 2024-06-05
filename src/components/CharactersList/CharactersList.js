import { Component } from "react";

import { CharacterCard } from "../CharacterCard/CharacterCard";

import { List, Section, WideButtonBottom } from "./stylesCharacterList";
import { Loader } from "../Loader/Loader";
import { ApiService } from "../../services/ApiService/ApiService";
import Error from "../Error/Error";
import { getRandNum } from "../../services/randomValues/randomValues";

export class CharactersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            characters: null,
            loading: false,
            loadingMore: false,
            loadingMoreError: false,
            error: false,
            count: null
        }
        
        this.offset = 0;
    }
    render() {
        const { onOpenCharacter, onCloseMobileCharacterInfo, activeCharacter } = this.props;
        const { characters, error, loading, loadingMore, loadingMoreError } = this.state;
        
        const errorImage = error ? <><Error/><p>A system error has occurred, please try again later</p></>  : null;
        const loader = loading ? <Loader/> : null;
        const charactersListItems = characters && !(error || loading) ? <View onOpenCharacter={onOpenCharacter} onCloseMobileCharacterInfo={onCloseMobileCharacterInfo} activeCharacter={activeCharacter} characters={characters}/> : null;
        const LoadMoreLoading = loadingMore ? <Loader/> : null;
        const LoadMoreError = loadingMoreError ? <><Error/><p>A system error has occurred, please try again later</p></> : null;
        const LoadMoreButtons = !(loadingMore || loadingMoreError) ? <WideButtonBottom onClick={this.onLoadMore}>LOAD MORE</WideButtonBottom> : null;

        return (
        <Section>
            <List>
                {errorImage}
                {loader}
                {charactersListItems}
            </List>
            {LoadMoreLoading}
            {LoadMoreError}
            {LoadMoreButtons}
        </Section>
        );
    }

    componentDidMount() {
        this.loadCharacters();
    }

    loadCharacters = () => {
        const marvelApi = new ApiService();
        this.setState({
            loading: true,
            error: null
        });
        const count = this.getTargetCount();
        this.offset = this.getRandomCharactersOffset();
        marvelApi.getCharacters(count, this.offset)
        .then(characters => {
            this.setState({
                loading: false,
                error: false,
                characters: characters
            });
        })
        .catch(() => {
            this.setState({
                loading: false,
                error: true
            });
        });
    }

    getTargetCount = () => {
        let targetCount = 8;
        if(document.documentElement.clientWidth >= 992) {
            targetCount = 9;
        }

        return targetCount;
    }

    getRandomCharactersOffset = () => {
        const { charactersMaxCount } = this.props;
        return getRandNum(1, (charactersMaxCount - 1) - (this.getTargetCount() * 5));
    }

    onLoadMore = () => {
        this.setState({
            loadingMore: true,
            loadingMoreError: false
        });

        const marvelService = new ApiService();
        const { charactersMaxCount } = this.props;
        const count = this.getTargetCount();

        if(this.offset + (count * 2) > charactersMaxCount) {
            const diff = (charactersMaxCount) - (this.offset + count);
            let part1 = [];

            marvelService.getCharacters((diff + 1), this.offset + count)
            .then(data => {
                part1 = data;
                this.offset = 0;
                return marvelService.getCharacters((count - diff), this.offset);
            })
            .then(data => {
                this.offset -= diff;
                this.addCharactersFromParts(part1, data);
            })
            .catch(this.errorOnAddCharacters);
        }
        else {
            this.offset += count;

            marvelService.getCharacters(count, this.offset)
            .then(this.addCharacters)
            .catch(this.errorOnAddCharacters);
        }
    }

    addCharacters = (addCharacters) => {
        const { characters } = this.state;

        this.setState({
            loadingMore: false,
            loadingMoreError: false,
            characters: [...characters, ...addCharacters]
        });
    }

    addCharactersFromParts = (part1, part2) => {
        const { characters } = this.state;

        this.setState({
            loadingMore: false,
            loadingMoreError: false,
            characters: [...characters, ...part1, ...part2]
        });
    }

    errorOnAddCharacters = () => {
        this.offset = 0;

        this.setState({
            loadingMore: false,
            loadingMoreError: true
        });
    }
}



const View = ({characters, onOpenCharacter, onCloseMobileCharacterInfo, activeCharacter}) => {
    return(
        <>{characters.map((character) => ( <CharacterCard isActive={(activeCharacter && activeCharacter.id === character.id) ? true : false} onCloseMobileCharacterInfo={ onCloseMobileCharacterInfo } onOpenCharacter={ () => { 
            onOpenCharacter(character); 
        } } key={character.id} character={character}/> ))}</>
    )
}