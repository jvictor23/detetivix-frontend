import React from 'react'
import '../css/adm.css'

class HomeAdm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }

        document.body.style = "background: #000000"

    }

    render() {
        return (
            <div className="container" style={{ marginTop: 25 }}>
                <div className="row ">
                    <div className="col-sm">
                        <div id="card" className="card" style={{background: '#f50057', color:"white"}} >

                            <div className="card-body p-5">
                                <h5 className="card-title text-center">Adicionar Missão</h5>

                            </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div id="card" className="card" style={{background: '#f50057', color:"white"}}>

                            <div className="card-body p-5">
                                <h5 className="card-title text-center">Remover Missao</h5>

                            </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div id="card" className="card" style={{background: '#f50057', color:"white"}} onClick={()=>this.props.history.push("/adicionar-administrador")}>

                            <div className="card-body p-5">
                                <h5 className="card-title text-center">Adicionar Administrador</h5>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeAdm