import { Container } from "../components/style/Container"
import { CharacterDetailed } from "../components/CharacterDetailed/CharacterDetailed";
import { useLocation, useParams } from "react-router-dom/cjs/react-router-dom.min";



export const CharacterDetailedPage = () => {
    const { character } = useParams();

    return ( 
        <Container>
            <CharacterDetailed id={character}/>
        </Container>
    )
}