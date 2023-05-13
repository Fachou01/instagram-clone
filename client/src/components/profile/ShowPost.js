import React from 'react'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import {
  faHeart,
  faPaperPlane,
  faComment,
  faSmile,
  faTrashAlt,
} from '@fortawesome/free-regular-svg-icons'
import Loader from 'react-loader-spinner'

const ShowPost = ({
  id,
  userFullName,
  userId,
  picture,
  handlePost,
  reacts,
  userPicture,
  userNamePost,
}) => {
  const [loading, setLoading] = useState(false)
  const [likes, setLikes] = useState(reacts)
  const [likesColor, setLikesColor] = useState(false)
  const [comment, setComment] = useState('')
  const [userComments, setUserComments] = useState([])
  const history = useHistory()

  const profilePost = async () => {
    try {
      setLoading(true)
      const response = await axios.get(
        `http://localhost:3001/posts/profilepost/${id}`
      )
      setLoading(false)
      setUserComments(response.data)
    } catch (err) {
      console.log(err)
    }
  }
  const handleLikes = async () => {
    const userId = JSON.parse(window.localStorage.getItem('id'))
    if (likesColor === false) {
      setLikes(likes + 1)
      setLikesColor(true)
      try {
        await axios.put('http://localhost:3001/like/addlike', {
          id: id,
          like: 1,
        })
        await axios.post('http://localhost:3001/like/addlike/likes', {
          userId: userId,
          postId: id,
        })
      } catch (error) {
        console.log(error)
      }
    } else {
      setLikes(likes - 1)
      setLikesColor(false)
      await axios.put('http://localhost:3001/like/removelike', {
        id: id,
        likes: -1,
      })
      await axios.post('http://localhost:3001/like/removelike/likes', {
        userId: userId,
        postId: id,
      })
    }
  }
  const handleComments = async (e) => {
    const userId = JSON.parse(window.localStorage.getItem('id'))
    const userUsername = JSON.parse(window.localStorage.getItem('userName'))
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3001/addcomment', {
        userId: userId,
        postId: id,
        comment: comment,
      })

      const comm = {
        _id: response.data._id,
        userId: {
          _id: userId,
          userName: userUsername,
        },
        description: comment,
      }
      setUserComments([...userComments, comm])
      setComment('')
    } catch (error) {
      console.log(error)
    }
  }
  const deleteComment = async (com) => {
    await axios.post('http://localhost:3001/removecomment', {
      commId: com,
    })
    const newComments = userComments.filter((elt) => elt._id !== com)
    setUserComments(newComments)
  }
  const getLike = async () => {
    const userId = await JSON.parse(localStorage.getItem('id'))
    try {
      const response = await axios.post('http://localhost:3001/like/getlike', {
        userId: userId,
        postId: id,
      })
      if (response.data.message === 'Likes found') {
        setLikesColor(true)
      } else {
        setLikesColor(false)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleShowProfile = (userName, userId, fullName, userPicture) => {
    history.push({
      pathname: `/profile/${userName}`,
      state: {
        user: userName,
        userIdFriend: userId,
        fullName: fullName,
        userPicture: userPicture,
      },
    })
    window.location.reload()
  }
  useEffect(() => {
    profilePost()
    getLike()
  }, [ShowPost])
  const pictureProfile = JSON.parse(localStorage.getItem('picture'))
  //const userId = JSON.parse(window.localStorage.getItem('id'))
  const userUsername = JSON.parse(window.localStorage.getItem('userName'))
  const fullName = JSON.parse(window.localStorage.getItem('fullName'))

  return (
    <div className=" flex justify-center bg-gray-200 top-40 left-44   absolute shadow-2xl ">
      <div className=" h-2/3" style={{ width: '38rem' }}>
        <img
          className="  object-cover"
          src={picture}
          alt=""
          style={{ height: '32rem' }}
        />
      </div>
      <div className="w-96 mt-3">
        <div className="flex flex-col justify-between items-start ml-4 w-96 ">
          <div className="flex items-center mb-3  ">
            <img
              onClick={() =>
                handleShowProfile(
                  userNamePost,
                  userId,
                  userFullName,
                  userPicture
                )
              }
              src={userPicture}
              width="45"
              className="rounded-full border-2  border-gray-200 cursor-pointer"
              alt=""
            />
            <p
              className="text-xs ml-3 font-semibold cursor-pointer hover:text-gray-600"
              onClick={() =>
                handleShowProfile(
                  userNamePost,
                  userId,
                  userFullName,
                  userPicture
                )
              }
            >
              {userNamePost}
            </p>
          </div>
          <div className="h-80 overflow-y-scroll w-full scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-100">
            {loading === true ? (
              <div className="flex justify-center items-center mt-5 ">
                <Loader type="Oval" color="#D0312D" height={35} width={35} />
              </div>
            ) : (
              <React.Fragment>
                {userComments.map((element) => {
                  return (
                    <div className="flex justify-between items-center">
                      <div className=" pt-2 text-sm flex gap-2 items-center">
                        <div className="font-semibold cursor-pointer ">
                          <img
                            onClick={() =>
                              handleShowProfile(
                                element.userId.userName,
                                element.userId._id,
                                element.userId.fullName,
                                element.userId.userPicture
                              )
                            }
                            src={element.userId.userPicture}
                            width="45"
                            className="rounded-full border-2  border-gray-200"
                            alt=""
                          />
                        </div>
                        <div
                          className="font-semibold ml-1 cursor-pointer hover:text-gray-600 "
                          onClick={() =>
                            handleShowProfile(
                              element.userId.userName,
                              element.userId._id,
                              element.userId.fullName,
                              element.userId.userPicture
                            )
                          }
                        >
                          {element.userId.userName} :
                        </div>
                        <div>{element.description}</div>
                      </div>
                      {element.userId._id ===
                        JSON.parse(localStorage.getItem('id')) && (
                        <div
                          className="px-3"
                          onClick={() => deleteComment(element._id)}
                        >
                          <FontAwesomeIcon
                            icon={faTrashAlt}
                            className="text-sm cursor-pointer "
                          />
                        </div>
                      )}
                    </div>
                  )
                })}
              </React.Fragment>
            )}
          </div>
          <div className="flex justify-between items-center px-3 pt-3">
            <div className="flex">
              {likesColor ? (
                <FontAwesomeIcon
                  icon={faHeart}
                  className="text-2xl cursor-pointer text-red-600 mr-0 "
                  onClick={handleLikes}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faHeart}
                  className="text-2xl cursor-pointer  mr-0 "
                  onClick={handleLikes}
                />
              )}

              <FontAwesomeIcon
                icon={faComment}
                className="text-2xl cursor-pointer ml-4 "
              />
              <FontAwesomeIcon
                icon={faPaperPlane}
                className="text-2xl cursor-pointer ml-3 "
              />
            </div>
          </div>
          <div className="flex">
            <p className="px-3 pt-1 font-semibold ">{likes} likes</p>
          </div>
          <form onSubmit={handleComments} className="w-full">
            <div className="flex justify-between items-center p-4 mt-3 border-2 rounded-lg border-black-100">
              <div className="flex gap-3">
                <FontAwesomeIcon
                  icon={faSmile}
                  className="text-2xl cursor-pointer "
                />
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="border-0 focus:outline-none text-sm w-full"
                  onChange={(e) => setComment(e.target.value)}
                ></input>
              </div>
              <div>
                <button
                  type="submit"
                  className="text-blue-500 cursor-pointer text-sm font-semibold"
                >
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div>
        <FontAwesomeIcon
          icon={faTimesCircle}
          className="text-xl m-2  cursor-pointer text-red-600 hover:opacity-80 "
          onClick={() => handlePost(false)}
        />
      </div>
    </div>
  )
}

export default ShowPost
