import { getCookie, setCookie } from "../cookie/cookie";
export class ApiService {
    constructor() {
        this._baseHttp = 'https://gateway.marvel.com:443/v1/public';
        this._apiKey = 'e62e309b7048d9dc3404411cc8e7e029';

        this.charactersCount = +getCookie('CharactersCount');
    }

    

    async getResource(url) {
        const result = await fetch(url);
        
        if(!result.ok) {
            throw new Error(`${result.status}: ${result.statusText}`);
        } 

        return await result.json();
    }

    async getCharacters(count=9, offset=0) {
        const result = await this.getResource(`${this._baseHttp}/characters?apikey=${this._apiKey}&limit=${count}&offset=${offset}&orderBy=-modified`);
        return result.data.results.map(this._transformCharacter);
    }

    async getCharacterById(id) {
        const result = await this.getResource(`${this._baseHttp}/characters/${id}?apikey=${this._apiKey}`);
        return this._transformCharacter(result.data.results[0]);
    }

    async getCharactersCount() {
        if(this.charactersCount) {
            return new Promise((resolve)=>{
                return resolve(this.charactersCount);
            });
        } else {
            const result = await this.getResource(`${this._baseHttp}/characters?apikey=${this._apiKey}&limit=${1}&offset=${0}`);
            setCookie('CharactersCount', result.data.total, 1);
            return result.data.total;
        }
    }
    
    async searchCharactersByName(name, count=9, offset=0) {
        const result = await this.getResource(`${this._baseHttp}/characters?apikey=${this._apiKey}&nameStartsWith=${name}&limit=${count}&offset=${offset}`);
        return result.data.results.map(this._transformCharacter);
    }

    async getComicses(count=8, offset=0) {
        const result = await this.getResource(`${this._baseHttp}/comics?apikey=${this._apiKey}&limit=${count}&offset=${offset}`);
        return result.data.results.map(this._transformComics);
    }

    async getComicsById(id) {
        const result = await this.getResource(`${this._baseHttp}/comics/${id}?apikey=${this._apiKey}`);
        return this._transformComics(result.data.results[0]);
    }

    _transformCharacter(data) {
        return {
            id: data.id,
            name: data.name,
            description: data.description,
            thumbnail: data.thumbnail,
            urls: data.urls,
            comics: data.comics
        }
    }

    _transformComics(data) {
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
}
