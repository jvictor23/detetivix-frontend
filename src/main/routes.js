import React, { useEffect, useState } from 'react';
import Login from '../app/view/login'
import Cadastro from '../app/view/cadastrousuario'
import Perfil from '../app/view/perfil'
import Missao from '../app/view/missao'
import HomeAdm from '../app/view/homeAdm'
import AdicionarAdministrador from '../app/view/adicionarAdministrador'
import {isAuthenticated, isAdm} from '../main/auth';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import api from '../connection/api'

const usuarioLogado = JSON.parse(localStorage.getItem("_usuarioLogado"));

const PrivateMissaoRoute = ({component: Component, ... rest}) => (
    <Route {... rest} render={props => (
        isAuthenticated()? (
            <Component {... props}/>
        ) : (
            <Redirect to={{pathname: '/', state: {from: props.location}}} />
        )
    )}/>
)

const PrivateLoginRoute = ({component: Component, ... rest}) => (
    <Route {... rest} render={props => (
        isAuthenticated()? (
            <Redirect to={{pathname: '/missao', state: {from: props.location}}} />
        ) : (
            <Component {... props}/>
        )
    )}/>
)

const PrivateAdmRoute = ({component: Component, ... rest}) => {
    
    const [adm, setAdm] = useState(false);
    const [isTokenValidated, setIsTokenValidated] = useState(false);
    useEffect(()=>{
        
        let token = usuarioLogado.token;
        if(token){
            api.get('/adm/authorization/'+usuarioLogado.user._id, {
                headers: {"Authorization": "Bearer "+usuarioLogado.token}
            }) 
            .then((res)=>{
                setAdm(res.data.authorization)
            })
            .catch((err=>{
                console.log(err.response.data);
            }))
            .then(()=>setIsTokenValidated(true));
        }else{
            
            setIsTokenValidated(true)
        }
    
    },[])
    if (!isTokenValidated) return <h1>Carregando</h1>
    return (<Route {...rest}
        render={(props) => {
          return adm ? <Component {...props} /> : <Redirect to={{pathname: '/missao', state: {from: props.location}}} />
        }} />)
}




const Routes = () =>(
    <BrowserRouter>
        <Switch>
            <PrivateLoginRoute exact path="/" component={Login}/>
            <Route exact path="/perfil/:id" component={Perfil}/>
            <Route exact path="/cadastro" component={Cadastro}/>
            <PrivateMissaoRoute exact path="/missao" component={Missao}/>
            <PrivateAdmRoute exact path="/home-adm" component={HomeAdm}/>
            <PrivateAdmRoute exact path="/adicionar-administrador" component={AdicionarAdministrador}/>
        </Switch>
    </BrowserRouter>  
);

export default Routes;