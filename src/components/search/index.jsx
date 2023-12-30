import { Box } from '@mui/material'
import ChatList from './chat-list'
import SearchInput from './search-input'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {api} from '../../core/api'
import { useDispatch, useSelector } from 'react-redux'
import { searchAction } from '../../store/search'

const Search = () => {

  const dispatch = useDispatch()
  const {question} = useSelector(state => state.search)

  const [loading, setLoading] = useState(false)

  const handleSearchQuery = async () => {
    if(question !== '') {
      setLoading(true)
      axios.post(api.search, {query: question}).then(res => {
        if(res?.status === 200) {
          dispatch(searchAction.setAnswer(res?.data))
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
      <SearchInput handleSend={handleSearchQuery} loading={loading}/>
      <ChatList loading={loading}/>
    </Box>
  )
}

export default Search