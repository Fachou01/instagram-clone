import React from 'react';
import Post from './components/Post/Post';
import Loader from 'react-loader-spinner';
import usePosts from './logic/usePosts';

const Posts = ({ isFeed }) => {

  const { loading, posts } = usePosts(isFeed);

  if (loading) return (
    <div className="container">
      <div className="flex justify-center items-center mt-16 ">
        <Loader type="Oval" color="#D0312D" height={50} width={50} />
      </div>
    </div>
  )

  if (!loading &&  ( !posts || posts.length <= 0)) return (
    <div class="flex justify-center p-4 mt-4 text-sm text-red-600 tracking-widest rounded-lg bg-red-50" role="alert">
      <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
      <span class="sr-only">Info</span>
      <div>
        <span class="font-medium">Posts:</span> No posts found !
      </div>
    </div>
  )

  if (!loading &&  ( posts && posts.length > 0)) return (
    <div className="main mt-3">
      {posts.map((post) => {
        return (
          <Post
            key={post._id}
            id={post._id}
            user={post.userId}
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
