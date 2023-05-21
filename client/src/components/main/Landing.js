import React from 'react'
import Navbar from '../shared/Navbar'
import Main from './Main'
import { useEffect } from 'react'

function Landing() {

  useEffect(() => {
    const token = JSON.parse(window.localStorage.getItem('token'))
  }, [])

    return (
      <div>
        <Navbar currentHome="true" currentProfile="false" currentChat="false" />
        <Main />
      </div>
    )
  
}

export default Landing
