import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import api from '../serverConnection/api'

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

 

export default function SignUp() {
  const classes = useStyles();
  

  
  const[nickname,setNickname] = useState('');
  const[email,setEmail] = useState('');
  const[senha,setSenha] = useState('');

  document.body.style = "background: #000000"

  function cadastrar(){
    //   api.post('/usuario/cadastro',{
    //       nome: nome,
    //       sobrenome: sobrenome,
    //       email: email,
    //       senha: senha
    //   })
    //   .then(res=>{
    //       console.log(res)
    //   })
    //   .catch(error=>{
    //       console.log(error)
    //   })
  }

  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonIcon/>
        </Avatar>
        <Typography component="h1" variant="h5" style={{color:"white"}}>
          Cadastrar
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fnickname"
                name="nickname"
                variant="filled"
                required
                fullWidth
                id="nickname"
                label="Nickname"
                color="secondary"
                autoFocus
                style={{background: "#F5F5F5"}}
                value={nickname}
                onChange={e=>setNickname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                fullWidth
                id="email"
                label="Email"
                color="secondary"
                name="email"
                autoComplete="off"
                style={{background: "#F5F5F5"}}
                value={email}
                onChange={e=>setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                color="secondary"
                id="password"
                style={{background: "#F5F5F5"}}
                autoComplete="current-password"
                value={senha}
                onChange={e=>setSenha(e.target.value)}
              />
            </Grid>
            
          </Grid>
          <Button
            
            fullWidth
            variant="contained"
            color="secondary"
            
            className={classes.submit}
            onClick={cadastrar}
          >
            Cadastrar
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2" style={{color:"white"}}>
                Já tem uma conta? Faça login
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {/* <Box mt={5}>
        <Copyright />
      </Box> */}
    </Container>
  );
}