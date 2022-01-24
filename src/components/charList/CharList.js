import './charList.scss';
import React, { useState, useEffect } from 'react';
import useMarvelServices from '../../services/MarvelServices';

const CharList = ({ onCharSelected }) => {
    const { getAllCharacters } = useMarvelServices();

    const [chars, setchars] = useState([]);
    const [offset, setoffset] = useState(219);

    useEffect(() => {
        loadingCars();
    }, [])


    const loadingCars = () => {
        getAllCharacters()
            .then(data => {
                setchars(data)
            })
    }



    const onRequest = (offset) => {
        getAllCharacters(offset)
            .then(data => {
                setchars([...chars, ...data])
                setoffset({
                    offset: offset + 9,
                })
            })
    }


    let itemsListCharRender = []
    let styless = {};

    if (!Object.keys(chars).length == 0) {
        itemsListCharRender = chars.map(el => {
            if (el.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                styless = { objectFit: 'contain' }
            }
            return (
                <li onClick={() => { onCharSelected(el.id) }} key={el.id} className="char__item">
                    <img style={styless} src={el.thumbnail} alt={el.name} />
                    <div className="char__name">{el.name}</div>
                </li>
            )
        })
    }



    return (
        <div className="char__list">
            <ul className="char__grid">
                {itemsListCharRender}

            </ul>
            <button
                onClick={() => { onRequest(offset) }}
                className="button button__main button__long"
            >
                <div className="inner">Смотреть еще</div>
            </button>
        </div>
    )

}




export default CharList;