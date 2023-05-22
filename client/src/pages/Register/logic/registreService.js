import httpMain from "../../../utils/httpMain";

const signUp = async (email, fullName, userName, picture, password) => {
    try {
        const response = await httpMain.post('/users', {
            email,
            fullName,
            userName,
            picture,
            password
        })
        return response;
    } catch (error) {
        throw error;
    }
}

export {
    signUp
}
