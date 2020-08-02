import React from 'react';
import Login from '../app/view/login'
import Cadastro from '../app/view/cadastrousuario'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

const Routes = () =>(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/cadastro" component={Cadastro}/>
        </Switch>
    </BrowserRouter>  
);

export default Routes;