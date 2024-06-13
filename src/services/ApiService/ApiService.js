import { getCookie, setCookie } from "../cookie/cookie";
import { useHttp } from "../../hooks/http.hook";

export function useMarvelService (startLoading = true) {
    
    const _baseHttp = 'https://gateway.marvel.com:443/v1/public';
    const _apiKey = 'e62e309b7048d9dc3404411cc8e7e029';
    const charactersCount = +getCookie('CharactersCount');

    const { loading, setLoading, error, setError, getResource} = useHttp(startLoading);

    async function getCharacters(count=9, offset=0) {
        const result = await getResource(`${_baseHttp}/characters?apikey=${_apiKey}&limit=${count}&offset=${offset}&orderBy=-modified`);
        return result.data.results.map(_transformCharacter);
    }

    async function getCharacterById(id) {
        const result = await getResource(`${_baseHttp}/characters/${id}?apikey=${_apiKey}`);
        return _transformCharacter(result.data.results[0]);
    }

    async function getCharactersCount() {
        if(charactersCount) {
            setLoading(false);
            setError(false);
            return new Promise((resolve)=>{
                return resolve(charactersCount);
            });
        } else {
            const result = await getResource(`${_baseHttp}/characters?apikey=${_apiKey}&limit=${1}&offset=${0}`);
            setCookie('CharactersCount', result.data.total, 1);
            return result.data.total;
        }
    }
    
    async function searchCharactersByName(name, count=9, offset=0) {
        const result = await getResource(`${_baseHttp}/characters?apikey=${_apiKey}&nameStartsWith=${name}&limit=${count}&offset=${offset}`);
        return {
            count: result.data.total,
            data: result.data.results.map(_transformCharacter)
        } 
    }

    async function searchComicsesByTitle(title, count, offset) {
        const result = await getResource(`${_baseHttp}/comics?apikey=${_apiKey}&titleStartsWith=${title}&limit=${count}&offset=${offset}`);
        return {
            count: result.data.total,
            data: result.data.results.map(_transformCharacter)
        } 
    }

    async function getComicses(count=8, offset=0) {
        const result = await getResource(`${_baseHttp}/comics?apikey=${_apiKey}&limit=${count}&offset=${offset}`);
        return result.data.results.map(_transformComics);
    }

    async function getComicsById(id) {
        const result = await getResource(`${_baseHttp}/comics/${id}?apikey=${_apiKey}`);
        return _transformComics(result.data.results[0]);
    }

    function _transformCharacter(data) {
        return {
            id: data.id,
            name: data.name,
            description: data.description,
            thumbnail: data.thumbnail,
            urls: data.urls,
            comics: data.comics
        }
    }

    function _transformComics(data) {
        return {
            id: data.id,
            title: data.title,
            description: data.description,
            pageCount: data.pageCount,
            prices: data.prices,
            thumbnail: data.thumbnail,
            textObjects: data.textObjects,
            urls: data.urls,
        }
    }

    return { loading, setLoading, error, setError, getCharacters, getCharacterById, getCharactersCount, searchCharactersByName, getComicses, getComicsById, searchComicsesByTitle}
}
