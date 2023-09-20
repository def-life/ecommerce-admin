import Layout from '@/components/Layout';
import ProductForm from '@/components/ProductForm';
import useProductById from '@/hooks/swr/useProductById';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

function Product() {
    const router = useRouter();
    const {id} = router.query;
    const {data, loading, error, isValidating} = useProductById(id);
    const [productInfo, setProductInfo] = useState(null);

    useEffect(() => {
        if(data) {
          console.log("updated product Info")
            setProductInfo(data.product)
        }
    }, [data, loading])
  return (
    <div>
    <Layout>
      <div className='mx-auto max-w-[800px] w-full'>
        <h2 className='text-lg md:text-xl lg:text-2xl font-bold my-3 mb-4 text-gray-800'>Edit Product</h2>
       {productInfo &&  <ProductForm {...productInfo}/>}
      </div>
    </Layout>

  </div>
  )
}

export default Product