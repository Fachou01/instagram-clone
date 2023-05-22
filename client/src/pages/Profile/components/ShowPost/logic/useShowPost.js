import axios from "axios";
import { useEffect, useState } from "react";
import postService from "../../../../Main/components/Posts/components/Post/logic/postService";

const useShowPost = (id) => {

    const userId = JSON.parse(window.localStorage.getItem('id'));

    const [post, setPost] = useState();
    const [loading, setLoading] = useState(false);
    const [userComments, setUserComments] = useState();
    const [likes, setLikes] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const [comment, setComment] = useState('');

    const getPost = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3001/posts/${id}`);
            setPost(response.data);
            setUserComments(response.data.comments);
            setLikes(response.data.likes);
        } catch (error) {
            console.log(error);
        } finally{
            setLoading(false);
        }
    }

    const getLike = async () => {
        try {
            const response = await postService.getLike(userId, id);
            if (response.data.message === 'Likes found') {
                setIsLiked(true);
            } else {
                setIsLiked(false);
            }
        } catch (error) {
            console.log(error);
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
        if (comment !== '') {
            try {
                const response = await postService.addComment(userId, id,comment);
                const comm = response.data;

                setUserComments([...userComments, comm]);
                setComment('');
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        getPost();
        getLike();
    }, [])

    return {
        post,
        loading,
        userComments,
        likes,
        isLiked,
        comment,
        setComment,
        handleComments,
        handleLikes,
        deleteComment,    
    }
}
export default useShowPost;