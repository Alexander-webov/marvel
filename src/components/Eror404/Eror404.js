import React from 'react';
import { Link } from 'react-router-dom';

const Eror404 = () => {
    return (
        <div>
            <h2 style={{ fontSize: '28px', color: '#9F3040' }} > Страница не найдена...</h2>
            <Link style={{ fontSize: '18px', color: 'blue' }} to="/">Вернутся назад</Link>
        </div>
    );
}

export default Eror404;
