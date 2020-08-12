import React from 'react';
import Navbar from '../components/navbar'
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import api from '../../connection/api';
import Avatar from '@material-ui/core/Avatar';
import { mensagemError, mensagemSuccess } from '../components/toastr';

var usuarioLogado;


class Missao extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idUser: '',
            image: '',
            score: 0,
            tituloMissao: '',
            respostaMissao: '',
            idMissao: '',
            estadoMissao: ''
        }
        document.body.style = "background: #000000"
    }

    componentDidMount() {
        usuarioLogado = JSON.parse(localStorage.getItem("_usuarioLogado"));
        api.post('/missao/', {
            idUser: usuarioLogado.user._id
        }, {
            headers: { "Authorization": "Bearer " + usuarioLogado.token }
        })
            .then(res => {
                console.log(res.data)
                this.setState({ tituloMissao: res.data.titulo, idMissao: res.data._id, estadoMissao: res.data.EstadoMissao });
            })
            .catch(error => {
                console.log(error.response)
            })

        api.get('/user/' + usuarioLogado.user._id)
            .then(res => {
                this.setState({ image: res.data.image, score: res.data.score, idUser: res.data._id });
            })
            .catch(error => {
                console.log(error.response)
            });

    }

    enviarResposta = () => {
        api.post('/missao/verify', {
            resposta: this.state.respostaMissao,
            idMissao: this.state.idMissao,
            idUser: usuarioLogado.user._id
        }, {
            headers: { "Authorization": "Bearer " + usuarioLogado.token }
        })
            .then(res => {
                if (res.data.resposta) {
                    mensagemSuccess("Parabéns você concluiu o caso!");
                    window.location.reload();
                } else {
                    mensagemError("Resposta incorreta tente novamente!");
                }
            })
            .catch(error => {
                console.log(error.response);
            })
    }

    abrirPerfil = () => {
        this.props.history.push('/perfil/' + usuarioLogado.user._id)
    }

    sair = () => {
        localStorage.removeItem('_usuarioLogado');
    }

    render() {
        return (
            <>
                <Navbar>
                    <div className="nav-item nav-link">
                        <Avatar style={{ background: "#f50057", cursor: "pointer" }} src={this.state.image} onClick={this.abrirPerfil} />
                    </div>

                    <div className="nav-item nav-link">

                        <h6 style={{ textAlign: 'center', color: "#f50057" }}>Pontos <br />{this.state.score}</h6>

                    </div>

                    <div className="nav-item nav-link" >
                        <a href="/" style={{ color: "#f50057" }} onClick={this.sair}>Sair</a>
                    </div>
                </Navbar>
                {this.state.estadoMissao === 'Concluida' ? <Container maxWidth="sm">
                    <hr style={{ background: '#f50057' }} />
                    <h2 style={{ color: '#f50057' }}>Você já concluiu este caso, aguarde para novos desafios!</h2>
                    <hr style={{ background: '#f50057' }} />
                </Container> :
                    <Container maxWidth="sm">
                        <hr style={{ background: '#f50057' }} />
                        <p className="text-break" style={{ color: '#f50057' }} >
                            {this.state.tituloMissao}
                        </p>
                        <hr style={{ background: '#f50057' }} />
                        <TextField
                            variant="filled"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Resposta"
                            name="email"
                            autoComplete="off"
                            color="secondary"
                            style={{ background: "#F5F5F5" }}
                            autoFocus
                            value={this.state.respostaMissao}
                            onChange={e => this.setState({ respostaMissao: e.target.value })}
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            onClick={this.enviarResposta}
                        >
                            Responder
                        </Button>
                    </Container >}
            </>
        )
    }
}

export default Missao