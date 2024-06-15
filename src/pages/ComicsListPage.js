import { Container } from "../components/style/Container";
import { ComicsList } from "../components/ComicsList/ComicsList";
import { ComicsWrapper } from "../components/ComicsList/stylesComicsList";
import { Routes, Route } from "react-router-dom";
import { ComicsDetailedPage } from "./ComicsDetailedPage";

export const ComicsListPage = () => {
    return ( 
    <>
        <Container>
            <ComicsWrapper>
                <ComicsList/>
            </ComicsWrapper>
        </Container>
    </>
    )
}