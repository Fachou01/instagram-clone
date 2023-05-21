import React from 'react';
// import Stories from './Stories';
import Posts from './components/Posts/Posts';
import { useState } from 'react';
// import Suggestion from './Suggestion'
import { Link } from 'react-router-dom';
import Navbar from '../../components/shared/Navbar';

const Main = () => {
  const fullName = JSON.parse(localStorage.getItem('fullName'));
  const userName = JSON.parse(localStorage.getItem('userName'));
  const picture = JSON.parse(localStorage.getItem('picture'));
  const [feed, setFeed] = useState(true);

  return (
    <>
      <Navbar currentHome="true" currentProfile="false" currentChat="false" />
      <div className="flex justify-between mt-8 w-full gap-6 ">
        <div className="w-full md:w-7/12 lg:w-6/12">
          <ul className="flex">
            {feed === true ? (
              <>
                <li className="flex-1 mr-2" onClick={() => setFeed(true)}>
                  <div className="cursor-pointer text-center block border border-red-600 rounded py-2 px-4 bg-red-600 hover:bg-red-700 text-white">
                    Feed
                  </div>
                </li>
                <li className="flex-1" onClick={() => setFeed(false)}>
                  <div className="cursor-pointer text-center block border border-white rounded hover:border-gray-200 text-red-600 bg-gray-200 py-2 px-4">
                    Friends Feed
                  </div>
                </li>
              </>
            ) : (
              <>
                <li className="flex-1 mr-2" onClick={() => setFeed(true)}>
                  <div className="cursor-pointer text-center block border border-white rounded hover:border-gray-200 text-red-600 bg-gray-200 py-2 px-4">
                    Feed
                  </div>
                </li>
                <li className="flex-1" onClick={() => setFeed(false)}>
                  <div className="cursor-pointer text-center block border border-red-600 rounded py-2 px-4 bg-red-600 hover:bg-red-700 text-white">
                    Friends Feed
                  </div>
                </li>
              </>
            )}
          </ul>

          {/*Posts section*/}

          <Posts isFeed={feed} />

        </div>

        {/*User informations section*/}
        <div className="hidden md:block lg:block md:w-5/12 lg:w-5/12">
          <div className="flex flex-col gap-2 p-5 border-2 border-black-100 rounded-lg">
            <div className="flex justify-between items-center">
              <Link to={`/profile/${userName}`}>
                <div className="flex">
                  <div>
                    <img
                      src={picture}
                      width="58"
                      className="rounded-full flex-grow-0"
                      alt=""
                    />
                  </div>

                  <div className="ml-3">

                    <p className="text-xs mt-1 font-medium cursor-pointer">
                      {userName}
                    </p>

                    <p className="text-xs mt-1 text-gray-600 font-medium">
                      {fullName}
                    </p>
                  </div>
                </div>
              </Link>
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
    </>
  )
}

export default Main
