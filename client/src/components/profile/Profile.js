import React, { useRef } from 'react'
import Navbar from '../shared/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import AddPost from './AddPost'
import ShowPost from './ShowPost'
import axios from 'axios'
import Loader from 'react-loader-spinner'

const Profile = () => {
  const myRef = useRef(null)
  const [pictureP, setPictureP] = useState('')
  const [profileId, setProfileId] = useState('')
  const [idP, setIdP] = useState('')
  const [loading, setLoading] = useState(false)
  const [userPicture, setUserPicture] = useState([])
  const [postsNumber, setPostsNumber] = useState(0)
  const [likes, setLikes] = useState(0)
  const [actualUser, setActualUser] = useState(false)
  const [isFollowing, setIsFollowing] = useState('pending')
  const [userIdFriendState, setUserIdFriendState] = useState('')
  const [followingCount, setIsFollowingCount] = useState(0)
  const [followerCount, setIsFollowerCount] = useState(0)
  const location = useLocation()
  const history = useHistory()
  const urlUser = location.pathname.substring(
    location.pathname.lastIndexOf('/') + 1
  )
  const userId = JSON.parse(localStorage.getItem('id'))
  var userName = null
  var picture = null
  var fullName = null
  var userIdFriend = null

  if (
    urlUser === 'profile' ||
    urlUser === JSON.parse(localStorage.getItem('userName'))
  ) {
    userName = JSON.parse(localStorage.getItem('userName'))
    fullName = JSON.parse(localStorage.getItem('fullName'))
    picture = JSON.parse(localStorage.getItem('picture'))
  } else {
    userName = location.state.user
    fullName = location.state.fullName
    picture = location.state.userPicture
    userIdFriend = location.state.userIdFriend
  }
  const fetchMyPosts = async () => {
    var response = null
    try {
      setLoading(true)
      if (
        urlUser === 'profile' ||
        urlUser === JSON.parse(localStorage.getItem('userName'))
      ) {
        setActualUser(true)
        response = await axios.get(`http://localhost:3001/myposts/${userName}`)
      } else {
        setActualUser(false)
        response = await axios.get(`http://localhost:3001/myposts/${urlUser}`)
      }

      setLoading(false)
      const profile = response.data[0].userId
      setProfileId(profile)

      const userPictures = response.data
      if (myRef.current) setPostsNumber(userPictures.length)
      if (myRef.current) setUserPicture(userPictures)
    } catch (err) {
      console.log(err)
    }
  }
  const show = (id, picture, likes) => {
    setIdP(id)
    setPictureP(picture)
    setLikes(likes)
  }
  const handleShowPost = (state) => {
    if (state === true) {
      setDisplayPost(true)
    } else {
      setDisplayPost(false)
    }
  }
  const fetchFriends = async () => {
    try {
      var responseFollows = null
      if (
        urlUser === 'profile' ||
        urlUser === JSON.parse(localStorage.getItem('userName'))
      ) {
        responseFollows = await axios.get(
          `http://localhost:3001/myfollows/${userId}`
        )
      } else {
        responseFollows = await axios.get(
          `http://localhost:3001/myfollows/${userIdFriend}`
        )
      }
      if (responseFollows.data.length === 0) {
        setIsFollowingCount(0)
        setIsFollowerCount(0)
      } else {
        const following = responseFollows.data[0].following.length
        const followers = responseFollows.data[0].followers.length
        setIsFollowingCount(following)
        setIsFollowerCount(followers)
      }

      const responseFriends = await axios.get(
        `http://localhost:3001/myfriends/${userIdFriend}&${userId}`
      )
      if (responseFriends.data.friend === 'true') {
        setIsFollowing('true')
      } else {
        setIsFollowing('false')
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (myRef.current) {
      fetchMyPosts()
      fetchFriends()
    }
    // eslint-disable-next-line
  }, [location.pathname])
  const [display, setDisplay] = useState(false)
  const [displayPost, setDisplayPost] = useState(false)
  //const fullName = JSON.parse(localStorage.getItem('fullName'))
  //const userName = JSON.parse(localStorage.getItem('userName'))
  //const picture = JSON.parse(localStorage.getItem('picture'))
  const handleAdd = () => {
    if (display === false) {
      setDisplay(true)
    } else {
      setDisplay(false)
    }
  }
  const handleFollow = async () => {
    setIsFollowing('true')
    setIsFollowerCount(followerCount + 1)
    try {
      const response = await axios.post('http://localhost:3001/addfollow', {
        userId: userId,
        followingId: profileId,
      })
    } catch (error) {
      console.log(error)
    }
  }
  const handleUnFollow = async () => {
    setIsFollowing('false')
    setIsFollowerCount(followerCount - 1)
    try {
      const response = await axios.post('http://localhost:3001/deletefollow', {
        userId: userId,
        followingId: profileId,
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div ref={myRef}>
      <Navbar currentHome="false" currentProfile="true" currentChat="false" />
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
                {actualUser === true ? (
                  <div>
                    <button
                      type="button"
                      className=" border-2 border-gray-100 rounded-lg p-1"
                    >
                      Edit Profile
                    </button>
                  </div>
                ) : null}
                {actualUser === true ? (
                  <div>
                    <FontAwesomeIcon
                      icon={faCog}
                      className="text-xl  cursor-pointer "
                    />
                  </div>
                ) : null}
                {actualUser === true ? (
                  <div onClick={handleAdd}>
                    <FontAwesomeIcon
                      icon={faPlusSquare}
                      className="text-xl  cursor-pointer "
                    />
                  </div>
                ) : isFollowing === 'false' ? (
                  <div onClick={handleFollow}>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
                      Follow
                    </button>
                  </div>
                ) : isFollowing === 'true' ? (
                  <div onClick={handleUnFollow}>
                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full">
                      Unfollow
                    </button>
                  </div>
                ) : (
                  <div>
                    <Loader
                      type="Oval"
                      color="#D0312D"
                      height={25}
                      width={25}
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-between mb-5  ">
                <div>
                  <p>
                    <span className="font-semibold">{postsNumber}</span> posts
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-semibold">{followerCount}</span>{' '}
                    followers
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-semibold">{followingCount}</span>{' '}
                    following
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
          {/*<div className="flex gap-3 px-16 mb-8">
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
          </div>*/}
          <div className="flex justify-evenly   border-t-2 border-gray-200 mb-5 ">
            <div className="text-black mt-5">POSTS</div>
            <div className="text-gray-400 mt-5">IGTV</div>
            <div className="text-gray-400 mt-5">SAVED</div>
            <div className="text-gray-400 mt-5">TAGGED</div>
          </div>
          {loading === true ? (
            <div className="flex justify-center items-center mt-20 ">
              <Loader type="Oval" color="#D0312D" height={45} width={45} />
            </div>
          ) : (
            <div className="grid grid-cols-3 max-h-80 gap-2 ">
              <React.Fragment>
                {userPicture.map((element, key) => {
                  return (
                    <div
                      className="col-span-1 cursor-pointer"
                      key={element._id}
                      onClick={(e) => {
                        show(element._id, element.image, element.likes)
                        handleShowPost(true)
                      }}
                    >
                      <img
                        className="h-40 lg:h-80   w-full object-cover	"
                        src={element.image}
                        alt=""
                      />
                    </div>
                  )
                })}
              </React.Fragment>
            </div>
          )}
          {displayPost === true && (
            <ShowPost
              id={idP}
              picture={pictureP}
              userId={userIdFriend}
              userFullName={fullName}
              userPicture={picture}
              userNamePost={userName}
              handlePost={handleShowPost}
              reacts={likes}
            />
          )}
        </div>
        {display === true && <AddPost />}
      </div>
    </div>
  )
}

export default Profile
