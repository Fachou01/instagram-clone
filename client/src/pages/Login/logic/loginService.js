import httpMain from "../../../utils/httpMain";

const login = async (email, password) => {
    try {
        const response = await httpMain.post('/login', {
            email,
            password
        })
        return response;
    } catch (error) {
        throw error;
    }
}

export {
    login
}
