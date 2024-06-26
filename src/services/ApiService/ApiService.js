import { getCookie, setCookie } from "../../utils/cookie";
import { useHttp } from "../../hooks/http.hook";

export function useMarvelService (startLoading = true) {
    
    const _baseHttp = 'https://gateway.marvel.com:443/v1/public';
    const _apiKey = 'e62e309b7048d9dc3404411cc8e7e029';
    const charactersCount = +getCookie('charactersCount');
    const comicsCount = +getCookie('comicsCount');

    const { loading, setLoading, error, process, setError, setProcess, getResource} = useHttp(startLoading);

    async function getCharacters(count=9, offset=0, order=`-modified`) {
        const result = await getResource(`${_baseHttp}/characters?apikey=${_apiKey}&limit=${count}&offset=${offset}&orderBy=${order}`);
        return {
            count: result.data.total,
            data: result.data.results.map(_transformCharacter)
        } 
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
            setCookie('charactersCount', result.data.total, 1);
            return result.data.total;
        }
    }

    async function getComicsCount() {
        if(comicsCount) {
            setLoading(false);
            setError(false);
            return new Promise((resolve)=>{
                return resolve(comicsCount);
            });
        } else {
            const result = await getResource(`${_baseHttp}/comics?apikey=${_apiKey}&limit=${1}&offset=${0}`);
            setCookie('comicsCount', result.data.total, 1);
            return result.data.total;
        }
    }
    
    async function searchCharactersByName(name, count=9, offset=0, order='name') {
        const result = await getResource(`${_baseHttp}/characters?apikey=${_apiKey}&nameStartsWith=${name}&limit=${count}&offset=${offset}&orderBy=${order}`);
        return {
            count: result.data.total,
            data: result.data.results.map(_transformCharacter)
        } 
    }

    async function searchComicsesByTitle(title, count=20, offset=0, order='title') {
        const result = await getResource(`${_baseHttp}/comics?apikey=${_apiKey}&titleStartsWith=${title}&limit=${count}&offset=${offset}&orderBy=${order}`);
        return {
            count: result.data.total,
            data: result.data.results.map(_transformComics)
        } 
    }

    async function getComicses(count=8, offset=0, order='-focDate') {
        const result = await getResource(`${_baseHttp}/comics?apikey=${_apiKey}&limit=${count}&offset=${offset}&orderBy=${order}`);
        return {
            count: result.data.total,
            data: result.data.results.map(_transformComics)
        }
    }

    async function getComicsById(id) {
        const result = await getResource(`${_baseHttp}/comics/${id}?apikey=${_apiKey}`);
        return _transformComics(result.data.results[0]);
    }

    async function getComicsByCharacterId(id, count=20, offset=0, order='-focDate') {
        const result = await getResource(`${_baseHttp}/characters/${id}/comics?offset=${offset}&limit=${count}&orderBy=${order}&apikey=${_apiKey}`);
        return {
            count: result.data.total,
            data: result.data.results.map(_transformComics)
        }
    }

    async function getCharactersByComicsId(id, count=20, offset=0, order='name') {
        const result = await getResource(`${_baseHttp}/comics/${id}/characters?apikey=${_apiKey}&limit=${count}&orderBy=${order}&offset=${offset}`);
        return {
            count: result.data.total,
            data: result.data.results.map(_transformCharacter)
        } 
    }

    async function searchComicsByCharacterId(id, title, count=20, offset=0, order='-focDate') {
        const result = await getResource(`${_baseHttp}/characters/${id}/comics?orderBy=${order}&apikey=${_apiKey}&titleStartsWith=${title}&offset=${offset}&limit=${count}`);
        return {
            count: result.data.total,
            data: result.data.results.map(_transformComics)
        } 
    }

    async function searchCharactersByComicsId(id, name, count=20, offset=0, order='name') {
        const result = await getResource(`${_baseHttp}/comics/${id}/characters?apikey=${_apiKey}&nameStartsWith=${name}&offset=${offset}&limit=${count}&orderBy=${order}`);
        return {
            count: result.data.total,
            data: result.data.results.map(_transformCharacter)
        } 
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
            urls: data.urls,
        }
    }

    return { loading, setProcess, process, setLoading, error, setError, getCharacters, getCharacterById, getCharactersCount, searchCharactersByName, getComicses, getComicsById, searchComicsesByTitle, getComicsCount, getCharactersByComicsId, getComicsByCharacterId, searchCharactersByComicsId, searchComicsByCharacterId }
}
