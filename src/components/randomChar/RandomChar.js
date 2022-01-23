import './randomChar.scss';
import MarvelServices from '../../services/MarvelServices';
import mjolnir from '../../resources/img/mjolnir.png';
import React, { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import Errormesage from './errorMesage/ErrorMesage';



const RandomChar = () => {
    const [char, setchar] = useState({});
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState(false);

    const marvelServices = new MarvelServices();




    const onError = () => {
        seterror(true)
        setloading(false)
    }

    const onCharLoaded = (char) => {
        seterror(false)
        setchar(char)
        setloading(false)
    }

    const updateChar = () => {
        onCharLoading()
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        marvelServices
            .getCharacter(id)
            .then(onCharLoaded)
            .catch(onError)
    }
    const onCharLoading = () => {
        setloading(true)
    }


    let timeId
    useEffect(() => {
        updateChar();
        /*         timeId = setInterval(updateChar, 60000)
                return () => {
                    clearInterval(timeId)
                } */
    }, [])

    const errorMessage = error ? <Errormesage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View char={char} /> : null;



    return (
        <div className="randomchar">

            {spinner}
            {content}
            {errorMessage}

            <div className="randomchar__static">
                <p className="randomchar__title">
                    Персонажи дня!  <br />
                    Хотите узнать его получше?
                </p>
                <p className="randomchar__title">
                    Или просто выбери другого.
                </p>
                <button className="button button__main" onClick={() => { updateChar() }}>
                    <div className="inner">Выбрать</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    )

}


const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki } = char;
    const textDescr = ' Описание по данному персонажу отсутствует!';
    let descr = description
    if (description !== undefined) {
        descr = descr.slice(0, 180)
        if (descr.length === 180) {
            descr = descr + '...'
        }

    }
    let styless = {};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        styless = { objectFit: 'contain' }
    }
    return (
        <div className="randomchar__block">
            <img style={styless} src={thumbnail} alt="Random character" className="randomchar__img" />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description === '' ? textDescr : descr}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">Подробнее</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;