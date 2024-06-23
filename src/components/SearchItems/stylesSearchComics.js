import styled from "styled-components";
import { SearchWriper } from "./stylesSearchCharacter";

const SearchComicsWriper = styled(SearchWriper)`
    @media (min-width: 320px) {
        display: block;
        margin: 20px 0 0 0;
        width: 100%;
        padding: 15px;
        a {
            display: none;
        }
    }
    @media (min-width: 768px) {
        margin: 50px 0 0 0;
        padding: 25px;
        a {
            display: flex;
        }
    }
`;

export { SearchComicsWriper }