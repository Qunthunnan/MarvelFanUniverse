import { Link } from "react-router-dom";
import { Container } from "../components/style/Container";
import { NotFoundPageWrapper } from "../components/style/NotFoundPage";

export default function NotFoundPage () {
    return (
        <Container>
            <NotFoundPageWrapper>
                <h2>This page does not exist</h2>
                <p>
                    <Link to="/">Go back ?</Link>
                </p>
            </NotFoundPageWrapper>
        </Container>
    )

}