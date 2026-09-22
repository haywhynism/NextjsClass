"use client"
import React, {use} from 'react'

const Page = ({params}: {params: Promise<{slug: string}>}) => {
    const {slug} = use(params);
  return (
    <div>
        <h1>THis is {slug} page

        </h1>
    </div>
  )
}

export default Page
