import { Cancel, Search, Send } from '@mui/icons-material'
import { Box, IconButton, Paper } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchAction } from '../../store/search'

const SearchInput = ({handleSend, loading}) => {

  const inputRef = useRef(null)
  const dispatch = useDispatch()
  const {question} = useSelector(state => state.search)

  useEffect(() => {
    if(!loading) inputRef.current.focus()
  }, [loading])

  return (
    <Box sx={{minHeight: '7rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Paper elevation={1} sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0 auto', width: {xs: '90%', lg: '50%'}, padding: '0.5rem 0.5rem', borderRadius: '0.3rem', boxSizing: 'border-box', background: '#40414f'}}>
            <input 
                autoFocus={true}
                value={question}
                onChange={(e) => {dispatch(searchAction.setQuestion(e.target.value))}}
                onKeyDown={(e) => {
                  if(e.key === 'Enter' && !loading) {handleSend()}
                }}
                aria-multiline
                type="text" 
                placeholder='Search In Files' 
                style={{
                    border: 'none', 
                    outline: 'none',
                    background: 'transparent', 
                    fontSize: '1rem', 
                    color: '#fff',
                    padding: '0.5rem',
                    boxSizing: 'border-box',
                    width: '100%'
                }}
                ref={inputRef}
            />
            <IconButton disabled={loading} onClick={handleSend} sx={{borderRadius: '0.5rem'}}><Search sx={{color: question !== '' ? '#fff' : '#6b6c7b'}}/></IconButton>            
        </Paper>
    </Box>
  )
}

export default SearchInput
