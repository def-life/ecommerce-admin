import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { useCart } from './CartContext';

function Product(props) {
    const { _id, title, images, price } = props;
    const {addToCart} = useCart()

    function addProduct() {
        addToCart(_id)
      }
    return (
        <div className=' rounded-md'>
            <Link href={`/front/products/${_id}`}>

                <Image className='object-center rounded-md bg-white' src={images[0]} alt="" width={400} height={400} />
            </Link>
            <div className='py-2 px-2'>
                <Link href={`/front/products/${_id}`}>
                    <h2 className=' text-gray-700 font-bold'>{title}</h2>
                </Link>
                <div className='inline-flex gap-3 flex-col md:flex-row md:justify-between py-2 md:items-center'>
                    <p className='text-sm md:text-lg font-bold'>${price}</p>
                    <button onClick={addProduct} className=' px-2 text-sm py-1 md:px-4 rounded-md uppercase border border-primary font-bold text-primary hover:bg-primary hover:text-white'>Add to cart</button>
                </div>
            </div>
        </div>
    )
}

export default Product