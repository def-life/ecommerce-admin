import Layout from '@/components/Layout';
import useMutation from '@/hooks/swr/useMutation';
import { useRouter } from 'next/router'
import React from 'react'
import useCategoryById from '@/hooks/swr/useCategoryById';

function Product() {
    const router = useRouter();
    const {id} = router.query;
    const {data, loading, error} = useCategoryById(id);
    const {trigger, isMutating} = useMutation(`/api/categories?_id=${id}`, "DELETE")

    function goToCategoriesPage() {
        router.push("/categories")
    }

    async function deleteCategories() {
        try {
            console.log(id, "this is id client side")
            await trigger()
            // mutate(["api/products/" + id], "api/products")
            goToCategoriesPage()

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
       <p className='mb-2'>Do you really want to delete <span>{data?.categories?.name}</span> </p>
       <button  className='brand-button w-fit mr-4 bg-none bg-red-600' onClick={deleteCategories}>Yes</button>
       <button disabled={isMutating} onClick={goToCategoriesPage} className='brand-button w-fit bg-none bg-gray-500'>No</button>
    </Layout>

  </div>
  )
}

export default Product