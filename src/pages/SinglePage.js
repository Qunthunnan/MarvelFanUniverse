import { EntityDetailed } from "../components/EntityDetailed/EntityDeatailed";
import { Container } from "../components/style/Container";
import { useParams } from "react-router-dom";
import { useMarvelService } from "../services/ApiService/ApiService";

export const SingleEntityPage = ({ Component, type }) => {
    const { id } = useParams();
    const { getCharacterById, getComicsByCharacterId, getComicsById, getCharactersByComicsId, process, setProcess } = useMarvelService();

    function setGettingType(type) {
        switch(type) {
            case 'character':
                return [getCharacterById, getComicsByCharacterId];
            case 'comics':
                return [getComicsById, getCharactersByComicsId];
            default:
                throw new Error(`Unexpected type ${type} of getData in SingleEntityPage`)
        }
    }

    return ( 
        <Container>
            <EntityDetailed key={id} Render={Component} processTools={[process, setProcess, setGettingType(type)]} id={id} />
        </Container>
    )
}

