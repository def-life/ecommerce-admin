
import React from 'react'
import Product from './Product'

function ProductsList({ products }) {
  return (
    <div className='p-3  max-w-6xl mx-auto'>
      <h2 className='my-10 text-3xl  md:text-4xl font-bold text-gray-700'>New Arrivals </h2>
      <div className=' grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-10'>
        {
          products.map((product) => {
            return <Product key={product._id} {...product} />
          })
        }
      </div>
    </div>
  )
}

export default ProductsList