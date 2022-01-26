import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import AppHeader from "../appHeader/AppHeader";
import Mainpage from '../page/MainPage';
import Comics from '../page/Comics';
import Eror404 from '../Eror404/Eror404';
import Singlecomicspage from '../page/SingleComicsPage';

const App = () => {

    return (


        <div className="app" >
            <Router>
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/" element={<Mainpage />} />
                        <Route path="/comics" element={<Comics />}></Route>
                        <Route path="/comics/:comicId" element={<Singlecomicspage />} />
                        <Route path="*" element={<Eror404 />} />
                    </Routes>
                </main>
            </Router>
        </div>



    )
}



export default App;