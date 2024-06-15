import { Container } from "../components/style/Container"
import { ComicsList } from "../components/ComicsList/ComicsList"
import { ComicsWrapper } from "../components/ComicsList/stylesComicsList"

export const ComicsListPage = () => {
    return (
        <Container>
            <ComicsWrapper>
                <ComicsList/>
            </ComicsWrapper>
        </Container>
    )
}