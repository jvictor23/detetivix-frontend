import React from 'react'

function NavbarItem(props){
    return(
    <a className="nav-item nav-link" href={props.href}>{props.label}</a>
    )
}

export default NavbarItem