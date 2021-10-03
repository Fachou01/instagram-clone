import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const AddPost = () => {
  const [displayCard, setDisplayCard] = useState(true)
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const handleDiscard = (e) => {
    e.preventDefault()
    if (displayCard === true) setDisplayCard(false)
    else setDisplayCard(true)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const id = JSON.parse(localStorage.getItem('id'))
    try {
      const resp = await axios.post('http://localhost:3001/profile/addpost', {
        id: id,
        title: title,
        image: image,
        description: description,
      })
      console.log(resp)
      setDisplayCard(!displayCard)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className={!displayCard ? 'hidden' : 'flex'}>
      <div className="w-2/4 h-5/6  inset-32  absolute rounded-lg  bg-white shadow-2xl border-2 border-red-600 mx-auto ">
        <div className="flex flex-col justify-center items-center px-8 pt-6 pb-8 mb-4">
          <form className="w-9/12" onSubmit={handleSubmit}>
            <div className="flex items-center mb-12">
              <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="shadow hidden sm:flex w-full  appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-md "
              />
            </div>
            <div className="flex items-center mb-12 w-full">
              <input
                type="text"
                onChange={(e) => setImage(e.target.value)}
                placeholder="Picture URL"
                className="shadow hidden sm:flex w-full  appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-md "
              />
            </div>
            <div className="flex items-center mb-12">
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                id="tx1"
                name="description"
                placeholder="Add a desctiption"
                className="w-full h-40 shadow hidden sm:flex   appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-md"
              ></textarea>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="rounded-lg border-2 px-6 py-2 border-red-600 "
              >
                Add Post
              </button>
              <button
                onClick={(e) => handleDiscard(e)}
                className="ml-3 rounded-lg border-2 px-6 py-2 border-red-600"
              >
                {' '}
                Discard
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddPost
