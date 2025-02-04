"Use Client"

import React from 'react'
import { useParams } from 'next/navigation'

const Page = () => {
  const params = useParams();
  console.log(params);
  
  return (
    <div>page</div>
  )
}
export default Page;