import React from 'react';
import Navbar from '../components/navbar'
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import api from '../../connection/api';
import Avatar from '@material-ui/core/Avatar';

class Missao extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idUser:'',
            image: '',
            score: 0,
            tituloMissao: '',
            respostaMissao: ''
        }
        document.body.style = "background: #000000"
    }

    componentDidMount() {
        const usuarioLogado = JSON.parse(localStorage.getItem("_usuarioLogado"));
        api.get('/user/' + usuarioLogado.user._id)
      .then(res => {
        this.setState({ image: res.data.image, score: res.data.score, idUser: res.data._id });
      })
      .catch(error => {
        console.log(error.response)
      });
       
    }

     abrirPerfil = () => {
        this.props.history.push('/perfil/' + this.props.idUser)
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

                        <div style={{ color: "#f50057" }} className="nav-item nav-link" >
                            Sair
                        </div>
                </Navbar>
                <Container maxWidth="sm">
                    <hr style={{ background: '#f50057' }} />
                    <p className="text-break" style={{ color: '#f50057' }} >
                        asdjfkasldjflasjfkldasjfasopdfjowepkoadkfçkadflkasçfkdlakfçlasdflsçadfçaskdflçasdkfopekafdalçsfkoeklçkfdçlakflçajkealçdfkadlçfalçdfkoelçafkçkllçkçlkfkasfpadk~kejoãdjfadsçjfkajfdklasfjadsfhajklsdfhfdasuiehaiuhfdjkafhdklaf
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
                    // value={email}
                    // onChange={e => setEmail(e.target.value)}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        // onClick={logar}
                    >
                        Responder
          </Button>
                </Container >
            </>
        )
    }
}

export default Missao