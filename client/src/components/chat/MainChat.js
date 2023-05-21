import React, { useEffect, useState, useRef } from 'react'
import Navbar from '../shared/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { faSmile } from '@fortawesome/free-regular-svg-icons'
import io from 'socket.io-client'
import axios from 'axios'
import Loader from 'react-loader-spinner'

let socket
const CONNECTION_PORT = 'http://localhost:5000'

const MainChat = () => {
  const messageRef = useRef(null)
  const userId = JSON.parse(localStorage.getItem('id'))
  const fullName = JSON.parse(localStorage.getItem('fullName'))
  const userName = JSON.parse(localStorage.getItem('userName'))
  const picture = JSON.parse(localStorage.getItem('picture'))
  const [loadingUsers, setLoadingUsers] = useState(false)
  const [loadingConversation, setLoadingConversation] = useState(false)
  const [message, setMessage] = useState('')
  const [activeConversation, setActiveConversation] = useState(false)
  const [users, setUsers] = useState([])
  const [chat, setChat] = useState('')
  const [conversationId, setConversationId] = useState('')
  const [sender, setSender] = useState(userName)
  const [receiver, setReceiver] = useState('')
  const [messageList, setMessageList] = useState([])

  const fetchingUsers = async () => {
    try {
      setLoadingUsers(true)
      const response = await axios.get('http://localhost:3001/users')
      setLoadingUsers(false)
      setUsers(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  const handleConversationData = async (id, userUserName, picture) => {
    setActiveConversation(true)
    try {
      const response1 = await axios.post(
        'http://localhost:3001/conversation',
        {
          user1Id: userId,
          user2Id: id,
        }
      )
      setConversationId(response1.data._id)
      if (response1.data.user1 !== userId) {
        setReceiver(response1.data.user1)
      } else {
        setReceiver(response1.data.user2)
      }
      setChat(response1.data._id)
      setLoadingConversation(true)
      const response = await axios.get(
        `http://localhost:3001/conversation/${response1.data._id}`
      )
      setLoadingConversation(false)
      setMessageList(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    //Fetching friends
    fetchingUsers()
    //Connection to socket
    socket = io(CONNECTION_PORT)
    socket.emit('registre', userId)
  }, [])
  const sendMessage = async (e) => {
    e.preventDefault()
    if (messageRef.current.value !== '') {
      const messageContent = {
        conversationId: chat,
        senderId: { _id: userId, userPicture: picture },
        receiverId: receiver,
        text: message,
      }
      messageRef.current.value = ''
      setMessage('')
      await socket.emit('send_message', messageContent)
      setMessageList([...messageList, messageContent])
      try {
        const response = await axios.post('http://localhost:3001/messages', {
          conversationId: conversationId,
          senderId: userId,
          text: messageContent.text,
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
  useEffect(() => {
    socket.on('receive_message', (data) => {

      setSender(data.senderName)
      if (data.senderId._id === receiver) {
        setMessageList([...messageList, data])
      }
    })
  })
  return (
    <div>
      <Navbar currentHome="false" currentProfile="false" currentChat="true" />
      <div className="grid grid-cols-5 h-96 mt-10 border-2 border-gray-200 rounded-md  ">
        <div className="col-span-2 border-r-2 border-gray-200 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-100  ">
          {loadingUsers === false ? (
            <div className="flex flex-col ">
              <div className="flex justify-center pt-3 mb-2 border-b-2 border-gray-200 pb-3">
                <div className="font-semibold">{userName}</div>
                <hr />
              </div>
              {users.map((user) => {
                return (
                  <div
                    className="flex  items-center p-2  cursor-pointer hover:bg-gray-200 transition duration-200 ease-in-out"
                    key={user._id}
                    onClick={() =>
                      handleConversationData(
                        user._id,
                        user.userName,
                        user.userPicture
                      )
                    }
                  >
                    <div className="flex items-center ml-10">
                      <div>
                        <img
                          src={user.userPicture}
                          width="50"
                          className="rounded-full flex-grow-0"
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-xs mt-1  cursor-pointer">
                          {user.userName}
                        </p>
                        <p className="text-xs  text-gray-500 font-light">
                          {/*Liked your message ! 1 day*/}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="flex justify-center items-center mt-20 ">
              <Loader type="Oval" color="#D0312D" height={45} width={45} />
            </div>
          )}
        </div>
        <div className="col-span-3 flex flex-col justify-between relative z-10   ">
          <div className="flex flex-col justify-center overflow-y-scroll max-h-80   mt-3 ">
            {!activeConversation ? (
              <div className="flex flex-col items-center mt-16">
                <div className="rounded-3xl border-2 border-black p-3 ">
                  <FontAwesomeIcon icon={faPaperPlane} className="text-4xl  " />
                </div>
                <div className="mt-5 font-semibold">Your messages</div>
                <div className="mt-2">Send your messages to your friends</div>
              </div>
            ) : loadingConversation === true ? (
              <div className="flex justify-center items-center mt-20 ">
                <Loader type="Oval" color="#D0312D" height={45} width={45} />
              </div>
            ) : (
              <React.Fragment>
                {messageList.map((msg, key) => {
                  if (msg.senderId._id === userId) {
                    return (
                      <div className="flex items-center ml-5 mb-3" key={key}>
                        <div>
                          <img
                            src={msg.senderId.userPicture}
                            width="50"
                            className="rounded-full flex-grow-0"
                            alt=""
                          />
                        </div>
                        <div className="ml-1">
                          {/*<p className="text-xs mt-1  cursor-pointer">issam_koumenji</p>*/}

                          <div className="  bg-red-500 rounded-xl p-2 text-white break-words max-w-xs  ">
                            {msg.text}
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
                        <div className="ml-1 ">
                          {/*<p className="text-xs mt-1  cursor-pointer">issam_koumenji</p>*/}

                          <div className="  bg-gray-200 rounded-xl p-2 break-words max-w-xs ">
                            {msg.text}
                          </div>
                        </div>
                        <div>
                          <img
                            src={msg.senderId.userPicture}
                            width="50"
                            className="rounded-full flex-grow-0"
                            alt=""
                          />
                        </div>
                      </div>
                    )
                  }
                })}
              </React.Fragment>
            )}
          </div>
          {activeConversation ? (
            <form onSubmit={(e) => sendMessage(e)}>
              <div className="flex justify-between absolute bg-gray-100 z-20 bottom-0 w-full items-center p-3 mt-3 border-t-2 border-gray-200 rounded-lg ">
                <div className="flex gap-3">
                  <FontAwesomeIcon
                    icon={faSmile}
                    className="text-2xl cursor-pointer text-black "
                  />
                  <input
                    ref={messageRef}
                    type="text"
                    placeholder="Your message..."
                    className="border-0 focus:outline-none text-sm "
                    onChange={(e) => setMessage(e.target.value)}
                  ></input>
                </div>
                <div>
                  <button
                    type="submit"
                    className=" cursor-pointer text-sm font-semibold"
                  >
                    <div className="rounded-3xl border-2 border-black p-1 hover:border-red-600 ">
                      <FontAwesomeIcon
                        icon={faPaperPlane}
                        className="text-lg  "
                      />
                    </div>
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="hidden"> </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MainChat
