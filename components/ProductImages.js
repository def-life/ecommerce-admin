import Image from 'next/image'
import React, { useState } from 'react'

function ProductImages({images}) {
    const [selectedImage, setSelectedImage] = useState(images[0])

    function changeSelectedImage(src) {
       return  () => {
            setSelectedImage(src)
        }
    }

  return (
    <div>
        <Image className='mx-auto aspect-square' src={selectedImage} width={300} height={300} alt='' />
        <div className='flex flex-wrap gap-3 my-3 justify-center'>
            {images.map((src) => {
                return  <Image onClick={changeSelectedImage(src)} className={`object-center aspect-square rounded-md cursor-pointer ${src === selectedImage ? "outline outline-2 outline-offset-1 outline-gray-400" : ""}`} key={src} width={80} height={80} src={src} alt="" />
            })}
        </div>
    </div>
  )
}

export default ProductImages