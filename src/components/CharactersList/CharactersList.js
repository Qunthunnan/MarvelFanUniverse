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
            loading: null,
            loadingMore: null,
            error: null,
            count: null
        }
    }
    render() {
        const { onOpenCharacter, onCloseMobileCharacterInfo, activeCharacter } = this.props;

        const { characters, error, loading } = this.state;
        const errorImage = error ? <Error/> : null;
        const loader = loading ? <Loader/> : null;
        const charactersListItems = characters && !(error || loading) ? <View onOpenCharacter={onOpenCharacter} onCloseMobileCharacterInfo={onCloseMobileCharacterInfo} activeCharacter={activeCharacter} characters={characters}/> : null;

        return (
        <Section>
            <List>
                {errorImage}
                {loader}
                {charactersListItems}
            </List>
            <WideButtonBottom>LOAD MORE</WideButtonBottom>
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
        marvelApi.getCharacters(count, this.getRandomCharactersOffset())
        .then(characters => {
            this.setState({
                loading: false,
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

    getTargetCount() {
        let targetCount = 8;
        if(document.documentElement.clientWidth >= 992) {
            targetCount = 9;
        }

        return targetCount;
    }

    getRandomCharactersOffset() {
        const { charactersMaxCount } = this.props;
        return getRandNum(1, (charactersMaxCount - 1) - (this.getTargetCount() * 5));
    }
}

const View = ({characters, onOpenCharacter, onCloseMobileCharacterInfo, activeCharacter}) => {
    return(
        <>{characters.map((character) => ( <CharacterCard isActive={(activeCharacter && activeCharacter.id === character.id) ? true : false} onCloseMobileCharacterInfo={ onCloseMobileCharacterInfo } onOpenCharacter={ () => { 
            onOpenCharacter(character); 
        } } key={character.id} character={character}/> ))}</>
    )
}