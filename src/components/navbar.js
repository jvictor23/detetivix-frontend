import React from 'react'
import NavbarItem from './navbarItem.js'

function Navbar(props) {
    return (
        <div className="container-fluid p-0">
            <nav className="navbar navbar-expand-md navbar-light" style={{backgroundColor:"#EEEDEC"}}>
                <a className="navbar-brand" href="/">

                    { <img  style={{width:"1cm", height:"1cm", marginLeft:"100px"}}/> }
                </a>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarMainToggler"
                    aria-controls="navbarMainToggler"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <section className="collapse navbar-collapse" id="navbarMainToggler">
                    <div className="navbar-nav ml-auto">
                        <NavbarItem href={props.href} label={props.item} />
                        {/*<NavbarItem href="/login" label="Login" />
                        <NavbarItem href="/cadastro-usuario" label="Cadastro" />*/}
                    </div>

                </section>

            </nav>
        </div>
    )
}

export default Navbar