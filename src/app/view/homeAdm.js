import React from 'react';
import '../css/adm.css';
import Navbar from '../components/navbar';
import Avatar from '@material-ui/core/Avatar';
import Modal from '../components/modal';
import FormGroup from '../components/form-group';
import api from '../../connection/api'
import {mensagemError, mensagemSuccess} from '../components/toastr'

const usuarioLogado = JSON.parse(localStorage.getItem("_usuarioLogado"));

class HomeAdm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tituloMissao: '',
            respostaMissao: '',
            valorMissao: ''
        }

        document.body.style = "background: #000000"

    }

    sair = () => {
        localStorage.removeItem("_usuarioLogado");
    }

    adicionarMissao = () => {
        
        if(this.state.tituloMissao.trim()){
            if(this.state.respostaMissao.trim()){
                if(this.state.valorMissao.trim()){
                    api.post('/missao/create',{
                        titulo: this.state.tituloMissao,
                        resposta: this.state.respostaMissao,
                        valor: this.state.valorMissao
                    },{
                        headers: {"Authorization": "Bearer "+usuarioLogado.token}
                    }).then(res=>{
                        if(res.data.error){
                            mensagemError(res.data.error);
                        }else{
                            mensagemSuccess("Missão criada com sucesso!");
                            this.setState({tituloMissao: '', respostaMissao: '', valorMissao: ''})
                        }
                    }).catch(error=>{
                        console.log(error.response)
                    })
                }else{
                    mensagemError("O valor da missão não pode ficar vazio!")
                }
            }else{
                mensagemError("A resposta da missão não pode ficar vazia!")
            }
        }else{
            mensagemError("O titulo da missão não pode ficar vazio!")
        }

    }

    fecharMissao = () =>{
        api.post('/missao/close',{},{
            headers: {"Authorization": "Bearer "+usuarioLogado.token}
        })
        .then(res=>{
            mensagemSuccess("Missão atual fechada com sucesso!");
        })
        .catch(err=>{
            mensagemError(err.response.error);
        })
    }

    render() {
        return (
            <>
                <Navbar>
                    <div className="nav-item nav-link">
                        <Avatar style={{ background: "#f50057", cursor: "pointer" }} src={this.state.image} onClick={this.abrirPerfil} />
                    </div>

                    <div className="nav-item nav-link" >
                        <a href="/" style={{ color: "#f50057" }} onClick={this.sair}>Sair</a>
                    </div>
                </Navbar>
                <div className="container" style={{ marginTop: 25 }}>
                    <div className="row ">
                        <div className="col-sm">
                            <div id="card" className="card" style={{ background: '#f50057', color: "white" }} >

                                <div className="card-body p-5" onClick={()=>document.getElementById('abrirModalAdicionarMissao').click()}>
                                    <h5 className="card-title text-center">Adicionar Missão</h5>
                                    <button hidden id="abrirModalAdicionarMissao" type="button" className="btn btn-primary" data-toggle="modal" data-target="#ModalCentralizadoAdicionarMissao"></button>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm">
                            <div id="card" className="card" style={{ background: '#f50057', color: "white" }}>

                                <div className="card-body p-5" onClick={()=>document.getElementById('abrirModalFecharMissao').click()}>
                                    <h5 className="card-title text-center">Fechar Missao</h5>
                                    <button hidden id="abrirModalFecharMissao" type="button" className="btn btn-primary" data-toggle="modal" data-target="#ModalCentralizadoFecharMissao"></button>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm">
                            <div id="card" className="card" style={{ background: '#f50057', color: "white" }} onClick={() => this.props.history.push("/adicionar-administrador")}>

                                <div className="card-body p-5">
                                    <h5 className="card-title text-center">Adicionar Administrador</h5>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal id="AdicionarMissao">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="TituloModalCentralizado">Adicionar Missão</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <FormGroup label="Titulo" htmlfor="tituloMissao">
                                <textarea type="text" className="form-control" placeholder="Digite o titulo da missão" value={this.state.tituloMissao} onChange={e => this.setState({ tituloMissao: e.target.value })} />
                            </FormGroup>
                            <FormGroup label="Resposta" htmlfor="respostaMissao">
                                <input type="text" className="form-control" placeholder="Digite a resposta da missão" value={this.state.respostaMissao} onChange={e => this.setState({ respostaMissao: e.target.value })} />
                            </FormGroup>
                            <FormGroup label="Valor" htmlfor="valorMissao">
                                <input type="text" className="form-control" placeholder="Digite o valor da missão" value={this.state.valorMissao} onChange={e => this.setState({ valorMissao: e.target.value })} />
                            </FormGroup>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-success" data-dismiss="modal" onClick={this.adicionarMissao}>Salvar</button>
                        </div>
                    </div>
                </Modal>


                <Modal id="FecharMissao">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="TituloModalCentralizado">Deseja realmente fechar a missão atual?</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" data-dismiss="modal" onClick={this.fecharMissao}>Confirmar</button>
                        </div>
                    </div>
                </Modal>

            </>
        )
    }
}

export default HomeAdm