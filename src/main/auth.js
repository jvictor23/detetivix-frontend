
import api from '../connection/api'

export const isAuthenticated = () =>{
    const usuarioLogado = JSON.parse(localStorage.getItem("_usuarioLogado"));
    api.get()
};