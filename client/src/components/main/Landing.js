import React from 'react'
//import {useState,useEffect } from 'react';
import Navbar from '../shared/Navbar'
import Main from './Main'
import Error from '../Error/Error'
//import ClipLoader from "react-spinners/ClipLoader";
import { useEffect, useState } from 'react'

function Landing() {
  const [display, setDisplay] = useState(false)
  useEffect(() => {
    const token = JSON.parse(window.localStorage.getItem('token'))
    if (token) {
      setDisplay(true)
    } else {
      setDisplay(false)
    }
  }, [])

  /*const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500);
  },[])*/
  /*{if(loading){
    return(
      <div className="lg:mx-48">
        <div className="flex justify-center items-center w-full h-screen">
      <ClipLoader  color="#EA3449" loading={loading} size={100}  />
        </div>
      </div>
    )
  }
}*/
  if (display) {
    return (
      <div>
        <Navbar />
        <Main />
      </div>
    )
  } else {
    return <Error />
  }
}

export default Landing
