import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home'
import SuccessScreen from './pages/SuccessScreen'
import CreatePoint from './pages/CreatePoint'


const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={SuccessScreen} path="/sucesso" exact />
            <Route component={CreatePoint} path="/create-point" />
        </BrowserRouter>
    )
}

export default Routes;