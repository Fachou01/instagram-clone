import React from 'react'
import Navbar from '../shared/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import AddPost from './AddPost'
import axios from 'axios'

const Profile = () => {
  const [userPicture, setUserPicture] = useState([])
  const [postsNumber, setPostsNumber] = useState(0)
  const userId = JSON.parse(localStorage.getItem('id'))
  const fetchMyPosts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/myposts/${userId}`
      )
      const userPictures = response.data
      setPostsNumber(userPictures.length)
      setUserPicture(userPictures)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchMyPosts()
    // eslint-disable-next-line
  }, [])
  const [display, setDisplay] = useState(false)
  const fullName = JSON.parse(localStorage.getItem('fullName'))
  const userName = JSON.parse(localStorage.getItem('userName'))
  const picture = JSON.parse(localStorage.getItem('picture'))
  const handleAdd = () => {
    if (display === false) {
      setDisplay(true)
    } else {
      setDisplay(false)
    }
  }
  return (
    <div>
      <Navbar />
      <div>
        <div className="flex flex-col px px-6 py-12 ">
          <div className="flex mb-8 px-16 ">
            <div className="mr-8">
              <img src={picture} alt="profile" className="rounded-full w-36" />
            </div>
            <div className="ml-9 flex-col flex-auto  ">
              <div className="flex gap-7  items-center mb-3  ">
                <div>
                  <p className="font-semibold text-lg">{userName}</p>
                </div>
                <div>
                  <button
                    type="button"
                    className=" border-2 border-gray-100 rounded-lg p-1"
                  >
                    Edit Profile
                  </button>
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faCog}
                    className="text-xl  cursor-pointer "
                  />
                </div>
                <div onClick={handleAdd}>
                  <FontAwesomeIcon
                    icon={faPlusSquare}
                    className="text-xl  cursor-pointer "
                  />
                </div>
              </div>
              <div className="flex justify-between mb-5  ">
                <div>
                  <p>
                    <span className="font-semibold">{postsNumber}</span> posts
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-semibold">0</span> followers
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-semibold">0</span> following
                  </p>
                </div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div>
                <p className="font-semibold text-md">{fullName}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3 px-16 mb-8">
            <div className="flex flex-col justify-center items-center cursor-pointer p-3">
              <img
                src="https://avatars.dicebear.com/api/croodles/koumenji.svg"
                className="rounded-full w-24 border-2 border-gray-300"
                alt=""
              />
              <p className="text-xs mt-1 font-semibold ">Beach</p>
            </div>
            <div className="flex flex-col justify-center items-center cursor-pointer p-3">
              <img
                src="https://avatars.dicebear.com/api/croodles/hey.svg"
                className="rounded-full w-24 border-2 border-gray-300"
                alt=""
              />
              <p className="text-xs mt-1 font-semibold">Trip</p>
            </div>
            <div className="flex flex-col justify-center items-center cursor-pointer p-3">
              <img
                src="https://avatars.dicebear.com/api/croodles/h.svg"
                className="rounded-full w-24 border-2 border-gray-300"
                alt=""
              />
              <p className="text-xs mt-1 font-semibold">Trip</p>
            </div>
            <div className="flex flex-col justify-center items-center cursor-pointer p-3">
              <img
                src="https://avatars.dicebear.com/api/croodles/y.svg"
                className="rounded-full w-24 border-2 border-gray-300"
                alt=""
              />
              <p className="text-xs mt-1 font-semibold">Trip</p>
            </div>
          </div>
          <div className="flex justify-evenly   border-t-2 border-gray-200 mb-5 ">
            <div className="text-black mt-5">POSTS</div>
            <div className="text-gray-400 mt-5">IGTV</div>
            <div className="text-gray-400 mt-5">SAVED</div>
            <div className="text-gray-400 mt-5">TAGGED</div>
          </div>
          <div className="grid grid-cols-3 max-h-80 gap-2 ">
            {userPicture.map((element, key) => {
              return (
                <div className="col-span-1" key={element._id}>
                  <img className="h-60 w-full" src={element.image} alt="" />
                </div>
              )
            })}
          </div>
        </div>
        {display === true && <AddPost />}
      </div>
    </div>
  )
}

export default Profile
