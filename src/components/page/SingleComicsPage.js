import React, { useState, useEffect } from 'react';

import { useParams, Link } from 'react-router-dom';

import useMarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import Errormesage from '../randomChar/errorMesage/ErrorMesage';
import Skeleton from '../skeleton/Skeleton';

import './singleComic.scss';
import xMen from '../../resources/img/x-men.png';

const Singlecomicspage = () => {
    const { comicId } = useParams();
    const [comic, setcomic] = useState(null);

    const { loading, error, getComics, clearError } = useMarvelServices();

    useEffect(() => {
        updateComic()
    }, [comicId])

    const updateComic = () => {
        clearError();
        getComics(comicId).then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setcomic(comic)
    }
    //console.log(comic);

    const errorMessage = error ? <Errormesage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

    return (
        <>

            {errorMessage}
            {spinner}
            {content}
        </>
    );
}

const View = ({ comic }) => {
    const { thumbnail, price, name, id, homepage, description } = comic;
    console.log(homepage);

    return (
        <div className="single-comic">
            <img src={thumbnail} alt="x-men" className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">Название: {name}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">Language: en-us</p>
                <div className="single-comic__price">Стоимость: {price}$ </div>
            </div>
            <Link to="/comics" className="single-comic__back">Смотреть все</Link>
        </div>
    )

}

export default Singlecomicspage;

