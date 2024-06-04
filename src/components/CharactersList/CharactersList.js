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
        
        const errorImage = error ? <Error/> : null;
        const loader = loading ? <Loader/> : null;
        const charactersListItems = characters && !(error || loading) ? <View onOpenCharacter={onOpenCharacter} onCloseMobileCharacterInfo={onCloseMobileCharacterInfo} activeCharacter={activeCharacter} characters={characters}/> : null;
        const LoadMoreLoading = loadingMore ? <Loader/> : null;
        const LoadMoreError = loadingMoreError ? <Error/> : null;
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
        // return getRandNum(1, (charactersMaxCount - 1) - (this.getTargetCount() * 5));
        return charactersMaxCount - 13;
    }

    onLoadMore = () => {
        this.setState({
            loadingMore: true,
            loadingMoreError: false
        });

        const marvelService = new ApiService();
        const { characters } = this.state;
        const { charactersMaxCount } = this.props;
        const count = this.getTargetCount();

        if(this.offset + count*2 > charactersMaxCount) {
            const diff = (this.offset + count) - (charactersMaxCount - 1 );
            let part1 = [];

            console.log('diff',diff);
            console.log('offset + count: ', this.offset + count);
            console.log('offset', this.offset);
            console.log('count - diff', count - diff);

            marvelService.getCharacters(diff, this.offset)
            .then(data => {
                part1 = data;
                this.offset = 0;
                console.log('part1', part1);

                return marvelService.getCharacters((count - diff), this.offset);
            })
            .then(data => {
                this.setState({
                    loadingMore: false,
                    loadingMoreError: false,
                    characters: [...characters, ...part1, ...data]
                });
            })
            .catch(() => {
                this.offset -= count;
                this.setState({
                    loadingMore: false,
                    loadingMoreError: true
                });
            });
        }
        else {
            if( this.offset + count*2 === charactersMaxCount ) {
                this.offset = 0;
            } else {
                this.offset += count;
            }
            marvelService.getCharacters(count, this.offset)
            .then(data => {
                this.setState({
                    loadingMore: false,
                    loadingMoreError: false,
                    characters: [...characters, ...data]
                });
            })
            .catch(() => {
                this.offset -= count;
                this.setState({
                    loadingMore: false,
                    loadingMoreError: true
                });
            });
        }
    }
}

const View = ({characters, onOpenCharacter, onCloseMobileCharacterInfo, activeCharacter}) => {
    return(
        <>{characters.map((character) => ( <CharacterCard isActive={(activeCharacter && activeCharacter.id === character.id) ? true : false} onCloseMobileCharacterInfo={ onCloseMobileCharacterInfo } onOpenCharacter={ () => { 
            onOpenCharacter(character); 
        } } key={character.id} character={character}/> ))}</>
    )
}