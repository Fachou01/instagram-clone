import React, { useRef } from 'react'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import {
  faHeart,
  faPaperPlane,
  faComment,
  faBookmark,
  faSmile,
} from '@fortawesome/free-regular-svg-icons'

const SingleItem = ({
  user,
  id,
  userPicture,
  reacts,
  description,
  picture,
}) => {
  const myRef = useRef(null)
  const [userComments, setUserComments] = useState([])
  const [likes, setLikes] = useState(reacts)
  const [likesColor, setLikesColor] = useState(false)
  const [comment, setComment] = useState('')

  const getLike = async () => {
    const userId = await JSON.parse(localStorage.getItem('id'))
    try {
      const response = await axios.post('http://localhost:3001/getlike', {
        userId: userId,
        postId: id,
      })
      if (response.data.message === 'Likes found') {
        if (myRef.current) setLikesColor(true)
      } else {
        if (myRef.current) setLikesColor(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (myRef.current) getLike()
    // eslint-disable-next-line
  }, [])

  const handleLikes = async () => {
    const userId = JSON.parse(window.localStorage.getItem('id'))
    if (likesColor === false) {
      setLikes(likes + 1)
      setLikesColor(true)
      try {
        await axios.put('http://localhost:3001/addlike', {
          id: id,
          like: 1,
        })
        await axios.post('http://localhost:3001/addlike/likes', {
          userId: userId,
          postId: id,
        })
      } catch (error) {
        console.log(error)
      }
    } else {
      setLikes(likes - 1)
      setLikesColor(false)
      await axios.put('http://localhost:3001/removelike', {
        id: id,
        likes: -1,
      })
      await axios.post('http://localhost:3001/removelike/likes', {
        userId: userId,
        postId: id,
      })
    }
  }
  const handleComments = (e) => {
    e.preventDefault()
    const comm = {
      name: user,
      commentaire: comment,
    }
    setUserComments([...userComments, comm])
    setComment('')
  }
  return (
    <div
      className="flex flex-col justify-between border-2 border-black-100  rounded-lg mb-5"
      ref={myRef}
    >
      <div className="flex justify-between items-center p-3">
        <div className="flex items-center">
          <img
            src={userPicture}
            width="45"
            className="rounded-full border-2 border-gray-200"
            alt=""
          />
          <p className="text-xs ml-3 font-semibold">{user}</p>
        </div>
        <div>
          <FontAwesomeIcon
            icon={faCaretDown}
            className="text-xl cursor-pointer "
          />
        </div>
      </div>
      <div>
        <img src={picture} width="700" height="900" alt="user" />
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
        <div>
          <FontAwesomeIcon
            icon={faBookmark}
            className="text-2xl cursor-pointer "
          />
        </div>
      </div>
      <p className="px-3 pt-1 font-semibold ">{likes} likes</p>
      <div className="px-3 pt-1 text-sm">
        <span className="font-semibold text-sm">{user}</span> {description}
      </div>
      <p className="px-3 pt-2 text-sm text-gray-400">Show more comments</p>

      <div>
        {userComments.map((com) => {
          return (
            <div className="px-3 pt-2 text-sm flex gap-2">
              <div className="font-semibold">{com.name} :</div>
              <div>{com.commentaire}</div>
            </div>
          )
        })}
      </div>
      <p className="px-3 pt-4 text-xs text-gray-400">8 MINUTES AGO</p>
      <form onSubmit={handleComments}>
        <div className="flex justify-between items-center p-4 mt-3 border-2 rounded-lg border-black-100">
          <div className="flex gap-3">
            <FontAwesomeIcon
              icon={faSmile}
              className="text-2xl cursor-pointer "
            />
            <input
              type="text"
              placeholder="Add a comment..."
              className="border-0 focus:outline-none text-sm"
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
  )
}

export default SingleItem
