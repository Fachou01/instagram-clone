import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faPaperPlane, faCompass, faHeart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import profileService from '../../pages/Profile/logic/profileService';
import { useState } from 'react'
import instagramLogo from '../../assets/images/instagram.png';


const Navbar = ({ currentHome, currentProfile, currentChat }) => {

  const picture = JSON.parse(localStorage.getItem('picture'));
  const userName = JSON.parse(localStorage.getItem('userName'));
  const [usersSearch, setUsersSearch] = useState([]);
  const [filtredUsers, setFiltredUsers] = useState([]);

  const signOut = () => {
    localStorage.clear()
  }

  const handleSearch = async () => {
    const response = await profileService.getUsers();
    setUsersSearch(response.data);
  }

  const handleSearchChange = (userName) => {
    const newUsers = usersSearch.filter((data) => {
      return data.userName.toLowerCase().includes(userName.toLowerCase());
    })
    if (userName === '') {
      setFiltredUsers([])
    } else {
      setFiltredUsers(newUsers);
    }
  }

  return (
    <div className="flex sticky top-0 w-full bg-white justify-between items-center border-b-2 border-black-100 h-20  p-5  ">
      <Link to="/main">
        <div className="flex items-center gap-1 cursor-pointer ">
          <img
            className="w-10"
            src={instagramLogo}
            alt="logo"
          />
        </div>
      </Link>
      <div className="flex flex-col">
        <div className="relative">
          <input
            onClick={handleSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
            type="search"
            className="shadow hidden sm:flex w-full  appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-md"
            placeholder="Search"
          />
        </div>
        {filtredUsers.length !== 0 ? (
          <div className="absolute  overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-100  h-44 top-16 rounded-lg -ml-8 w-72 p-3 bg-white">
            {filtredUsers.slice(0, 10).map((data) => {
              return (
                <Link to={`/profile/${userName}`}>
                <div
                  className="p-2 flex items-center cursor-pointer hover:bg-gray-200 transition duration-200 ease-in-out">
                  <div>
                    <img
                      src={data.userPicture}
                      width="45"
                      className="rounded-full border-2 mr-3  border-gray-200 cursor-pointer "
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="font-semibold text-sm">{data.userName}</div>
                    <div className="text-xs">{data.fullName}</div>
                  </div>
                </div>
                </Link>
              )
            })}
          </div>
        ) : null}
      </div>
      <div className="flex justify-between items-center gap-2">
        <Link to="/main">
          <div className="flex items-center justify-center rounded-full bg-gray-200  w-10 h-10 hover:text-red-600">
            {currentHome === 'true' ? (
              <FontAwesomeIcon
                icon={faHome}
                className="text-xl  text-red-600 cursor-pointer "
              />
            ) : (
              <FontAwesomeIcon
                icon={faHome}
                className="text-xl cursor-pointer "
              />
            )}
          </div>
        </Link>
        <Link to="/chat">
          <div className="flex   items-center justify-center rounded-full bg-gray-200 w-10 h-10 hover:text-red-600 cursor-pointer">
            {currentChat === 'true' ? (
              <FontAwesomeIcon
                icon={faPaperPlane}
                className="text-xl text-red-600  "
              />
            ) : (
              <FontAwesomeIcon icon={faPaperPlane} className="text-xl  " />
            )}
          </div>
        </Link>

        {/*<div className="flex items-center justify-center rounded-full bg-gray-200 w-10 h-10 hover:text-red-600 cursor-pointer">
          <FontAwesomeIcon
            icon={faCompass}
            className="text-xl cursor-pointer "
          />
        </div>*/}

        <div className="flex opacity-50 items-center justify-center rounded-full bg-gray-200 w-10 h-10 hover:text-red-600 cursor-pointer">
          <FontAwesomeIcon icon={faHeart} className="text-xl cursor-pointer " />
        </div>
        <Link to="/">
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
        <Link to={`/profile/${userName}`}>
          {currentProfile === 'true' ? (
            <img
              src={picture}
              alt="user"
              width=""
              className="rounded-full cursor-pointer w-10 h-10 border-gray-700 border-2"
            />
          ) : (
            <img
              src={picture}
              alt="user"
              width=""
              className="rounded-full cursor-pointer w-10 h-10 hover:border-gray-700 border-2"
            />
          )}
        </Link>
      </div>
    </div>
  )
}

export default Navbar
