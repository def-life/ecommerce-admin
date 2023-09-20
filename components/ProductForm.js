import { useRouter } from 'next/router';
import useSWR from "swr"
import React, { useEffect, useState } from 'react'
import { useSWRConfig } from 'swr';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Image from 'next/image';
import useUploadImagesMutation from '@/hooks/swr/useUploadImagesMutation';
import useMutation from '@/hooks/swr/useMutation';
import useCategories from '@/hooks/swr/useCategories';


function ProductForm({ title: existingTitle, desc: existingDesc, price: existingPrice, _id, images: existingImages, category: existingCategory, properties: existingProperties }) {
  // const { data: product, error, trigger, reset } = useCreateProductMutation()
  const { data: product, error, trigger, reset } = useMutation("/api/products", "POST")
  const { trigger: updateProduct } = useMutation("/api/products", "PUT")
  const { trigger: upload, isMutating } = useUploadImagesMutation()
  const { data: categoriesData } = useCategories();
  const { mutate } = useSWRConfig()

  const [data, setData] = useState({
    title: existingTitle || "",
    desc: existingDesc || "",
    price: existingPrice || "",
    category: existingCategory || "",
    properties: existingProperties || {}
  })
  const [images, setImages] = useState(existingImages || [])
  const router = useRouter()

  const { title, desc, price, category, properties } = data
  const { data: parentPropertiesData, isLoading } = useSWR(category ? `/api/categories/parent?_id=${category}` : null)

  async function createProduct(ev) {
    ev.preventDefault();
    try {

      if (_id) {
        await updateProduct({ _id, ...data, images })
        await mutate(`/api/products?id=${_id}`, undefined,
          { revalidate: true })
      } else {
        await trigger({ ...data, images });
      }

      setData({
        title: "",
        desc: "",
        price: ""
      })
      router.push("/products")

    } catch (err) {
      alert(err)
    }
  }

  function handleInput(ev) {
    setData((data) => {
      return {
        ...data,
        [ev.target.name]: ev.target.value
      }
    })
  }

  function handlePropertiesInput(property) {
    return (ev) => {
      setData({ ...data, properties: { ...data.properties, [property]: ev.target.value } })
    }
  }


  async function uploadImages(ev) {
    const files = ev.target.files
    const fd = new FormData();
    [...files].forEach((file) => {
      fd.append("product_images", file)
    })

    try {

      const result = await upload(fd);
      if (_id) {
        await mutate("/api/products?id=" + _id)

      }
      setImages((oldImages) => [...oldImages, ...result?.links])
    } catch (err) {
      console.log(err)
    }

  }

  // useEffect(() => {
  //   if (existingTitle) {
  //     setData({
  //       title: existingTitle,
  //       desc: existingDesc,
  //       price: existingPrice,
  //       category: existingCategory,
  //       properties: existingProperties ?? {}
  //     })
  //   }

  //   if (existingImages) {
  //     setImages(existingImages)
  //   }
  // }, [existingDesc, existingPrice, existingTitle, existingImages, existingCategory])

  return (
    <form onSubmit={createProduct} >
      <div className="mb-2 md:mb-3">
        <label htmlFor="title" >Product Name</label>
        <input value={title} onChange={handleInput} id="title" name="title" type='text' />
      </div>
      <div className="mb-2 md:mb-3">
        <label htmlFor="category" className='' >Category name</label>
        <div>
          <select onChange={handleInput} value={category} name='category'>
            <option value="">UnCategorised</option>
            {categoriesData && categoriesData.categories?.map((category) => {
            
              const { name, _id } = category
              return <option key={_id} value={_id}>{name}</option>
            })}
          </select>
        </div>
      </div>
      <div>
        {parentPropertiesData?.map((obj) => {
          console.log(obj)
        })}
        {parentPropertiesData && parentPropertiesData?.map(({ property, value, _id }) => {

          return (
            <div key={_id} className="mb-2 md:mb-3">
              <label htmlFor={property} >{property}</label>
              <select onChange={handlePropertiesInput(property)} value={properties[property]} id={property} name={property} type='text'>
                {value.map((v) => {
                  return <option key={v} value={v}>{v}</option>
                  // dont forget to change key here
                })}
              </select>
            </div>)
        })}
      </div>
      <div>
        <label>Photos</label>
        <div style={{ gridTemplateColumns: "repeat(auto-fit, 128px)" }} className='grid gap-2'>
          {images?.length > 0 && images.map((link) => {
            console.log(link)
            return <div key={link} className='w-32 h-32 mb-2 bg-gray-100'><Image className='aspect-square rounded-md object-center' src={link} alt="" width={1000} height={1000} /></div>
          })}
          <label htmlFor='images' className='w-32 h-32 border border-purple-300 text-gray-700 bg-gray-200/75 rounded-md grid place-items-center cursor-pointer'>
            <p><FileUploadOutlinedIcon /><span>{isMutating ? "uploading..." : "upload"}</span></p>
            <input type="file" multiple accept="image/*" id="images" name='product_images' className='hidden' onChange={uploadImages} />

          </label>
        </div>
        <p className='text-sm md:text-base text-gray-600 mb-2'>{images?.length === 0 && "No photos in this product"}</p>
      </div>
      <div className="mb-2 md:mb-3">
        <label htmlFor="desc" >Description</label>
        <textarea value={desc} onChange={handleInput} id="desc" name="desc" rows="6"></textarea>
      </div>
      <div className="mb-2 md:mb-3">
        <label htmlFor="price" >Price (in USD)</label>
        <input value={price} onChange={handleInput} id="price" name="price" type='text' />
      </div>
      <div className="mb-2 md:mb-3">
        <button className='bg-primary text-white rounded-md py-1 md:py-2 uppercase w-fit px-8 mt-4 md:mt-6'>Save</button>
      </div>
    </form>
  )
}

export default ProductForm


// password Xn963@8Wz2b1