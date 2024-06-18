import { EntityDetailed } from "../components/EntityDetailed/EntityDeatailed";
import { Container } from "../components/style/Container";
import { useParams, useLocation } from "react-router-dom";

export const SingleEntityPage = ({ Component}) => {
    const { id } = useParams();
    const test = useLocation();

    console.dir(test);

    return ( 
        <Container>
            <EntityDetailed id={id} />
        </Container>
    )
}