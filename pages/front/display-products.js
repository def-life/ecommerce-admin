import Featured from '@/components/Featured'
import Header from '@/components/Header'
import ProductsList from '@/components/ProductsList';
import dbConnect from '@/lib/mongoose';
import Product from '@/model/product';
import { ObjectId } from 'mongodb';
import React from 'react'

function DisplayProducts({featuredProduct, products}) {
  console.log("product is", featuredProduct, products)
  return (
    <div className='bg-[#eee]'>
      <Header />
      <Featured product={featuredProduct}/>
      <ProductsList products={products}/>
    </div>
  )
}

export default DisplayProducts;


export async function getServerSideProps() {
  const _id = "64eeef1db0f31863e5621efd"
  await dbConnect();
  let featuredProduct = await Product.findById(new ObjectId(_id)).lean();
  let newProducts = await Product.find({}, null, {sort: {
    _id: -1
  }, limit: 10})

  if(!featuredProduct) {
    return {
      notFound: true,
    }
  }
  featuredProduct = JSON.parse(JSON.stringify(featuredProduct));
  newProducts = JSON.parse(JSON.stringify(newProducts));

  return { props: { featuredProduct, products: newProducts } }

}