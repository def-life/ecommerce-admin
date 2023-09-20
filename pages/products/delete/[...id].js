import Layout from '@/components/Layout';
import useMutation from '@/hooks/swr/useMutation';
import { useRouter } from 'next/router'
import React from 'react'
import useCategoryById from '@/hooks/swr/useCategoryById';
import useProductById from '@/hooks/swr/useProductById';

function Product() {
    const router = useRouter();
    const {id} = router.query;
    const {data, loading, error} = useProductById(id);
    const {trigger, isMutating} = useMutation(`/api/products?id=${id}`, "DELETE")

    function goToproductsPage() {
        router.push("/products")
    }

    async function deleteProduct() {
        console.log("clicked delete product")
        try {
            await trigger()
            // mutate(["api/products/" + id], "api/products")
            goToproductsPage()

        } catch(err) {
            console.log(err.message)
        }
    }
    console.log(data, loading, error)
    if(loading) return "Loading the confirmation page"
    if(error) return "no such product "

  return (
    <div>
    <Layout>
       <p className='mb-2'>Do you really want to delete <span>{data?.product?.title}</span> </p>
       <button  className='brand-button w-fit mr-4 bg-none bg-red-600' onClick={deleteProduct}>Yes</button>
       <button disabled={isMutating} onClick={goToproductsPage} className='brand-button w-fit bg-none bg-gray-500'>No</button>
    </Layout>

  </div>
  )
}

export default Product