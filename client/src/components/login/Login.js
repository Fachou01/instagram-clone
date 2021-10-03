import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useHistory } from 'react-router'
import Loader from 'react-loader-spinner'

const Login = () => {
  const [errorMsg, setErrorMsg] = useState(false)
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const initialValues = {
    email: '',
    password: '',
  }
  const onSubmit = async (values) => {
    const response = await axios.post('http://localhost:3001/login', {
      email: values.email,
      password: values.password,
    })
    if (response.status === 200) {
      setErrorMsg(false)
      localStorage.setItem('token', JSON.stringify(response.data.token))
      localStorage.setItem('id', JSON.stringify(response.data.id))
      localStorage.setItem('fullName', JSON.stringify(response.data.fullName))
      localStorage.setItem('userName', JSON.stringify(response.data.userName))
      localStorage.setItem('picture', JSON.stringify(response.data.picture))

      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        history.push('/main')
      }, 3000)
    } else if (response.status === 201) {
      setErrorMsg(true)
    }
  }
  const validationSchema = Yup.object({
    email: Yup.string().required('Required').email('Invalid Email format'),
    password: Yup.string().required('Required'),
  })
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    //validate,
  })
  return (
    <div className="mt-5 flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center mt-16 shadow-2xl border-2 p-10 ">
        <div className="text-4xl">Instagram</div>
        {errorMsg ? (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-5 rounded "
            role="alert"
          >
            <strong className="font-bold">Invalid ! </strong>
            <span className="block sm:inline">
              Email or Password are invalid !
            </span>
          </div>
        ) : null}
        <div className="mt-6 ">
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
              </div>
            </div>
            <div className="w-64">
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

            <div className="w-full mt-6">
              <input
                type="submit"
                value="Log in"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded w-full cursor-pointer "
              />
            </div>
            {loading ? (
              <div className="mt-5">
                <Loader type="Puff" color="#2563EB" height={35} width={35} />
              </div>
            ) : null}
            <div className="mt-8">
              Don't have an account?{' '}
              <Link to="/">
                <span className="text-blue-500 font-semibold cursor-pointer">
                  Sign up
                </span>{' '}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
