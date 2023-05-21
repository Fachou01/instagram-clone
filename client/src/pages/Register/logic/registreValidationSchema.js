import * as Yup from 'yup';

const validationSchema = Yup.object({
    email: Yup.string().required('Required').email('Invalid Email format'),
    fullName: Yup.string().required('Required'),
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
})

export default validationSchema;