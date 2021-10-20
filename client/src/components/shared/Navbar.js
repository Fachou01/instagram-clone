import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHome,
  faPaperPlane,
  faCompass,
  faHeart,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const picture = JSON.parse(localStorage.getItem('picture'))

  const signOut = () => {
    localStorage.clear()
  }
  return (
    <div className="flex sticky top-0 w-full bg-white justify-between items-center border-b-2 border-black-100 h-20  p-5  ">
      <Link to="/main">
        <div className="flex items-center gap-1 cursor-pointer ">
          <img
            className="w-10"
            src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c521.png"
            alt="logo"
          />
          <img
            src="https://logos-marques.com/wp-content/uploads/2020/09/Instagram-Logo.png"
            className="mt-1 hidden lg:flex"
            alt="logo-instagram"
            width="100"
          />
        </div>
      </Link>
      <div>
        <input
          type="search"
          className="shadow hidden sm:flex w-full  appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-md"
          placeholder="Search"
        />
      </div>
      <div className="flex justify-between items-center gap-2">
        <Link to="/main">
          <div className="flex items-center justify-center rounded-full bg-gray-200  w-10 h-10">
            <FontAwesomeIcon
              icon={faHome}
              className="text-xl  text-red-600 cursor-pointer "
            />
          </div>
        </Link>
        <div className="flex opacity-50  items-center justify-center rounded-full bg-gray-200 w-10 h-10 hover:text-red-600 cursor-pointer">
          <FontAwesomeIcon icon={faPaperPlane} className="text-xl  " />
        </div>

        {/*<div className="flex items-center justify-center rounded-full bg-gray-200 w-10 h-10 hover:text-red-600 cursor-pointer">
          <FontAwesomeIcon
            icon={faCompass}
            className="text-xl cursor-pointer "
          />
        </div>*/}

        <div className="flex opacity-50 items-center justify-center rounded-full bg-gray-200 w-10 h-10 hover:text-red-600 cursor-pointer">
          <FontAwesomeIcon icon={faHeart} className="text-xl cursor-pointer " />
        </div>
        <Link to="/login">
          <div
            className="flex items-center justify-center rounded-full bg-gray-200 w-10 h-10 hover:text-red-600 cursor-pointer"
            onClick={signOut}
          >
            <FontAwesomeIcon
              icon={faSignOutAlt}
              className="text-xl cursor-pointer "
            />
          </div>
        </Link>
        <Link to="/profile">
          <img
            src={picture}
            alt="user"
            width=""
            className="rounded-full cursor-pointer w-10 h-10 hover:border-gray-700 border-2"
          />
        </Link>
      </div>
    </div>
  )
}

export default Navbar
