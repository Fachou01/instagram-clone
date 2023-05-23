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
        const response = await httpMain.get(`/friends/follow/check?userId=${userId}&userIdFriend=${userIdFriend}`);
        return response;
    } catch (error) {
        throw error;
    }

}

const followUser = async (userId, userIdFriend) => {

    try {
        const response = await httpMain.post('/friends/follow', { userId, followingId: userIdFriend })
        return response;
    } catch (error) {
        throw error;
    }

}

const unfollowUser = async (userId, userIdFriend) => {
    try {
        const response = await httpMain.delete('/friends/follow',userId, userIdFriend);
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