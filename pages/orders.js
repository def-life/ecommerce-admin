import React from 'react'
import Layout from "@/components/Layout"
import useSWR from 'swr'

function orders() {
    const { data: orders, loading, error } = useSWR("/api/orders");
    if (!orders) {
        return <Layout>Loading...</Layout>
    }
    if (error) {
        console.log(error)
        return <Layout>Something went wrong</Layout>
    }


    console.log(orders)

    return <Layout>
        <div className='mx-auto w-full'>
            <h2 className='text-base md:text-2xl font-bold my-2 md:my-3 mb-4 text-gray-700'>Orders</h2>
            <div className='bg-white shadow-sm p-2 mt-4 overflow-auto'>
                <div className='grid grid-cols-4 items-center min-w-[600px] border-b border-gray-200'>
                    <h2 className='py-2 text-sm font-bold uppercase text-gray-500'>Date</h2>
                    <h2 className='py-2 text-sm font-bold uppercase text-gray-500'>Recipient</h2>
                    <h2 className='py-2 text-sm font-bold uppercase text-gray-500'>Products</h2>
                    <h2 className='py-2 text-sm font-bold uppercase text-gray-500'>Status</h2>
                </div>
                {
                    orders.map((order) => {
                        const { _id, shippingAddress: { name, email, city, country, pincode, streetAddress }, items, createdAt, status } = order;
                        return <div key={_id} className='grid grid-cols-4 min-w-[600px] gap-2 min-w-xl items-center py-1 border-b border-gray-200 min-w-xl'>
                            <div className='text-sm'>{new Date(createdAt).toLocaleString()}</div>
                            <div className='text-sm'>
                                <span >{name}, </span>
                                <span >{email}</span><br />
                                <span >{streetAddress}</span>
                                <span >({pincode})</span>
                                <span >{city}</span><br />
                                <span >{country}</span>


                            </div>
                            <div className='text-sm'>{
                                items.map((item) => {
                                    const { _id, title, price, qty } = item
                                    return <div key={_id}>{title} x{qty}</div>
                                })
                            }</div>
                            <div>
                            <span className={`text-sm px-3 py-2 text-white inline-block ${status === "paid" ? "bg-red-500" : status === "created" ? "bg-gray-500" : "bg-green-500"}`}>
                                {status}
                            </span>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    </Layout>
}

export default orders