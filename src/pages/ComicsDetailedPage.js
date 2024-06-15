import { Container } from "../components/style/Container";
import { ComicsDetailed } from "../components/ComicsDetailed/ComicsDetailed"
import { useParams } from "react-router-dom";

export const ComicsDetailedPage = () => {

    const { comics } = useParams();

    return (
        <Container>
            <ComicsDetailed id = {comics}/>
        </Container>
    )
}