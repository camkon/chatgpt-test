import { Box } from '@mui/material'
import ChatList from './chat-list'
import PromptInput from './prompt-input'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {api} from '../../core/api'
import { useDispatch, useSelector } from 'react-redux'
import { promptAction } from '../../store/prompt'

const Prompt = () => {

  const dispatch = useDispatch()
  const {prompt} = useSelector(state => state.prompt)

  const [loading, setLoading] = useState(false)

  const handleSearchQuery = async () => {
    if(prompt !== '') {
      setLoading(true)
      axios.post(api.get_prompt, {query: prompt}).then(res => {
        if(res?.status === 200) {
          dispatch(promptAction.setResponse(res?.data))
          setLoading(false)
        }
      }).catch(er => {
        console.log(er);
        setLoading(false)
      })
    }
  }

  return (
    <Box sx={{position: 'relative', minHeight: 'calc(100vh - 3.8rem)', overflowY: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
      <PromptInput handleSend={handleSearchQuery} loading={loading}/>
      <ChatList loading={loading}/>
    </Box>
  )
}

export default Prompt