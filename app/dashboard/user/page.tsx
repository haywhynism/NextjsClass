import React from 'react'

const page = () => {

    interface User {
        id: number;
        name: string;
        username: string;

        
    }

    const allUser = async ()=>{
      const data =  await fetch('https://dummyjson.com/users');
      const userDetails = data.json()
    }
  return (
    <>
    
    {
        
    }
    
    
    </>
  )
}

export default page