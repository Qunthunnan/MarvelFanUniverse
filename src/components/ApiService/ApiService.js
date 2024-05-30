export class ApiService {
    constructor() {
        this.baseHttp = 'https://gateway.marvel.com:443/v1/public/';
        this.apiKey = 'e62e309b7048d9dc3404411cc8e7e029';
        this.curentCharactersOffset = 0;
        this.curentComicsesOffset = 0;
    }
    async getCharacters(count=9, offset=this.curentCharactersOffset) {
        const request = `${this.baseHttp}characters?apikey=${this.apiKey}&limit=${count}&offset=${offset}`;
        const result = await fetch(request)
        .then(response => response.json());

        if(result.code === 200) {
            return result;
        } else {
            console.error(new Error(result.message));
        }
    }

    async getCharacter(id) {
        const request = `${this.baseHttp}characters/${id}?apikey=${this.apiKey}`;
        const result = await fetch(request)
        .then(response => response.json());

        if(result.code === 200) {
            return result;
        } else {
            console.error(new Error(result.message));
        }
    }

    async getComics(count=8, offset=this.curentComicsesOffset) {
        const request = `${this.baseHttp}comics?apikey=${this.apiKey}&limit=${count}&offset=${offset}`;
        const result = await fetch(request)
        .then(response => response.json());

        if(result.code === 200) {
            return result;
        } else {
            console.error(new Error(result.message));
        }
    }

    async getComicsById(id) {
        const request = `${this.baseHttp}comics/${id}?apikey=${this.apiKey}`;
        const result = await fetch(request)
        .then(response => response.json());

        if(result.code === 200) {
            return result;
        } else {
            console.error(new Error(result.message));
        }
    }
}
