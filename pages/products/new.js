import Layout from '@/components/Layout'
import ProductForm from '@/components/ProductForm'

function NewProduct() {
  return (
    <div>
      <Layout>
        <div className='mx-auto max-w-[800px] w-full'>
          <h2 className='text-base md:text-2xl font-bold my-2 md:my-3 mb-4 text-gray-700'>New Product</h2>
          <ProductForm />
        </div>
      </Layout>

    </div>
  )
}

export default NewProduct