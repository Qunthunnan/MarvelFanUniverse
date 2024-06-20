import { Button } from "../style/Button";
import { CloseBtn  } from "../style/CloseBtn";
import { useSearchItems } from "../../hooks/useSearchItems";
import { SearchComicsWriper } from "./stylesSearchComics";
import { InputWrapper, Label } from "./stylesSearchCharacter";

export const SearchComics = ({ onSearch }) => {
    const { onInput, name, search, error } = useSearchItems({onSearch});

    const message = error ? 'Search value is iccorect' : '';
    return (
    <SearchComicsWriper as='nav'>
        <h2>Find your favorite comics:</h2>
        <form onSubmit={(e) => { e.preventDefault(); search();} }>
            <InputWrapper>
                <input onChange={onInput} placeholder="Enter comics title" value={name} type="text" name="characterName" id="characterName" />
                <Button type="submit">FIND</Button>
            </InputWrapper>
            <Label htmlFor="characterName">{message}</Label>
        </form>
    </SearchComicsWriper>
    )
}