import { Button } from "../style/Button";
import { useSearchItems } from "../../hooks/useSearchItems";
import { SearchComicsWriper } from "./stylesSearchComics";
import { InputWrapper, Label } from "./stylesSearchCharacter";

export const SearchComics = ({ onSearch, value, setCurrentSearchValue }) => {
    const { onInput, name, search, error } = useSearchItems({onSearch});

    const message = error ? 'Search value is iccorect' : '';
    return (
    <SearchComicsWriper as='nav'>
        <h2>Find your favorite comics:</h2>
        <form onSubmit={(e) => { e.preventDefault(); search();} }>
            <InputWrapper>
                <input onChange={(e) => {
                    onInput(e); 
                    if(setCurrentSearchValue)
                        setCurrentSearchValue(e.target.value);
                    }} placeholder="Enter comics title" value={name || value} type="text" name="characterName" id="characterName" />
                <Button type="submit">FIND</Button>
            </InputWrapper>
            <Label htmlFor="characterName">{message}</Label>
        </form>
    </SearchComicsWriper>
    )
}