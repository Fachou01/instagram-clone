import React, { useRef } from 'react'
import Post from './Post'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from 'react-loader-spinner'
const Posts = ({ isFeed }) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const userId = JSON.parse(localStorage.getItem('id'))

  const fetchPosts = async (isFeed) => {
    if (isFeed) {
      try {
        setLoading(true)
        const response = await axios.get('http://localhost:3001/posts');
        setLoading(false);
        setPosts(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }

    } else {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3001/posts/friends/${userId}`);
        setPosts(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    fetchPosts(isFeed);
  }, [isFeed])

  if (loading) return (
    <div className="container">
      <div className="flex justify-center items-center mt-16 ">
        <Loader type="Oval" color="#D0312D" height={50} width={50} />
      </div>
    </div>
  )
  if (!loading && posts) return (
    <div className="main mt-3">
      {posts.map((post) => {
        return (
          <Post
            key={post._id}
            id={post._id}
            userIdFriend={post.userId._id}
            user={post.userId.userName}
            fullName={post.userId.fullName}
            userPicture={post.userId.userPicture}
            reacts={post.likes}
            comments={post.comments}
            description={post.description}
            picture={post.image}
          />
        )
      })}
    </div>
  )

}

export default Posts;
