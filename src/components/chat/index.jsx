import { Box } from '@mui/material'
import ChatList from './chat-list'
import ChatInput from './input'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {api} from '../../core/api'
import { useDispatch, useSelector } from 'react-redux'
import { chatAction } from '../../store/chat'
import { v4 as uuidv4} from 'uuid'

const Chat = () => {

  const dispatch = useDispatch()
  const chat = useSelector(state => state.chat.list)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSendChat = async () => {
    if(input !== '') {
      let id = uuidv4()
      setLoading(true)
      dispatch(chatAction.setChatQuestion({id: id, question: input}))
      axios.post(api.chat, {query: input}, {headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'X-API-Key': '5b8e7e84-7011-4c47-a5f2-d02ab153de29'}}).then(res => {
        if(res?.status === 200) {
          dispatch(chatAction.setChatAnswer([id, res?.data]))
          setLoading(false)
        }
      }).catch(er => {
        console.log(er);
        dispatch(chatAction.setChatError([id, er?.data])) 
        setLoading(false)
      })
      setInput('')
    }
  }

  return (
    <Box sx={{position: 'relative', height: 'calc(100vh - 3.8rem)', overflowY: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
      <ChatList chat={chat} loading={loading}/>
      <ChatInput value={input} setValue={setInput} handleSend={handleSendChat} loading={loading}/>
    </Box>
  )
}

export default Chat