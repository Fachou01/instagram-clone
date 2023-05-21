import { useState } from "react"
import validationSchema from "./loginValidationSchema"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { useFormik } from "formik";
import axios from "axios";

const useLogin = () => {

    const [errorMsg, setErrorMsg] = useState(false);
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const initialValues = {
        email: '',
        password: '',
    }

    const onSubmit = async (values) => {
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:3001/login', {
                email: values.email,
                password: values.password,
            })
            if (response.status === 200) {
                setErrorMsg(false)
                localStorage.setItem('token', JSON.stringify(response.data.token));
                localStorage.setItem('id', JSON.stringify(response.data.id));
                localStorage.setItem('fullName', JSON.stringify(response.data.fullName));
                localStorage.setItem('userName', JSON.stringify(response.data.userName));
                localStorage.setItem('picture', JSON.stringify(response.data.picture));
                history.push('/main');

            } else if (response.status === 201) {
                setErrorMsg(true);
            }

        } catch (error) {
            setErrorMsg(true);
            console.log(error);
        } finally {
            setLoading(false);
        }

    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
    })

    return {
        formik,
        loading,
        errorMsg
    }
}

export default useLogin