import * as Yup from 'yup'

const validationSchema = Yup.object({
    email: Yup.string().required('Required').email('Invalid Email format'),
    password: Yup.string().required('Required'),
})

export default validationSchema;