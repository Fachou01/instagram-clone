import React, { useRef } from 'react'
import SingleItem from './SingleItem'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from 'react-loader-spinner'
const Item = () => {
  const myRef = useRef(null)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const response = await axios.get('http://localhost:3001/getposts')
      setLoading(false)
      if (myRef.current) setData(response.data)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    if (myRef.current) {
      fetchPosts()
    }
  }, [])
  if (loading === false) {
    return (
      <div className="main mt-3 " ref={myRef}>
        {data.map((post, key) => {
          return (
            <SingleItem
              key={post._id}
              id={post._id}
              user={post.userId.userName}
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
          <Loader type="Puff" color="#D0312D" height={50} width={50} />
        </div>
      </div>
    )
  }
}

export default Item
