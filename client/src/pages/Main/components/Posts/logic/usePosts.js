import { useEffect, useState } from "react"
import postsService from "./postsService"

const usePosts = (isFeed) => {

    const [posts, setPosts] = useState();
    const [loading, setLoading] = useState(false);
    const userId = JSON.parse(localStorage.getItem('id'));

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await postsService.getPosts();
            setPosts(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const fetchFriendsPosts = async (userId) => {
        try {
            setLoading(true);
            const response = await postsService.getFriendsPosts(userId);
            setPosts(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(isFeed) fetchPosts();
        else fetchFriendsPosts(userId);
    }, [isFeed])

    return {
        loading,
        posts
    }
}

export default usePosts;