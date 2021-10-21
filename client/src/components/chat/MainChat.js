import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { faSmile } from '@fortawesome/free-regular-svg-icons'
import io from 'socket.io-client'

let socket
const CONNECTION_PORT = 'http://localhost:5000'

const MainChat = () => {
  const fullName = JSON.parse(localStorage.getItem('fullName'))
  const userName = JSON.parse(localStorage.getItem('userName'))
  const picture = JSON.parse(localStorage.getItem('picture'))
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState('Room1')
  const [sender, setSender] = useState(userName)
  const [messageList, setMessageList] = useState([])

  useEffect(() => {
    socket = io(CONNECTION_PORT)
    socket.emit('join_chat', chat)
    //socket.emit('connection', userName)
  }, [])
  const sendMessage = async () => {
    const messageContent = {
      senderName: userName,
      senderPicture: picture,
      room: chat,
      content: message,
    }
    await socket.emit('send_message', messageContent)
    setMessageList([...messageList, messageContent])
    setMessage('')
  }
  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log(data)
      setSender(data.senderName)
      setMessageList([...messageList, data])
    })
  })
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-5 h-96 mt-10 border-2 border-gray-200 rounded-md  ">
        <div className="col-span-2 border-r-2 border-gray-200 ">
          {/*<div className="flex flex-col">
            <div className="flex justify-center pt-3 mb-2 border-b-2 border-gray-200 pb-3">
              <div className="font-semibold">mohamed_koumenji</div>
              <hr />
            </div>
            <div className="flex  items-center p-2  cursor-pointer hover:bg-gray-200 transition duration-200 ease-in-out">
              <div className="flex items-center ml-10">
                <div>
                  <img
                    src="https://randomuser.me/api/portraits/men/90.jpg"
                    width="50"
                    className="rounded-full flex-grow-0"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <p className="text-xs mt-1  cursor-pointer">issam_koumenji</p>
                  <p className="text-xs  text-gray-500 font-light">
                    Liked your message ! 1 day
                  </p>
                </div>
              </div>
            </div>
            <div className="flex  items-center p-2  cursor-pointer hover:bg-gray-200 transition duration-200 ease-in-out">
              <div className="flex items-center ml-10">
                <div>
                  <img
                    src={'https://randomuser.me/api/portraits/men/90.jpg'}
                    width="50"
                    className="rounded-full flex-grow-0"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <p className="text-xs mt-1  cursor-pointer">issam_koumenji</p>
                  <p className="text-xs  text-gray-500 font-light">
                    Liked your message ! 1 day
                  </p>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <div className="col-span-3 flex flex-col justify-between   ">
          <div className="flex flex-col justify-center  mt-7 ">
            {/*<div className="rounded-3xl border-2 border-black p-3 ">
              <FontAwesomeIcon icon={faPaperPlane} className="text-4xl  " />
            </div>
            <div className="mt-5 font-semibold">Your messages</div>
            <div className="mt-2">Send your messages to your friends</div>*/}
            {messageList.map((msg, key) => {
              if (msg.senderName === userName) {
                return (
                  <div className="flex items-center ml-5 mb-3" key={key}>
                    <div>
                      <img
                        src={msg.senderPicture}
                        width="50"
                        className="rounded-full flex-grow-0"
                        alt=""
                      />
                    </div>
                    <div className="ml-1">
                      {/*<p className="text-xs mt-1  cursor-pointer">issam_koumenji</p>*/}

                      <div className="  bg-red-500 rounded-xl p-2 text-white  ">
                        {msg.content}
                      </div>
                    </div>
                  </div>
                )
              } else {
                return (
                  <div
                    className="flex items-center justify-end ml-5 mb-3 mr-5"
                    key={key}
                  >
                    <div>
                      <img
                        src={msg.senderPicture}
                        width="50"
                        className="rounded-full flex-grow-0"
                        alt=""
                      />
                    </div>
                    <div className="ml-1">
                      {/*<p className="text-xs mt-1  cursor-pointer">issam_koumenji</p>*/}

                      <div className="  bg-gray-200 rounded-xl p-2 ">
                        {msg.content}
                      </div>
                    </div>
                  </div>
                )
              }
            })}
          </div>
          <div className="flex justify-between items-center p-3 mt-3 border-2 rounded-lg border-black-100">
            <div className="flex gap-3">
              <FontAwesomeIcon
                icon={faSmile}
                className="text-2xl cursor-pointer text-black "
              />
              <input
                type="text"
                placeholder="Your message..."
                className="border-0 focus:outline-none text-sm"
                onChange={(e) => setMessage(e.target.value)}
              ></input>
            </div>
            <div onClick={sendMessage}>
              <button
                type="submit"
                className=" cursor-pointer text-sm font-semibold"
              >
                <div className="rounded-3xl border-2 border-black p-1 hover:border-red-600 ">
                  <FontAwesomeIcon icon={faPaperPlane} className="text-lg  " />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainChat
