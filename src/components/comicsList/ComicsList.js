import React, { useState, useEffect } from 'react';

import './comicsList.scss';
import useMarvelServices from '../../services/MarvelServices';




const ComicsList = () => {
    const { getAllComics, getAllTotalComics } = useMarvelServices();

    const [comics, setComics] = useState([]);
    const [offset, setoffset] = useState(219);
    const [totalComics, setTotslComics] = useState(null);

    useEffect(() => {
        getAllComics().then(data => {
            setComics(data)
        })
    }, []);


    useEffect(() => {
        getAllTotalComics().then(data => {
            setTotslComics(data.total)
        })
    }, []);


    const onRequest = (offset) => {
        getAllComics(offset)
            .then(data => {
                setComics([...comics, ...data])
                setoffset({
                    offset: offset + 8,
                })
            })
    }


    let comicsElement = comics.map(comics => {
        return (
            <li className="comics__item" key={comics.id}>
                <a href="#">
                    <img src={comics.thumbnail} alt="ultimate war" className="comics__item-img" />
                    <div className="comics__item-name">{comics.name}</div>
                    <div className="comics__item-price">{comics.price}</div>
                </a>
            </li>
        )
    })

    return (
        <div className="comics__list">
            <h2 className="comics__list-total">Всего комиксов найдено <span>{totalComics}</span></h2>
            <ul className="comics__grid">
                {comicsElement}
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

export default ComicsList;