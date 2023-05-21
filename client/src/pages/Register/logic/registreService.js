import axios from "axios"

const signUp = async (email, fullName, userName, picture, password) => {
    try {
        const response = await axios.post('http://localhost:3001/users', {
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
