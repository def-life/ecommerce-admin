import Layout from '@/components/Layout'
import useProducts from '@/hooks/swr/useProducts'
import Link from 'next/link'
import React from 'react'
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import DeleteIcon from '@mui/icons-material/Delete';

function Products() {
    const { data, error, loading } = useProducts();

    if (loading) return <Layout>Loading...</Layout>
    if (error) return <Layout>Failed to load...</Layout>

    const jsx = <div className='bg-white shadow-sm p-2 mt-4'>
        <h2 className='py-2 text-sm font-bold uppercase text-gray-500 border-b border-gray-200'>Product Name</h2>
        <div className=''>
            {data?.products?.map((product) => {
                const { title, _id } = product
                return <div key={_id} className='grid grid-cols-2 items-center py-1 border-b border-gray-200'>
                    <div className='text-sm'>{title}</div>
                    <div className='py-0.5 text-sm flex gap-2'>
                        <Link className='bg-primary  w-fit flex items-center gap-1 px-3 py-1 text-white rounded-sm' href={`/products/edit/${_id}`}><CreateTwoToneIcon className='!text-sm' /><span>Edit</span></Link>
                        <Link className=' bg-red-500 w-fit flex items-center gap-1 px-3 py-1 text-white rounded-sm' href={`/products/delete/${_id}`}><DeleteIcon className='!text-sm' /><span>delete</span></Link>
                    </div>
                </div>
            })}
        </div>
    </div>
    return <Layout>
        <div className='mx-auto max-w-[800px] w-full'>

            <Link className='brand-button bg-none uppercase text-sm md:text-base mb-3 bg-primary px-4 py-3' href="/products/new">New Product</Link>
            <div>
                {jsx}
            </div>
        </div>
    </Layout>
}

export default Products