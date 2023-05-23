import httpMain from "../../../../../utils/httpMain";

const getPosts = async () => {
    try {
        const response = await httpMain.get('/posts');
        return response;
    } catch (error) {
        throw error;
    }
}

const getPostsByUser = async (userName) => {
    try {
        const response = await httpMain.get(`http://localhost:3001/posts/user/${userName}`);
        return response;
    } catch (error) {
        throw error;
    }
    
}

const getFriendsPosts = async (userId) =>{
    try {
        const response = await httpMain.get(`/posts/friends/${userId}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const postsService = {
    getPosts,
    getPostsByUser,
    getFriendsPosts
}

export default postsService;