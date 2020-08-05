import React from 'react';
import Login from '../app/view/login'
import Cadastro from '../app/view/cadastrousuario'
import Perfil from '../app/view/perfil'
import Missao from '../app/view/missao'
import HomeAdm from '../app/view/homeAdm'
import AdicionarAdministrador from '../app/view/adicionarAdministrador'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

const Routes = () =>(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/perfil/:id" component={Perfil}/>
            <Route exact path="/cadastro" component={Cadastro}/>
            <Route exact path="/missao" component={Missao}/>
            <Route exact path="/home-adm" component={HomeAdm}/>
            <Route exact path="/adicionar-administrador" component={AdicionarAdministrador}/>
        </Switch>
    </BrowserRouter>  
);

export default Routes;