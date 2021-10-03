import React from 'react'

const Suggestion = () => {
  return (
    <div className="flex justify-between items-center mt-3">
      <div className="flex items-center">
        <div>
          <img
            src="https://randomuser.me/api/portraits/men/90.jpg"
            width="38"
            className="rounded-full flex-grow-0"
            alt=""
          />
        </div>
        <div className="ml-3">
          <p className="text-xs mt-1 font-semibold cursor-pointer">
            alex_sanchez
          </p>
          <p className="text-xs mt-1 text-gray-500 font-light">
            Followed by john_smilga
          </p>
        </div>
      </div>
      <div>
        <p className="text-blue-600 text-sm cursor-pointer font-semibold">
          Follow
        </p>
      </div>
    </div>
  )
}

export default Suggestion
