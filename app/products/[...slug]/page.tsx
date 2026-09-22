import React from 'react'

const page = async ({params}: {params: Promise<{slug:string}>}) => {
    const {slug}= await params;
    console.log(slug);
    return (
        <>
            <div>
                <h1>CATCH ALL SLUGS</h1>
            </div>
        </>
    )
}

export default page