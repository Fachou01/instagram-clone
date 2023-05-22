import httpMain from "../../../../../../../utils/httpMain";

const getLike = async (userId, postId) => {
    try {
        const response = await httpMain.get(`/likes/check-like/user/${userId}?postId=${postId}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const addLike = async (userId, postId) => {
    try {
        const response = await httpMain.post('/likes', {
            userId,
            postId
        });
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteLike = async (userId, postId) => {
    try {
        const response = await httpMain.delete(`/likes/user/${userId}?postId=${postId}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const addComment = async (userId, postId,content) => {
    try {
        const response = await httpMain.post('/comments', {
            userId,
            postId,
            content
          });

        return response;
    } catch (error) {
        throw error;
    }
}

const deleteComment = async (commentId, postId) => {
    try {
        const response = await httpMain.delete(`/comments/${commentId}?postId=${postId}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const postService = {
    getLike,
    addLike,
    deleteLike,
    addComment,
    deleteComment
}

export default postService;