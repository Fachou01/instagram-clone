import { useFormik } from "formik";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import validationSchema from './registreValidationSchema';
import { useState } from "react";
import { signUp } from "./registreService";

const useRegistre = () => {

    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    const [userNameErr, setUserNameErr] = useState(false);

    const initialValues = {
        email: '',
        fullName: '',
        username: '',
        password: '',
    }

    const onSubmit = async (values) => {
        try {
            setLoading(true);
            const { email, fullName, username: userName, password } = values;
            const picture = `https://avatars.dicebear.com/api/croodles/${userName}.svg`;
            const response = await signUp(email, fullName, userName, picture, password);
            if (response.data.message === 'email already used') {
                setEmailErr(true);
                setTimeout(() => {
                    setEmailErr(false);
                }, 3500)
            }
            if (response.data.message === 'username already used') {
                setUserNameErr(true);
                setTimeout(() => {
                    setUserNameErr(false);
                }, 3500)
            }
            if (response.status === 200) {
                history.push('/');
            }
        } catch (error) {
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
        emailErr,
        userNameErr
    }

}
export default useRegistre