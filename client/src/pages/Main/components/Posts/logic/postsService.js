import httpMain from "../../../../../utils/httpMain";

const getPosts = async () =>{
    try {
        const response = await httpMain.get('/posts');
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

export {
    getPosts,
    getFriendsPosts
}