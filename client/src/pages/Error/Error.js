import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div className="flex gap-10 flex-col justify-center items-center mt-20 w-full">
      <h1 className="font-bold text-4xl">Oops... Wrong page</h1>
      <Link to="/">
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ">
          Return to Home page
        </button>
      </Link>
    </div>
  )
}

export default Error
