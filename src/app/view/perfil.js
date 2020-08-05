import React from 'react';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import api from '../../connection/api';


class Perfil extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
      score: '',
      image: '',
      uploadImage: null
    }
    {document.body.style = "background: #000000"}
  }
  componentDidMount() {
    api.get('/user/' + this.props.match.params.id)
      .then(res => {
        this.setState({ nickname: res.data.nickname, score: res.data.score, image: res.data.image })
      })
      .catch(error => {
        console.log(error.response)
      });
  }

  adicionarImagem = () => {

    if (this.state.image === '') {
      document.getElementById('fileid').click();
      document.getElementById('fileid').addEventListener('change', () => {
        document.getElementById('abrirmodal').click();
        const formData = new FormData();
        formData.append(
          'file',
          document.getElementById('fileid').files[0]
        );

        //Upload Image
        api.post('/user/uploadimage', formData)
          .then(resUpload => {
            //Atualiando caminho imagem usuario
            //  console.log(resUpload)

            api.put('/user/updateimage', {
              id: this.props.match.params.id,
              urlImage: resUpload.data.location,
              key: resUpload.data.key
            }).then(resUpdate => {
              // this.setState({image: resUpdate.data.user.image, uploadImage: null});
              window.location.reload();
              console.log(resUpdate)
            }).catch(error => {
              console.log(error.response);
            })

          }).catch(error => {
            console.log(error.response)
          })
      });

    } else {
      document.getElementById('fileid').click();
      document.getElementById('fileid').addEventListener('change', () => {
        document.getElementById('abrirmodal').click();
        //Deletar a imagem antiga do banco de dados
        api.delete('/user/deleteimage/' + this.props.match.params.id)
          .then(resDelete => {
          }).catch(error => {
            console.log(error.response)
          })

        const formData = new FormData();
        formData.append(
          'file',
          document.getElementById('fileid').files[0]
        );



        //Upload Image
        api.post('/user/uploadimage', formData)
          .then(resUpload => {
            //Atualiando caminho imagem usuario
            //  console.log(resUpload)

            api.put('/user/updateimage', {
              id: this.props.match.params.id,
              urlImage: resUpload.data.location,
              key: resUpload.data.key
            }).then(resUpdate => {
              // this.setState({image: resUpdate.data.user.image, uploadImage: null});
              window.location.reload();
              console.log(resUpdate)
            }).catch(error => {
              console.log(error.response);
            })

          }).catch(error => {
            console.log(error.response)
          })
      });
    }

  }

  removerImagem = () => {
    document.getElementById('abrirmodal').click();
    api.delete('/user/deleteimage/' + this.props.match.params.id)
      .then(resDelete => {
        window.location.reload();
      }).catch(error => {
        console.log(error.response)
      })
  }

  render() {
    return (
      <Container maxWidth="sm" style={{ marginTop: 20 }}>
        <div style={{ display: 'inline-block' }}>

          <Avatar src={this.state.image} style={{ width: 150, height: 150, background: "#f50057", float: 'left', marginRight: 18 }} />

          <div style={{ marginTop: 40 }}>
            <input id='fileid' type='file' name='filename' hidden />
            <Button id="uploadImage" variant="outlined" color="secondary" /* className={classes.submit}*/ onClick={this.adicionarImagem}> {this.state.image.trim() ? "Atualizar Imagem" : "Adicionar Imagem"} </Button>
            <button id="abrirmodal" type="button" class="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop" hidden>Launch static backdrop modal</button>
            <div className="modal fade" id="staticBackdrop" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                  </div>
                  <div className="modal-body">
                    <div class="text-center">
                      <div class="spinner-border" style={{ width: "3rem", height: "3rem" }} role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    
                  </div>
                </div>
              </div>
            </div>
            <Button variant="outlined" color="secondary" /* className={classes.submit}*/ onClick={this.removerImagem} disabled={this.state.image === ''? true : false} style={{ marginLeft: 2 }}>Remover Imagem</Button>

          </div>
        </div>

        <hr style={{ background: '#f50057' }} />

        <div className="row" style={{ textAlign: 'center', color: '#f50057' }}>
          <div className="col">
            Nickname:
    </div>
          <div className="col">
            {this.state.nickname}
          </div>
        </div>

        <div div className="row" style={{ textAlign: 'center', color: '#f50057' }}>
          <div className="col">
            Pontuação:
    </div>
          <div className="col">
            {this.state.score}
          </div>
        </div>

      </Container>
    )
  }
}

export default Perfil