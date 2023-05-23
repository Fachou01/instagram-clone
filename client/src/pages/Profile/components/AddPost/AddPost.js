import React, { useState } from 'react';
import postService from '../../../Main/components/Posts/components/Post/logic/postService';
import Modal from '../../../../components/shared/Modal';

const AddPost = ({ showModal, setShowModal, handleShowModal, fetchPosts }) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const id = JSON.parse(localStorage.getItem('id'));
      const response = await postService.addPost(id, title, image, description);
      if (response.status === 201) {
        setTitle('');
        setImage('');
        setDescription('');
        setShowModal(false);
        fetchPosts();
      }
      else {
        throw new Error("Error occured in adding post");
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal showModal={showModal} handleShowModal={handleShowModal} title={"Add a new post"}>
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
