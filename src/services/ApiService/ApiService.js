export class ApiService {
    _baseHttp = 'https://gateway.marvel.com:443/v1/public';
    _apiKey = 'e62e309b7048d9dc3404411cc8e7e029';

    async getResource(url) {
        const result = await fetch(url);
        
        if(!result.ok) {
            throw new Error(`${result.status}: ${result.statusText}`);
        } 

        return await result.json();
    }

    getCharacters(count=9, offset=0) {
        const characters = this.getResource(`${this._baseHttp}/characters?apikey=${this._apiKey}&limit=${count}&offset=${offset}`);
        return characters;
    }

    getCharacterById(id) {
        const character = this.getResource(`${this._baseHttp}/characters/${id}?apikey=${this._apiKey}`);
        return character;
    }
    
    searchCharactersByName(name, count, offset) {
        const characters = this.getResource(`${this._baseHttp}/characters?apikey=${this._apiKey}&nameStartsWith=${name}&limit=${count}&offset=${offset}`);
        return characters;
    }

    getComicses(count=8, offset=this.curentComicsesOffset) {
        const comicses = this.getResource(`${this._baseHttp}/comics?apikey=${this._apiKey}&limit=${count}&offset=${offset}`);
        return comicses;
    }

    getComicsById(id) {
        const comics = this.getResource(`${this._baseHttp}/comics/${id}?apikey=${this._apiKey}`);
        return comics;
    }
}
