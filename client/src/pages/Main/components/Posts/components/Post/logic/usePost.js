import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const usePost = (id,reacts,comments) => {

    const userId = JSON.parse(window.localStorage.getItem('id'));
    const userUsername = JSON.parse(window.localStorage.getItem('userName'))

  const commentRef = useRef(null);
  const [userComments, setUserComments] = useState(comments);
  const [likes, setLikes] = useState(reacts.length);
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState('');
  const history = useHistory();

  const getLike = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/likes/check-like/user/${userId}?postId=${id}`);
      if (response.data.message === 'Likes found') {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteComment = async (com) => {
    await axios.delete(`http://localhost:3001/comments/${com}?postId=${id}`);
    const newComments = userComments.filter((elt) => elt._id !== com);
    setUserComments(newComments);
  }

  const handleLikes = async () => {

    if (isLiked === false) {
      try {
        setLikes(likes + 1);
        setIsLiked(true);
        await axios.post('http://localhost:3001/likes', {
          userId: userId,
          postId: id,
        })
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        setLikes(likes - 1);
        setIsLiked(false);
        await axios.delete(`http://localhost:3001/likes/user/${userId}?postId=${id}`, {
          userId: userId,
          postId: id,
        })
      } catch (error) {
        console.log(error);
      }
    }
  }
  const handleComments = async (e) => {
    
    e.preventDefault();
    if (commentRef.current.value !== '') {
      try {
        const response = await axios.post('http://localhost:3001/comments', {
          userId: userId,
          postId: id,
          content: comment,
        })

        const comm = {
          _id: response.data._id,
          userId: {
            _id: userId,
            userName: userUsername,
          },
          content: comment,
        }
        setUserComments([...userComments, comm]);
        setComment('');
        commentRef.current.value = '';
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    getLike();
  }, [])

  return {
    userComments,
    likes,
    isLiked,
    comment,
    setComment,
    commentRef,
    handleComments,
    handleLikes,
    deleteComment
  }
  
}
export default usePost