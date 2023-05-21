import React from 'react'
import { Link } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import useLogin from './logic/useLogin'
import Button from '../../components/Button/Button';

const Login = () => {
  const { formik, loading, errorMsg } = useLogin();

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
              <Button loading={loading} type="submit" label="Log in" />
            </div>
            <div className="mt-8">
              Don't have an account?
              <Link to="/registre">
                <span className="text-red-600 font-semibold cursor-pointer ml-2">
                  Sign up
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
