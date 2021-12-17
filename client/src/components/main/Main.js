import React from 'react'
import Stories from './Stories'
import Item from './Item'
import { useEffect, useState } from 'react'
import Suggestion from './Suggestion'
import { Link } from 'react-router-dom'

const Main = () => {
  const fullName = JSON.parse(localStorage.getItem('fullName'))
  const userName = JSON.parse(localStorage.getItem('userName'))
  const picture = JSON.parse(localStorage.getItem('picture'))
  const [feed, setFeed] = useState(true)

  return (
    <div className="mt-8 lg:grid grid-cols-3 gap-6 ">
      <div className="col-span-2">
        <ul className="flex">
          {feed === true ? (
            <React.Fragment>
              <li className="flex-1 mr-2" onClick={() => setFeed(true)}>
                <div className="cursor-pointer text-center block border border-red-500 rounded py-2 px-4 bg-red-500 hover:bg-red-600 text-white">
                  Feed
                </div>
              </li>
              <li className="flex-1 mr-2" onClick={() => setFeed(false)}>
                <div className="cursor-pointer text-center block border border-white rounded hover:border-gray-200 text-red-500 bg-gray-200 py-2 px-4">
                  Friends Feed
                </div>
              </li>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <li className="flex-1 mr-2" onClick={() => setFeed(true)}>
                <div className="cursor-pointer text-center block border border-white rounded hover:border-gray-200 text-red-500 bg-gray-200 py-2 px-4">
                  Feed
                </div>
              </li>
              <li className="flex-1 mr-2" onClick={() => setFeed(false)}>
                <div className="cursor-pointer text-center block border border-red-500 rounded py-2 px-4 bg-red-500 hover:bg-red-600 text-white">
                  Friends Feed
                </div>
              </li>
            </React.Fragment>
          )}
        </ul>
        {feed === true ? <Item isFeed="true" /> : <Item isFeed="false" />}
      </div>

      <div className="col-span-1 lg:flex flex-col hidden  ">
        <div className="flex flex-col gap-2 p-5 border-2 border-black-100 rounded-lg">
          <div className="flex justify-between items-center">
            <div className="flex">
              <Link to="/profile">
                <div>
                  <img
                    src={picture}
                    width="58"
                    className="rounded-full flex-grow-0"
                    alt=""
                  />
                </div>
              </Link>
              <div className="ml-3">
                <Link to="/profile">
                  <p className="text-xs mt-1 font-medium cursor-pointer">
                    {userName}
                  </p>
                </Link>
                <p className="text-xs mt-1 text-gray-600 font-medium">
                  {fullName}
                </p>
              </div>
            </div>
            <div>
              <p className="text-blue-600 text-sm cursor-pointer font-semibold">
                Switch
              </p>
            </div>
          </div>

          <div className="flex justify-between mt-3 items-center ">
            <div className="text-gray-500 font-semibold">
              Suggestions For You
            </div>
            <div className="text-gray-500 cursor-pointer">See all</div>
          </div>
          {/*<div>
            <Suggestion />
            <Suggestion />
            <Suggestion />
            <Suggestion />
            <Suggestion />
          </div>*/}
        </div>
      </div>
    </div>
  )
}

export default Main
