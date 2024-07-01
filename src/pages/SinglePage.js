import { EntityDetailed } from "../components/EntityDetailed/EntityDeatailed";
import { Container } from "../components/style/Container";
import { useParams } from "react-router-dom";
import { useMarvelService } from "../services/ApiService/ApiService";
import { ErrorBoundary } from "../components/ErrorBoundary/ErrorBoundary";
import { useEffect, useState } from "react";

export default function SingleEntityPage ({ Component, type }) {
   
        const { id } = useParams();
        const { getCharacterById, getComicsByCharacterId, getComicsById, getCharactersByComicsId, process, setProcess } = useMarvelService();
        const [error, setError] = useState();
    
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

        useEffect(() => {
            if(error)
                throw new Error(error);
        }, [error])

        function handleError(error) {
            setError(error);
        }

        return ( 
            <Container>
                <ErrorBoundary>
                    <EntityDetailed key={id} Render={Component} processTools={[process, setProcess, setGettingType(type)]} id={id} handleError={handleError}/>
                </ErrorBoundary>
            </Container>
        )

}