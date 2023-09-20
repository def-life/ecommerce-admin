import useProductById from '@/hooks/swr/useProductById'
import React, { useEffect } from 'react'
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link'
import Image from 'next/image';
import { useCart } from './CartContext';

function CartItem({ product }) {
    const {cart, addToCart, removeFromCart} = useCart()
    const {title, price, images, _id} = product

    const count = cart.filter((_id) => product._id === _id).length

    function increment() {
        addToCart(_id)
    }

    function decrement() {
        removeFromCart(_id)
    }

    return (
        <div className='grid grid-cols-3 items-center py-3 border-b border-gray-200 gap-3'>
            <div className='text-sm'><Image width={200} alt='' height={200} src={images[0]} /><p >{title}</p></div>
            <div className='text-sm flex gap-2 items-center'>
                <button onClick={decrement} className='bg-gray-600  w-fit flex items-center gap-1 px-3 py-1 text-white rounded-sm' >-</button>
                <span>{count
                }</span>
                <button onClick={increment} className=' bg-gray-600 w-fit flex items-center gap-1 px-3 py-1 text-white rounded-sm'>+</button></div>
            <div className='text-sm'>${price * count}</div>
            {/* <div className='py-0.5 text-sm flex gap-2'>
                <Link className='bg-primary  w-fit flex items-center gap-1 px-3 py-1 text-white rounded-sm' href={`/products/edit/${_id}`}><CreateTwoToneIcon className='!text-sm' /><span>Edit</span></Link>
                <Link className=' bg-red-500 w-fit flex items-center gap-1 px-3 py-1 text-white rounded-sm' href={`/products/delete/${_id}`}><DeleteIcon className='!text-sm' /><span>delete</span></Link>
            </div> */}
        </div>
    )
}

export default CartItem