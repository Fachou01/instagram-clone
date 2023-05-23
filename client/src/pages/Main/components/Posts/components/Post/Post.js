import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import {
  faHeart,
  faPaperPlane,
  faComment,
  faBookmark,
  faSmile,
  faTrashAlt,
} from '@fortawesome/free-regular-svg-icons';
import usePost from './logic/usePost';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Post = ({ id, user, reacts, comments, description, picture }) => {

  const { userComments, likes, isLiked, comment, setComment, commentRef, handleComments, handleLikes, deleteComment } = usePost(id, reacts, comments);

  return (
    <div className="flex flex-col justify-between border-2 border-black-100  rounded-lg mb-5">

      {/* Post Header */}
      <div className="flex justify-between items-center p-3">
        <Link to={`/profile/${user.userName}`}>
          <div className="flex items-center">
            <img
              src={user.userPicture}
              width="45"
              className="rounded-full border-2  border-gray-200 cursor-pointer "
              alt="user"
            />
            <div>
              <p className="text-xs ml-3 font-semibold cursor-pointer hover:text-gray-600">
                {user.userName}
              </p>
            </div>
          </div>
        </Link>
        <div>
          <FontAwesomeIcon
            icon={faCaretDown}
            className="text-xl cursor-pointer "
          />
        </div>
      </div>

      {/* Post Body */}
      <div onDoubleClick={handleLikes}>
        <img src={picture} className='w-full object-contain' alt="post" />
      </div>
      <div className="flex justify-between items-center px-3 pt-3">
        <div className="flex">
          <FontAwesomeIcon
            icon={faHeart}
            className={`text-2xl cursor-pointer mr-0 ${isLiked && ' text-red-600'}`}
            onClick={handleLikes}
          />

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
        <Link to={`/profile/${user.userName}`}>
          <span className="font-semibold text-sm cursor-pointer hover:text-gray-600">
            {user.userName} :
          </span>
        </Link>
        {description}
      </div>
      <p className="px-3 pt-2 text-sm text-gray-400">Show more comments</p>

      {/* Post Comments */}
      <div>
        {userComments.map((com) => {
          return (
            <div className="flex justify-between items-center">
              <div className="px-3 pt-2 text-sm flex gap-2" key={com._id}>
                <Link to={`/profile/${com.userId.userName}`}>
                  <div className="font-semibold cursor-pointer hover:text-gray-600">
                    {com.userId.userName} :
                  </div>
                </Link>
                <div>{com.content}</div>
              </div>
              {com.userId._id === JSON.parse(localStorage.getItem('id')) && (
                <div className="px-3" onClick={() => deleteComment(com._id)}>
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    className="text-sm cursor-pointer "
                  />
                </div>
              )}
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
              ref={commentRef}
              type="text"
              placeholder="Add a comment..."
              className="border-0 focus:outline-none text-sm"
              onChange={(e) => setComment(e.target.value)}
            ></input>
          </div>
          <div>
            <button
              type="submit"
              className={`text-blue-500 cursor-pointer text-sm font-semibold ${comment === '' && 'opacity-50'}`}
              disabled={comment === ''}
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Post;
