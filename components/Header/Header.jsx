import React from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import { goto } from '../navigation';

const Header = () => {
    return (
        <header>
            <div className="container d-flex align-items-center flex-justify-between">
                <h4>estori.</h4>
                <Nav className="ml-auto">
                    <NavItem>
                        <NavLink href="#" onClick={e=>{e.preventDefault(); goto("/")}}><small>Home</small></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#" onClick={e=>{e.preventDefault(); goto("/cart")}}><small>Cart</small></NavLink>
                    </NavItem>
                </Nav>
            </div>
        </header>
    )
}

export default Header