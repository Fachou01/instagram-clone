import axios from "axios";

const getPosts = async () =>{
    try {
        const response = await axios.get('http://localhost:3001/posts');
        return response;
    } catch (error) {
        throw error;
    }
}


const getFriendsPosts = async (userId) =>{
    try {
        const response = await axios.get(`http://localhost:3001/posts/friends/${userId}`);
        return response;
    } catch (error) {
        throw error;
    }
}

export {
    getPosts,
    getFriendsPosts
}