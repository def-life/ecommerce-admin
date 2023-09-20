import Link from 'next/link'
import React from 'react'
import { twMerge } from 'tailwind-merge'

function ButtonLink({children,className, ...props}) {
  return (
    <Link className={twMerge(`px-3 py-2 md:px-4 rounded-md uppercase bg-primary text-white`, className)} {...props}>{children}</Link>
  )
}

export default ButtonLink