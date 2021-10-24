import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { faSmile } from '@fortawesome/free-regular-svg-icons'
import io from 'socket.io-client'
import axios from 'axios'

let socket
const CONNECTION_PORT = 'http://localhost:5000'

const MainChat = () => {
  const userId = JSON.parse(localStorage.getItem('id'))
  const fullName = JSON.parse(localStorage.getItem('fullName'))
  const userName = JSON.parse(localStorage.getItem('userName'))
  const picture = JSON.parse(localStorage.getItem('picture'))
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
      const response = await axios.get('http://localhost:3001/getusersgroup')
      setUsers(response.data)
      //console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  const handleConversationData = async (id, userUserName, picture) => {
    setActiveConversation(true)
    try {
      const response = await axios.post(
        'http://localhost:3001/addconversation',
        {
          user1Id: userId,
          user2Id: id,
        }
      )
      console.log(response)
      setConversationId(response.data._id)
      console.log(conversationId)
      if (response.data.user1 !== userId) {
        setReceiver(response.data.user1)
      } else {
        setReceiver(response.data.user2)
      }
      setChat(response.data._id)
      //console.log(conversationId)
    } catch (error) {
      console.log(error)
    }
    try {
      const response = await axios.get(
        `http://localhost:3001/getconversation/${conversationId}`
      )
      setMessageList(response.data)
      //console.log(messageList)
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
    //socket.emit('connection', userName)
  }, [])
  const sendMessage = async () => {
    const messageContent = {
      conversationId: chat,
      senderId: userId,
      receiverId: receiver,
      text: message,
    }
    await socket.emit('send_message', messageContent)
    setMessageList([...messageList, messageContent])
    try {
      const response = await axios.post('http://localhost:3001/addmessage', {
        conversationId: conversationId,
        senderId: userId,
        text: messageContent.text,
      })
      //console.log(response)
    } catch (error) {
      console.log(error)
    }
    setMessage('')
  }
  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log(data)
      setSender(data.senderName)
      if (data.senderId === receiver) {
        setMessageList([...messageList, data])
      }
    })
  })
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-5 h-96 mt-10 border-2 border-gray-200 rounded-md  ">
        <div className="col-span-2 border-r-2 border-gray-200 overflow-y-scroll  ">
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
        </div>
        <div className="col-span-3 flex flex-col justify-between   ">
          <div className="flex flex-col justify-center  mt-7 ">
            {!activeConversation ? (
              <div className="flex flex-col items-center mt-16">
                <div className="rounded-3xl border-2 border-black p-3 ">
                  <FontAwesomeIcon icon={faPaperPlane} className="text-4xl  " />
                </div>
                <div className="mt-5 font-semibold">Your messages</div>
                <div className="mt-2">Send your messages to your friends</div>
              </div>
            ) : (
              <React.Fragment>
                {messageList.map((msg, key) => {
                  if (msg.senderId === userId) {
                    return (
                      <div className="flex items-center ml-5 mb-3" key={key}>
                        <div>
                          <img
                            //src={msg.senderPicture}
                            width="50"
                            className="rounded-full flex-grow-0"
                            alt=""
                          />
                        </div>
                        <div className="ml-1">
                          {/*<p className="text-xs mt-1  cursor-pointer">issam_koumenji</p>*/}

                          <div className="  bg-red-500 rounded-xl p-2 text-white  ">
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
                        <div>
                          <img
                            //src={msg.senderPicture}
                            width="50"
                            className="rounded-full flex-grow-0"
                            alt=""
                          />
                        </div>
                        <div className="ml-1">
                          {/*<p className="text-xs mt-1  cursor-pointer">issam_koumenji</p>*/}

                          <div className="  bg-gray-200 rounded-xl p-2 ">
                            {msg.text}
                          </div>
                        </div>
                      </div>
                    )
                  }
                })}
              </React.Fragment>
            )}
          </div>
          {activeConversation ? (
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
                    <FontAwesomeIcon
                      icon={faPaperPlane}
                      className="text-lg  "
                    />
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <div className="hidden"> </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MainChat
