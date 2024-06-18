import { EntityDetailed } from "../components/EntityDetailed/EntityDeatailed";
import { Container } from "../components/style/Container";
import { useParams } from "react-router-dom";
import { useMarvelService } from "../services/ApiService/ApiService";

export const SingleEntityPage = ({ Component, type }) => {
    const { id } = useParams();
    const { getCharacterById, getComicsById, process, setProcess } = useMarvelService();

    function setGettingType(type) {
        switch(type) {
            case 'character':
                return getCharacterById;
            case 'comics':
                return getComicsById;
            default:
                throw new Error(`Unexpected type ${type} of getData in SingleEntityPage`)
        }
    }

    return ( 
        <Container>
            <EntityDetailed Render={Component} processTools={[process, setProcess, setGettingType(type)]} id={id} />
        </Container>
    )
}

