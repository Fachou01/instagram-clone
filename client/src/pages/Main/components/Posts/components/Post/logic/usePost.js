import { useEffect, useRef, useState } from "react";
import postService from "./postService";

const usePost = (id, reacts, comments) => {

  const userId = JSON.parse(window.localStorage.getItem('id'));
  const userUsername = JSON.parse(window.localStorage.getItem('userName'));

  const commentRef = useRef(null);
  const [userComments, setUserComments] = useState(comments);
  const [likes, setLikes] = useState(reacts.length);
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState('');

  const getLike = async () => {
    try {
      const response = await postService.getLike(userId, id);
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
    await postService.deleteComment(com, id);
    const newComments = userComments.filter((elt) => elt._id !== com);
    setUserComments(newComments);
  }

  const handleLikes = async () => {

    if (isLiked === false) {
      try {
        setLikes(likes + 1);
        setIsLiked(true);
        await postService.addLike(userId, id);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        setLikes(likes - 1);
        setIsLiked(false);
        await postService.deleteLike(userId, id);
      } catch (error) {
        console.log(error);
      }
    }
  }
  const handleComments = async (e) => {

    e.preventDefault();
    if (commentRef.current.value !== '') {
      try {
        const response = await postService.addComment(userId, id, comment);

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