import './appHeader.scss';
import { NavLink } from 'react-router-dom';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <NavLink end to="/">
                    <span >Marvel</span> <br /> Информационный ресурс

                </NavLink>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink
                        style={({ isActive }) => ({ color: isActive ? '#A50013' : '#000' })}
                        end
                        to="/"
                    >Герои</NavLink></li>
                    /
                    <li><NavLink
                        style={({ isActive }) => ({ color: isActive ? '#A50013' : '#000' })}
                        end
                        to="/comics">Комиксы</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;