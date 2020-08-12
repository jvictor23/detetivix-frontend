import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PanToolIcon from '@material-ui/icons/PanTool';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import api from '../../connection/api';
import {mensagemError, mensagemSuccess} from '../components/toastr'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  document.body.style = "background: #000000"

  function logar() {
    if (email.trim()) {
      if (senha.trim()) {

        api.post('/user/authenticate', {
          email: email,
          password: senha
        })
          .then(res => {
            mensagemSuccess("Seja bem vindo!")
            localStorage.setItem('_usuarioLogado', JSON.stringify(res.data))
            props.history.push('/missao');
          })
          .catch(error => {
            if(error){
              mensagemError(error.response.data.error); 
            }
          })

      } else {
        mensagemError("O campo senha não pode ficar vazio!")
      }
    } else {
      mensagemError("O campo email não pode ficar vazio!")
     }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PanToolIcon />
        </Avatar>
        <Typography component="h1" variant="h5" style={{ color: "white" }}>
          Login
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="off"
            color="secondary"
            style={{ background: "#F5F5F5" }}
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            color="secondary"
            style={{ background: "#F5F5F5" }}
            autoComplete="current-password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Lembrar senha"
          /> */}
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={logar}
          >
            Entrar
          </Button>
          <Grid container>
            {/*<Grid item xs>
              <Link href="#" variant="body2">
                Esqueceu a senha?
              </Link>
            </Grid>*/}
            <Grid item>
              <Link href="/cadastro" variant="body2" style={{ color: "white" }}>
                {"Não tem uma conta? Cadastre-se"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {/* <Box mt={8}>
        <Copyright />
      </Box> */}
    </Container>
  );
}