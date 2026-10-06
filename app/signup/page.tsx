"use client"
import React, { useState } from 'react'

const page = () => {
  const [name, setname] = useState<string>("")
  const [age, setage] = useState<number>(0)
  const [amount, setamount] = useState<number>(0)
  const [email, setemail] = useState<string>("")
  const [password, setpassword] = useState<string>("")

  async function submitForm() {
    console.log({name, age, amount, email, password})
  }
  return (
    <>
      <h1>SIGN UP</h1>

      <div className='text-5xl text-red-400 w' >
        <form action="">
          <div>
            <label htmlFor="name">Name</label>
            <input onChange={(e)=>setname(e.target.value)} type="text" id="name" />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input onChange={(e)=>setemail(e.target.value)} type="text" id="email" />
          </div>
          <div>
            <label htmlFor="age">Age:</label>
            <input onChange={(e)=>setage(e.target.valueAsNumber)} type="number" id="age" />
          </div>
          <div>
            <label htmlFor="name">Amount</label>
            <input onChange={(e)=>setamount(e.target.valueAsNumber)} type="number" id="name" />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input onChange={(e)=>setpassword(e.target.value)} type="text" id="password" />
          </div>

        <div>
          <button onClick={()=>submitForm()}>Submit</button>
        </div>

        </form>
      </div>
    </>
  )
}

export default page