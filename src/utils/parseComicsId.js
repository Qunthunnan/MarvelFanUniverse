export function parseComicsId (comicsUrl) {
    const regex = /http:\/\/gateway\.marvel\.com\/v1\/public\/comics\/([\d]*)/;
    return +comicsUrl.replace(regex, '$1')
}