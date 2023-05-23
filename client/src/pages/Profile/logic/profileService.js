import httpMain from "../../../utils/httpMain";

const getUsers = async () => {
    try {
        const response = await httpMain.get('/users');
        return response;
    } catch (error) {
        throw error;
    }
}

const getUser = async (id) => {
    try {
        const response = await httpMain.get(`/users/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const getFriends = async (userId) => {
    try {
        const response = await httpMain.get(`/friends/${userId}`);
        return response;
    } catch (error) {
        throw error;
    }
}

const checkIsFriend = async (userId, userIdFriend) => {
    try {
        const response = await httpMain.get(`http://localhost:3001/friends/follow/check?userId=${userId}&userIdFriend=${userIdFriend}`);
        return response;
    } catch (error) {
        throw error;
    }

}

const followUser = async (userId, userIdFriend) => {

    try {
        const response = await httpMain.post('http://localhost:3001/friends/follow', { userId, followingId: userIdFriend })
        return response;
    } catch (error) {
        throw error;
    }

}

const unfollowUser = async (userId, userIdFriend) => {
    try {
        const response = await httpMain.delete(userId, userIdFriend);
        return response;
    } catch (error) {
        throw error;
    }
}

const profileServices = {
    getUsers,
    getUser,
    getFriends,
    checkIsFriend,
    followUser,
    unfollowUser
}

export default profileServices;