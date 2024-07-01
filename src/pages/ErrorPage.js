import { Link, useRouteError } from "react-router-dom"
import { Container } from "../components/style/Container";
import { ErrorPageWrapper, LinkWrapper } from "../components/style/ErrorPage";

export default function ErrorPage () {
    const error = useRouteError();
    return (
        <Container>
            <ErrorPageWrapper>
                <h2>It looks like an error.</h2>
                <h3>{error.statusText || error.message}</h3>
                <LinkWrapper>
                    <Link  to={'/'}>Let's go back.</Link>
                </LinkWrapper>
            </ErrorPageWrapper>
        </Container>
    )
}