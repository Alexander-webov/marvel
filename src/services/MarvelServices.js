import { useHttp } from '../hooks/http.hooks';


const useMarvelServices = () => {
    const { loading, error, request, clearError } = useHttp();
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=84cfc22f0dfa4f4e0be8dfd9416d23e2';
    const _baseOffset = '210';


    //Character
    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformCharacter)
    }


    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
        return _transformCharacter(res.data.results[0]);
    }


    const _transformCharacter = (cahr) => {
        return {
            id: cahr.id,
            name: cahr.name,
            description: cahr.description,
            thumbnail: cahr.thumbnail.path + '.' + cahr.thumbnail.extension,
            homepage: cahr.urls[0].url,
            wiki: cahr.urls[1].url,
            comics: cahr.comics.items
        }
    }


    //COMICS
    const getAllComics = async (offset = 1) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transforcomics)
    }


    const getAllTotalComics = async (offset = 1) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)
        return _transforcomic(res.data);
    }

    const _transforcomics = (cahr) => {
        return {
            id: cahr.id,
            thumbnail: cahr.thumbnail.path + '.' + cahr.thumbnail.extension,
            name: cahr.title,
            homepage: cahr.urls[0].url,
            price: cahr.prices[0].price,
        }
    }

    const _transforcomic = (cahr) => {
        return {
            total: cahr.total,
        }
    }


    return { loading, error, clearError, getAllCharacters, getCharacter, getAllComics, getAllTotalComics }

}



export default useMarvelServices;


