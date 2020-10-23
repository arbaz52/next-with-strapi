import { TweenLite } from 'gsap';
import React, { useEffect, useRef } from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import { goto } from '../navigation';

const Header = () => {
    const titleRef = useRef(null)
    useEffect(() => {
        console.log(titleRef.current)
        if(titleRef.current){
            TweenLite.from(titleRef.current, 1, {opacity: 0, y: -30})
        }
    }, [titleRef.current])


    return (
        <header>
            <div className="container d-flex align-items-center flex-justify-between">
                <h4 ref={titleRef}>estori.</h4>
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