import { useCart } from '@/components/CartContext';
import Header from '@/components/Header'
import ProductImages from '@/components/ProductImages';
import dbConnect from '@/lib/mongoose';
import Product from '@/model/product';
import React from 'react'


function SingleProduct({ product }) {
    const { title, images, desc, _id, price } = product;
    const { addToCart } = useCart()


    function addProduct() {
        addToCart(_id)
    }
    return (
        <>
            <Header />
            <div className='max-w-6xl mx-auto grid md:grid-cols-[0.8fr_1.2fr] px-3 my-10'>
                <div>
                    <ProductImages images={images} />
                </div>
                <div>
                    <h2 className='mb-6 text-4xl font-bold text-gray-700'>{title}</h2>
                    <p>{desc}</p>
                    <div className='flex gap-6 py-5 items-center'>
                        <p className='text-2xl font-bold'>${price}</p>
                        <button onClick={addProduct} className='px-2 md:py-2 text-sm py-1 md:px-6 rounded-md uppercase border border-primary font-bold text-primary hover:bg-primary hover:text-white'>Add to cart</button>
                    </div>
                </div>



            </div>
        </>
    )
}

export default SingleProduct


export async function getServerSideProps({ query }) {
    const { id } = query
    await dbConnect()

    let product = await Product.findById(id);
    product = JSON.parse(JSON.stringify(product))

    if (!product) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            product
        }
    }

}