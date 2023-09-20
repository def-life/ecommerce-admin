import styled from '@emotion/styled'
import Link from 'next/link'
import React, { useState } from 'react'
import { useCart } from './CartContext'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';


const navLinks = [
    { title: "Home", href: "/front/display-products", },
    { title: "All Products", href: "/front/products", },
    { title: "Categories", href: "/front/categories", },
    { title: "Cart", href: "/front/cart", flag: true }

]

function Header() {
    const {cart} = useCart()
    const [showMenu, setShowMenu] = useState(false)
    const cardItemCount = new Set(cart).size

    function changeMenu() {
        setShowMenu(prev => !prev)
    }

    return (
        <div className={`bg-[#222] text-white mx-auto`}>
            <div className={`w-full max-w-6xl mx-auto scorll flex justify-between p-4 items-center`}>
                <h2 className='font font-bold text-3xl'>Ecommerce</h2>
               {<div className={`fixed transition-[top] delay-300 ${showMenu ? "top-[60px]" : "top-[100%]"} left-0 right-0 bottom-0 md:block md:static bg-[#222]`}>
                    <nav className='grid md:flex gap-4 md:gap-8 text-[#aaa] text-lg place-items-center'>
                        {navLinks.map((link) => {
                            const { title, href, flag } = link
                            if(flag) {
                                return <Link key={title} href={href}>{title}({cardItemCount})</Link>
                            }
                            return <Link key={title} href={href}>{title}</Link>
                        })}
                    </nav>
                </div>}
                <div onClick={changeMenu} className='md:hidden'>{showMenu ? <CloseIcon className='text-2xl'/> : <MenuIcon className='text-2xl'/>}</div>
            </div>
        </div>
    )
}

export default Header