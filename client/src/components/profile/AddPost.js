import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import Modal from '../shared/Modal'

const AddPost = ({showModal, setShowModal, handleShowModal}) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('')
 
  // const handleDiscard = (e) => {
  //   e.preventDefault()
  //   if (displayCard === true) setDisplayCard(false)
  //   else setDisplayCard(true)
  // }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const id = JSON.parse(localStorage.getItem('id'))
    try {
      const response = await axios.post('http://localhost:3001/posts', {
        id: id,
        title: title,
        image: image,
        description: description,
      })
      console.log(response);
      setShowModal(!showModal)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Modal showModal={showModal} handleShowModal={handleShowModal} title={"Add a new post"}>
    {/* <div className={!displayCard ? 'hidden' : 'flex'}>
      <div className="w-2/4 h-5/6  inset-32  absolute rounded-lg  bg-white shadow-2xl border-2 border-red-600 mx-auto ">
        <div className="flex flex-col justify-center items-center px-8 pt-6 pb-8 mb-4"> */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Title
            </label>
              <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            <div>
            <label
              htmlFor="imageUrl"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Image Url
            </label>
              <input
                type="text"
                onChange={(e) => setImage(e.target.value)}
                placeholder="Picture URL"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            <div>
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Description
            </label>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                id="imageDesc"
                name="description"
                placeholder="Add a desctiption"
                rows="4" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              ></textarea>
            </div>
            <div className='flex justify-end items-center'>
              <button
                type="submit"
                className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"

              >
                Add Post
              </button>
              <button
                onClick={handleShowModal}
                className="ml-3 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-red-600 border-red-600 hover:border-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"

              >
                Discard
              </button>
            </div>
          </form>
    </Modal>
  )
}

export default AddPost
