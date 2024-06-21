import {  useEffect, useRef, useState } from "react";

export const useSearchItems = ( { onSearch } ) => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);

    let searchTimer = useRef();
    let isSearch = useRef(false);

    useEffect(() => {
        console.log('render search');
    });

    useEffect(() => {
        if(isSearch.current) {
            clearTimeout(searchTimer.current);
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

    return { onInput, search, name, error }
}