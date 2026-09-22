"use client";
import React, { useEffect, useState } from 'react'

const notFound = () => {
    // const router = useRouter();
  const [timeDecrease, settimeDecrease] = useState(15);


  useEffect(()=>{
    countDown();
  }, []);

  let time = 15;
  function countDown() {
    let timeInterval = setInterval(()=>{
        // time--;
        if (time<=0) {
            clearInterval(timeInterval)
        }
       settimeDecrease(time)
    }, 1000);


  }
  
  return (
    <>
    
    <div>
        <h1 className='text-7xl text-orange-400 text-center mt-[90px]'>seems you are lost. Find a way back to the home page let's {timeDecrease}.</h1>
    </div>
    
    </>
  )
}

export default notFound