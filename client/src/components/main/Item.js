import React, { useRef } from 'react'
import SingleItem from './SingleItem'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from 'react-loader-spinner'
const Item = ({ isFeed }) => {
  const myRef = useRef(null)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const userId = JSON.parse(localStorage.getItem('id'))

  const fetchPosts = async () => {
    if (isFeed === 'true') {
      try {
        setLoading(true)

        const response = await axios.get('http://localhost:3001/posts')
        setLoading(false)
        if (myRef.current) setData(response.data)
      } catch (err) {
        console.log(err)
      }
    } else {
      setLoading(true)
      try {
        const response = await axios.get(
          `http://localhost:3001/posts/friends/${userId}`
        )

        setLoading(false)
        if (myRef.current) setData(response.data)
      } catch (err) {
        console.log(err)
      }
    }
  }
  useEffect(() => {
    if (myRef.current) {
      fetchPosts()
    }
  }, [isFeed])
  if (loading === false) {
    return (
      <div className="main mt-3 " ref={myRef}>
        {data.map((post) => {
          return (
            <SingleItem
              key={post._id}
              id={post._id}
              userIdFriend={post.userId._id}
              user={post.userId.userName}
              fullName={post.userId.fullName}
              userPicture={post.userId.userPicture}
              reacts={post.likes}
              description={post.description}
              picture={post.image}
            />
          )
        })}
      </div>
    )
  } else {
    return (
      <div className="container">
        <div className="flex justify-center items-center mt-16 ">
          <Loader type="Oval" color="#D0312D" height={50} width={50} />
        </div>
      </div>
    )
  }
}

export default Item
