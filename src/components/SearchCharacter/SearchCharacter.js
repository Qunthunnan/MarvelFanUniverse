import { memo, useEffect, useRef, useState } from "react";
import { Button } from "../style/Button";
import { CloseBtn  } from "../style/CloseBtn";
import {SearchWriper, InputWrapper, Label} from "./stylesSearchCharacter";

export const SearchCharacter = memo(({ onSwichSearch, mobileSearchShowed, onSearch, cancelSearch }) => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);

    let searchTimer = useRef();
    let isSearch = useRef(false);

    useEffect(() => {
        console.log('render search');
        clearTimeout(searchTimer.current);
    });

    useEffect(() => {
        if(isSearch.current) {
            searchTimer.current = setTimeout(search, 1000);
            console.log(`name changed: ${name}`);
        }
    }, [name]);

    useEffect(() => {
        console.log('search mounted');
        return () => {
            console.log('search unmounted');
            clearTimeout(searchTimer.current);
        }
    }, []);

    const onInput = (e) => {
        console.log('input ', e.target.value);
        isSearch.current = true;
        setError(false);
        setName(e.target.value);
    }

    const search = () => {
        if(validate()) {
            console.log('local search');
            onSearch(name);
        } else {
            setError(true);
        }
    }

    const validate = () => {
        const validValue = /^[А-яЎўїІіҐґЄєЁёA-z -]*$/;
        return name === '' || name.match(validValue);
    }

    const message = error ? 'Search value is iccorect' : '';

    return (
        <SearchWriper $mobileActive={ mobileSearchShowed }>
            <CloseBtn onClick={ onSwichSearch }>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                </svg>
            </CloseBtn>
            <h2>Or find a character by name:</h2>
            <form onSubmit={(e) => { e.preventDefault(); search();} }>
                <InputWrapper>
                    <input onChange={onInput} placeholder="Enter name" value={name} type="text" name="characterName" id="characterName" />
                    <Button type="submit">FIND</Button>
                </InputWrapper>
                <Label htmlFor="characterName">{message}</Label>
            </form>
        </SearchWriper>
    )
});