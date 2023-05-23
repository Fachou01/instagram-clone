import httpMain from "../../../../../../../utils/httpMain";

const getPost = async (id) => {
    try {
        const response = await httpMain.get(`/posts/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const addPost = async (userId,title,image,description) => {

    try {
        const response = await httpMain.post('/posts', {
            id: userId,
            title: title,
            image: image,
            description: description,
          })
          console.log("response")
        return response;
    } catch (error) {
        throw error;
    }
}

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
    getPost,
    addPost,
    getLike,
    addLike,
    deleteLike,
    addComment,
    deleteComment
}

export default postService;