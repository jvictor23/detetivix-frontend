import React from 'react'





function Navbar(props) {
    
    return (
        <div className="container-fluid p-0">
            <nav className="navbar navbar-expand-md navbar-dark" style={{ backgroundColor: "#000000" }}>

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
                    <div className="navbar ml-auto">

                       {props.children}

                    </div>

                </section>

            </nav>
        </div>
    )
}

export default Navbar