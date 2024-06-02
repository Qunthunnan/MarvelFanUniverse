import { Component } from "react";

import { CharacterCard } from "../CharacterCard/CharacterCard";

import { List, Section, WideButtonBottom } from "./stylesCharacterList";
import { Loader } from "../Loader/Loader";
import { ApiService } from "../../services/ApiService/ApiService";
import Error from "../Error/Error";

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
        this.offset = 0;
    }
    render() {
        const { onOpenCharacter, onCloseMobileCharacterInfo } = this.props;

        const { characters, error, loading } = this.state;
        const errorImage = error ? <Error/> : null;
        const loader = loading ? <Loader/> : null;
        const charactersListItems = characters && !(error || loading) ? <View characters={characters}/> : null;

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
        marvelApi.getCharacters(count, this.offset)
        .then(characters => {
            this.offset += count + 1;
            this.setState({
                loading: false,
                characters: characters,
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

    onClickCharacter = (id) => {
        this.setState({
            activeCharacter: id
        });
    }
}

const View = ({characters, onOpenCharacter, onCloseMobileCharacterInfo}) => {
    return(
        <>{characters.map(({name, thumbnail, id}) => ( <CharacterCard onCloseMobileCharacterInfo={ onCloseMobileCharacterInfo } onOpenCharacter={ () => { 
            onOpenCharacter(id); 
            this.onClickCharacter(id); 
        } } key={id} name={ name } thumbnail={ thumbnail }></CharacterCard> ))}</>
    )
}