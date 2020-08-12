
import api from '../connection/api'

export const isAuthenticated = () =>{
    const usuarioLogado = JSON.parse(localStorage.getItem("_usuarioLogado"));
    
    
    
    if(usuarioLogado){
        return api.get('/missao/authorization', {
            headers: {"Authorization": "Bearer "+usuarioLogado.token}
        }) 
        .then(response=>{
            return true;
        }).catch(error=>{
            console.log(error.response)
            return false;
        })
    }else{
        return false;
    }

};



export const isAdm = () =>{
    
    const usuarioLogado = JSON.parse(localStorage.getItem("_usuarioLogado"));
    if(usuarioLogado){
      return api.get('/adm/authorization/'+usuarioLogado.user._id,{
            headers: {"Authorization": "Bearer "+usuarioLogado.token} 
        })
        .then( res=>{
            
            return res.data.authorization;
            
        })
        .catch(error=>{
            
            console.log(error.response);
        })

        
    }else{
        return false;
    }


};

