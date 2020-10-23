import { TweenLite } from 'gsap';
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import { Nav, NavItem, NavLink } from 'reactstrap'
import { goto } from '../navigation';
import { HiOutlineShoppingCart } from 'react-icons/hi'
import { calculateTotal } from '../Cart/Cart';

const Header = () => {
    // cart

    const cartStore = useSelector(store => store.cart)




    return (
        <header>
            <div className="container d-flex align-items-center flex-justify-between py-2">
                <h4>estori.</h4>
                <Nav className="ml-auto">
                    <NavItem>
                        <NavLink href="#" onClick={e => { e.preventDefault(); goto("/") }}><small>Home</small></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink style={{ position: "relative" }} href="#" onClick={e => { e.preventDefault(); goto("/cart") }}>
                            <HiOutlineShoppingCart /> {' '}
                            {cartStore.length > 0 && (
                                <>
                                    <small>
                                        ${calculateTotal(cartStore)}
                                    </small>
                                    <small class="bg-primary text-light" style={{ position: "absolute", top: 0, right: 0, width: 20, height: 20, borderRadius: "50%", textAlign: "center", fontSize: "0.7em", alignItems: "center", display: "flex", justifyContent: "center" }}>{cartStore.length}</small>
                                </>
                            )}
                        </NavLink>
                    </NavItem>
                </Nav>
            </div>
        </header>
    )
}

export default Header