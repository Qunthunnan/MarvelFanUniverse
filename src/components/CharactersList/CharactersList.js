import { Component } from "react";

import { CharacterCard } from "../CharacterCard/CharacterCard";

import { List, Section, WideButtonBottom } from "./stylesCharacterList";
import { Loader } from "../Loader/Loader";
import { ApiService } from "../../services/ApiService/ApiService";
import Error from "../Error/Error";
import { getRandNum } from "../../services/randomValues/randomValues";
import uniqid from 'uniqid';


export class CharactersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            characters: null,
            loading: false,
            loadingMore: false,
            loadingMoreError: false,
            error: false,
            count: null,
            charactersLimitReached: false
        }
        
        this.offset = 0;
        this.charactersRendered = 0;
    }
    render() {
        const { onOpenCharacter, onCloseMobileCharacterInfo, activeCharacter } = this.props;
        const { characters, error, loading, loadingMore, loadingMoreError, charactersLimitReached} = this.state;
        
        const errorImage = error ? <><Error/><p>A system error has occurred, please try again later</p></>  : null;
        const loader = loading ? <Loader/> : null;
        const charactersListItems = characters && !(error || loading) ? <View onOpenCharacter={onOpenCharacter} onCloseMobileCharacterInfo={onCloseMobileCharacterInfo} activeCharacter={activeCharacter} characters={characters}/> : null;
        const LoadMoreLoading = loadingMore ? <Loader/> : null;
        const LoadMoreError = loadingMoreError ? <><Error/><p>A system error has occurred, please try again later</p></> : null;
        const LoadMoreButtons = !(loadingMore || loadingMoreError || charactersLimitReached) ? <WideButtonBottom onClick={this.onLoadMore}>LOAD MORE</WideButtonBottom> : null;

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

    componentDidUpdate() {
        console.log('characters rendered: ' + this.charactersRendered);
        if(this.state.characters)
            console.log('real curent rendered: ' + this.state.characters.length);
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
        .then(this.firstAddCharacters)
        .catch(this.errorOnLoadCharacters);
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

        if(this.charactersRendered + count >= charactersMaxCount) {
            this.setState({
                charactersLimitReached: true
            });
            marvelService.getCharacters(count, (this.offset + count))
            .then(this.addCharacters)
            .catch(this.errorOnAddCharacters);
            return undefined;
        }

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

    firstAddCharacters = (addCharacters) => {
        this.setState(()=> (
            {
                loading: false,
                error: false,
                characters: addCharacters
            }
        ), () => {
            this.charactersRendered = this.state.characters.length;
        });
    }

    addCharacters = (addCharacters) => {
        this.setState(({characters}) => (
            {
                loadingMore: false,
                loadingMoreError: false,
                characters: [...characters, ...addCharacters]
            }
        ), () => {
            this.charactersRendered = this.state.characters.length;
        });
    }

    addCharactersFromParts = (part1, part2) => {
        this.setState(({characters}) => (
            {
                loadingMore: false,
                loadingMoreError: false,
                characters: [...characters, ...part1, ...part2]
            }
        ), () => {
            this.charactersRendered = this.state.characters.length;
        });
    }

    errorOnAddCharacters = () => {
        this.offset = 0;
        this.setState({
            loadingMore: false,
            loadingMoreError: true
        });
    }

    errorOnLoadCharacters = () => {
        this.offset = 0;
        this.setState({
            loading: false,
            error: true
        });
    }
}



const View = ({characters, onOpenCharacter, onCloseMobileCharacterInfo, activeCharacter}) => {
    return(
        <>{characters.map((character) => ( <CharacterCard isActive={(activeCharacter && activeCharacter.id === character.id) ? true : false} onCloseMobileCharacterInfo={ onCloseMobileCharacterInfo } onOpenCharacter={ () => { 
            onOpenCharacter(character); 
        } } key={uniqid()} character={character}/> ))}</>
    )
}