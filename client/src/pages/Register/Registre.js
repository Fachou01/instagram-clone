import React from 'react'
import { Link } from 'react-router-dom'
import useRegistre from './logic/useRegistre';
import Button from '../../components/Button/Button';

const Registre = () => {

  const { formik, loading, emailErr, userNameErr } = useRegistre();

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
                <Button label="Sign up" loading={loading} type="submit" />
            </div>
            <div className="mt-4">
              Have an account?
              <Link to="/">
                <span className="text-red-600 font-semibold cursor-pointer ml-2">
                  Sign in
                </span>{''}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Registre
