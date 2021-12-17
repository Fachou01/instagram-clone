import React from 'react'
import Navbar from '../shared/Navbar'
import Main from './Main'
import Error from '../Error/Error'
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

  if (display) {
    return (
      <div>
        <Navbar currentHome="true" currentProfile="false" currentChat="false" />
        <Main />
      </div>
    )
  } else {
    return <Error />
  }
}

export default Landing
