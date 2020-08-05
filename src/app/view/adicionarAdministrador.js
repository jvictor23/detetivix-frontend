import React from 'react'
import Navbar from '../components/navbar'
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import api from '../../connection/api';
import TextField from '@material-ui/core/TextField';

class AdicionarAdministrador extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            adms: [],
            users: [],
            nickname: ''
        }
        document.body.style = "background: #000000"
    }

    componentDidMount() {
        api.get('/user/all/adm')
            .then(res => {
                this.setState({ adms: res.data })
                console.log(res.data)
            })
            .catch(error => {
                console.log(error.response);
            })
    }

    procurarUsersParaSerAdministrador = e => {
        this.setState({ nickname: e.target.value })

            api.post('/user/all/users', {
                nickname: e.target.value
            })
                .then(res => {
                    this.setState({users: res.data})
                })
                .catch(error => {
                    console.log(error.response)
                })
        

    }

    transformarEmAdm = user =>{
        api.put('/user/transform/adm',{
            id: user._id
        })
        .then(res=>{
            window.location.reload();
        })
        .catch(error=>{
            console.log(error);
        })
    }

    transformarEmUser = adm =>{
        api.put('/user/transform/user',{
            id: adm._id
        })
        .then(res=>{
            window.location.reload();
        })
        .catch(error=>{
            console.log(error);
        })
    }

    render() {
        return (
            <>
                <Navbar>
                    <TextField
                        variant="filled"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Nickname"
                        name="email"
                        autoComplete="off"
                        color="secondary"
                        style={{ background: "#F5F5F5" }}
                        autoFocus
                        value={this.state.nickname}
                        onChange={this.procurarUsersParaSerAdministrador}
                    />
                </Navbar>
                <Container maxWidth="sm">
                    <hr style={{ background: '#f50057' }} />
                    <table>
                        <tbody>
                            {
                                this.state.nickname.length < 3 ? this.state.adms.map((adm) => (
                                    <tr key={adm._id}>
                                        <td style={{ color: "white" }}>{adm.nickname}</td>
                                        <td style={{ width: "100%" }}>
                                            <button className="btn btn-danger pull-right text-right" style={{ float: 'right' }} onClick={()=>this.transformarEmUser(adm)}>Remover Administrador</button>
                                        </td>
                                    </tr>
                                )) : this.state.users.map((user) => (
                                    <tr key={user._id}>
                                        <td style={{ color: "white" }}>{user.nickname}</td>
                                        <td style={{ width: "100%" }}>
                                            <button className="btn btn-success pull-right text-right" style={{ float: 'right' }} onClick={()=>this.transformarEmAdm(user)}>Adicionar Administrador</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <hr style={{ background: '#f50057' }} />
                </Container>
            </>
        )
    }
}

export default AdicionarAdministrador