import { MD5 } from "crypto-js";

export default class MarvelService {
    _apiBase = "https://gateway.marvel.com:443/v1/public/";
    _publicKey = "e1ad09dfbb09ae3a53228bc082e7d324";
    _apikey = "apikey=" + this._publicKey;
    _privateKey = "59f42d801f66db413037e04faf1ddba4cb3322b5";
    ts = 1;

    getResource = async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`)
        };

        return await res.json();
    };

    createRequestUrl = (method, params = {}) => {
        const query = Object.entries(params).map(([key, value]) => {
            return `${key}=${value}`;
        }).join("&");
        const hash = "&hash=" + MD5(this.ts + this._privateKey + this._publicKey).toString();
        return this._apiBase + method + `?ts=${this.ts}&` + query + this._apikey + hash;
    };

    getAllCharacters = async () => {
        const url = this.createRequestUrl("characters");
        const res = this.getResource(url);
        const data = await res.then(result => {
            return result.data.results.map(this._transformCharacter);
        });
        return data;
    };

    getCharacter = async (id) => {
        const url = this.createRequestUrl(`characters/${id}`)
        const res = await this.getResource(url);
        return this._transformCharacter(res.data.results[0]);
    };

    _transformCharacter = (character) => {
        return {
            id: character.id,
            name: character.name,
            description: character.description,
            thumbnail: character.thumbnail.path + "." + character.thumbnail.extension,
            homePage: character.urls[0].url,
            wiki: character.urls[1].url,
            comics: character.comics.items
        };
    };
};

