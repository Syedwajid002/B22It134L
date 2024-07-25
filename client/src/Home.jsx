import React, { useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'

const Home = () => {
  const navigate=useNavigate();
  const [company,setcomp]=useState("");
  const [category,setCategory]=useState("");
    const GetProducts=async()=>{
        console.log(company +"From ")
       navigate(`/getProducts/${company}/${category}`);
    }
   
  return (
    <>
    <h2>Welcome to our Multibrand agency</h2>
    <input type="text" name='comp' placeholder='company name' onChange={(e)=>{
      setcomp(e.target.value) }} value={company}/>
    <input type="text" name='category' placeholder='category' onChange={(e)=>{
      setCategory(e.target.value) }} value={category} />
     <button onClick={GetProducts}>Get Products</button>
    </>
  )
}

export default Home