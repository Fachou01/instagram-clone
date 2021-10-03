import React from 'react'
import SingleItem from './SingleItem'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from 'react-loader-spinner'
const Item = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const response = await axios.get('http://localhost:3001/getposts')
      console.log(response)
      setData(response.data)
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    console.log('useEffect called')
    fetchPosts()
  }, [])
  if (loading === false) {
    return (
      <div className="main mt-3 ">
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
