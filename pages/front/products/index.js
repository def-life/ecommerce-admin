import Header from '@/components/Header'
import ProductsList from '@/components/ProductsList'
import dbConnect from '@/lib/mongoose'
import Product from '@/model/product'
import React from 'react'

function allProducts({products}) {
    console.log(products)
    return (
        <>
        <Header />
        <ProductsList products={products} />
        </>
    )
}

export async function getServerSideProps(req, res) {
    try {

        await dbConnect()
        let products = await Product.find({}, null, {
            sort: {
                createdAt: -1
            },
            limit: 10
        })

        products = JSON.parse(JSON.stringify(products))


        return {
            props: {
                products
            }
        }
    } catch (err) {
        return {
            notFound: true
        }
    }



}


export default allProducts
