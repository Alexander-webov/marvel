import './charInfo.scss';
import React, { useState, useEffect } from 'react';
import MarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import Errormesage from '../randomChar/errorMesage/ErrorMesage';
import Skeleton from '../skeleton/Skeleton';
import PropTypes from 'prop-types';


const CharInfo = ({ charId }) => {
    const [char, setchar] = useState(null);
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(false);



    const marvelServices = new MarvelServices();

    const updateChar = () => {
        if (charId) {
            onCharLoading();

            marvelServices
                .getCharacter(charId)
                .then(onCharLoaded)
                .catch(onError)
        }

    }



    const onError = () => {
        setloading(false)
        seterror(true)
    }

    const onCharLoaded = (char) => {
        setchar(char)
        setloading(false)

    }


    const onCharLoading = () => {
        setloading(true)
    }

    useEffect(() => {
        updateChar();
    }, []);

    useEffect(() => {
        updateChar();
    }, [charId]);

    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <Errormesage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;
    return (
        <div className="char__info">
            {skeleton}
            {spinner}
            {content}
            {errorMessage}
        </div>
    )

}


const View = ({ char }) => {

    const { name, description, thumbnail, homepage, wiki, comics } = char;
    let styless = {};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        styless = { objectFit: 'contain' }
    }
    return (
        <>
            <div className="char__basics">
                <img style={styless} src={thumbnail} alt={name} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">Подробнее</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Комиксы:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'Комиксов не найдено!('}
                {
                    comics.map((el, i) => {
                        // eslint-disable-next-line
                        if (i > 9) return;
                        return (
                            <li key={el.name} className="char__comics-item">
                                {/*  <a href={el.resourceURI}></a> */}
                                {el.name}

                            </li>
                        )
                    })}


            </ul>
        </>
    )
}



CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;