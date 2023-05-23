import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faPaperPlane, faComment, faSmile, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import useShowPost from './logic/useShowPost';

const ShowPost = ({ postId, setPostId }) => {

  const { post, userComments, loading, likes, isLiked, comment, setComment, handleComments, handleLikes, deleteComment } = useShowPost(postId);

  return (
    <div className={`${postId ? "" : "hidden"} flex min-h-full items-center justify-center fixed inset-0 z-10 overflow-y-auto bg-gray-800 bg-opacity-75`}>
      <div className={`flex  bg-gray-100 w-4/6 h-5/6 ${!post && " justify-center items-center"} `}>
        {!post ? <Loader type="Oval" color="#D0312D" height={50} width={50} />
          : <>
            <div className="h-full w-4/6">
              <img
                className="w-full h-full object-cover"
                src={post.image}
                alt=""
              />
            </div>
            <div className="pt-3 h-full">
              <div className="flex flex-col justify-between items-start ml-4 w-96 h-full">
                <div>
                  <div className="flex items-center mb-3">
                    <img
                      src={post.userId.userPicture}
                      width="45"
                      className="rounded-full border-2  border-gray-200 cursor-pointer"
                      alt=""
                    />
                    <p
                      className="text-xs ml-3 font-semibold cursor-pointer hover:text-gray-600"
                    >
                      {post.userId.userName}
                    </p>
                  </div>
                  <div className="h-80 overflow-y-scroll w-full scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-100">
                    {loading ? (
                      <div className="flex justify-center items-center mt-5 ">
                        <Loader type="Oval" color="#D0312D" height={35} width={35} />
                      </div>
                    ) : (
                      <>
                        {userComments.map((comment) => {
                          return (
                            <div className="flex justify-between items-center">
                              <Link to={`/profile/${comment.userId.userName}`}>
                                <div className=" pt-2 text-sm flex gap-2 items-center">
                                  <div className="font-semibold cursor-pointer ">
                                    <img
                                      src={comment.userId.userPicture}
                                      width="45"
                                      className="rounded-full border-2  border-gray-200"
                                      alt=""
                                    />
                                  </div>
                                  <div className="font-semibold ml-1 cursor-pointer hover:text-gray-600">
                                    {comment.userId.userName} :
                                  </div>
                                  <div>{comment.content}</div>
                                </div>
                              </Link>
                              {comment.userId._id === JSON.parse(localStorage.getItem('id')) && (
                                <div
                                  className="px-3"
                                  onClick={() => deleteComment(comment._id)}
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
                      </>
                    )}
                  </div>
                </div>

                <div className='w-full'>
                  <div className="flex justify-between w-2/6 items-center px-3 pt-3">
                    {isLiked ? (
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
                  <div className="flex">
                    <p className="px-3 pt-1 font-semibold ">{likes} likes</p>
                  </div>
                  <div className="w-full">
                    <form onSubmit={handleComments}>
                      <div className='flex justify-between items-center p-4 mt-3 border-2 rounded-md border-black-100 w-full'>
                        <div className="flex gap-3 w-5/6">
                          <FontAwesomeIcon
                            icon={faSmile}
                            className="text-2xl cursor-pointer "
                          />
                          <input
                            type="text"
                            placeholder="Add a comment..."
                            className="border-0 focus:outline-none text-sm w-full"
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
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
              </div>
            </div>
            <div>
              <FontAwesomeIcon
                icon={faTimesCircle}
                className="text-xl m-2  cursor-pointer text-red-600 hover:opacity-80 "
                onClick={() => setPostId(false)}
              />
            </div>
          </>
        }

      </div>
    </div>
  )
}

export default ShowPost
