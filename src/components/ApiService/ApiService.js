export class ApiService {
    constructor() {
        this.baseHttp = 'https://gateway.marvel.com:443/v1/public/';
        this.apiKey = 'e62e309b7048d9dc3404411cc8e7e029';
        this.curentOffset = 0;
    }
    async getCharacters(count=9, offset=this.curentOffset) {
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
}
