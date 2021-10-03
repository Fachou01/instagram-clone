import React from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useHistory } from 'react-router'
import { useState } from 'react'

const Registre = () => {
  const history = useHistory()
  const [emailErr, setEmailErr] = useState(false)
  const [userNameErr, setUserNameErr] = useState(false)

  const initialValues = {
    email: '',
    fullName: '',
    username: '',
    password: '',
  }
  const onSubmit = async (values) => {
    const response = await axios.post('http://localhost:3001/adduser', {
      email: values.email,
      fullName: values.fullName,
      userName: values.username,
      picture: `https://avatars.dicebear.com/api/croodles/${values.username}.svg`,
      password: values.password,
    })
    console.log(response)
    console.log(response.data.message === 'email already used')
    if (response.data.message === 'email already used') {
      setEmailErr(true)
      setTimeout(() => {
        setEmailErr(false)
      }, 3500)
    }
    if (response.data.message === 'username already used') {
      setUserNameErr(true)
      setTimeout(() => {
        setUserNameErr(false)
      }, 3500)
    }
    if (response.status === 200) {
      history.push('/login')
    }
  }
  const validationSchema = Yup.object({
    email: Yup.string().required('Required').email('Invalid Email format'),
    fullName: Yup.string().required('Required'),
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
  })
  /*const validate =  (values) =>{
            let errors ={}
            if(!values.email){
                errors.email = 'Required'
            }
            if(!values.fullName){
                errors.fullName = 'Required'
            }
            if(!values.username){
                errors.username = 'Required'
            }
            if(!values.password){
                errors.password = 'Required'
            }
            return errors 
        } */
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    //validate,
  })
  return (
    <div className="mt-8 flex flex-col justify-center items-center ">
      <div className="flex flex-col justify-center items-center mt-4 shadow-2xl border-2 p-10 ">
        <div className="text-4xl">Instagram</div>
        <div>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col items-center justify-center p-5"
          >
            <div className="mb-6 w-64">
              <input
                type="text"
                id="email"
                name="email"
                className="shadow  w-full  appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-md"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="Email"
              />
              <div className=" text-red-600 text-sm ml-1">
                {formik.touched.email && formik.errors.email ? (
                  <div> {formik.errors.email} ! </div>
                ) : null}
                {emailErr ? <div> Email already used ! </div> : null}
              </div>
            </div>
            <div className="w-64 mb-6">
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="shadow  w-full  appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-md"
                onChange={formik.handleChange}
                value={formik.values.fullName}
                onBlur={formik.handleBlur}
                placeholder="Full name"
              />
              <div className=" text-red-600 text-sm ml-1">
                {formik.touched.fullName && formik.errors.fullName ? (
                  <div> {formik.errors.fullName} ! </div>
                ) : null}
              </div>
            </div>
            <div className="w-64 mb-6">
              <input
                type="text"
                id="username"
                name="username"
                className="shadow  w-full  appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-md"
                placeholder="Username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
              <div className=" text-red-600 text-sm ml-1">
                {formik.touched.username && formik.errors.username ? (
                  <div> {formik.errors.username} ! </div>
                ) : null}
                {userNameErr ? <div> Username already used ! </div> : null}
              </div>
            </div>
            <div className="w-64 mb-6">
              <input
                type="password"
                id="password"
                name="password"
                className="shadow  w-full  appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-md"
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
              />
              <div className=" text-red-600 text-sm ml-1">
                {formik.touched.password && formik.errors.password ? (
                  <div> {formik.errors.password} ! </div>
                ) : null}
              </div>
            </div>

            <div className="w-full">
              <input
                type="submit"
                value="Sign up"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded w-full cursor-pointer"
              />
            </div>
            <div className="mt-4 ">
              Have an account?{' '}
              <Link to="/login">
                <span className="text-blue-500 font-semibold cursor-pointer">
                  Sign in
                </span>{' '}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Registre
