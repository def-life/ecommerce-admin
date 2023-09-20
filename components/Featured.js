import Image from 'next/image'
import React from 'react'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ButtonLink from './ButtonLink';
import { useCart } from './CartContext';

function Featured({ product }) {
  const { _id, title, desc } = product
  const { addToCart } = useCart()

  function addProduct() {
    addToCart(_id)
  }
  return (
    <div className='p-1 bg-[#222]'>
      <div className='grid md:grid-cols-[0.9fr_1.1fr] gap-5 mt-8 p-3 items-center max-w-6xl mx-auto'>
        <div className='w-full md:hidden'>
                <Image className='md:hidden mx-auto rounded-md object-center max-w-md w-full' src={"https://abhi-nextjs-ecommerce.s3.ap-south-1.amazonaws.com/eb9a36b809d3907461044f9700d37b41bb62a349b01fe32e910abfc78d120fcf"} alt="" width={400} height={400}  />
            </div>
        <div>
          <h2 className='text-white text-3xl md:text-7xl font-bold mb-7'>{title}</h2>
          <p className='text-[#aaa] text-justify'>{desc}</p>
          <div className='flex gap-4 my-4 mt-8' >
            <ButtonLink href={`/front/products/${_id}`} className="bg-white py-1 md:py-2 text-gray-600">Read more</ButtonLink>
            <button onClick={addProduct} className="px-3 py-1 md:py-2 md:px-4 rounded-md uppercase bg-primary text-white"><AddShoppingCartIcon className='mr-1' /><span>Add to cart</span></button>
          </div>
        </div>
        <div className='w-full hidden md:block'>
          <Image className=' mx-auto rounded-md object-center max-w-md w-full' src={"https://abhi-nextjs-ecommerce.s3.ap-south-1.amazonaws.com/eb9a36b809d3907461044f9700d37b41bb62a349b01fe32e910abfc78d120fcf"} alt="" width={400} height={400} />
        </div>
      </div>

    </div>
  )
}

export default Featured