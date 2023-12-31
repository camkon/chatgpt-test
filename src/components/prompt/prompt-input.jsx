import { Cancel, Save, Search, Send } from '@mui/icons-material'
import { Box, Button, IconButton, Paper } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { promptAction } from '../../store/prompt'
import { LoadingButton } from '@mui/lab'

const PromptInput = ({handleSend, loading}) => {

  const inputRef = useRef(null)
  const dispatch = useDispatch()
  const {prompt} = useSelector(state => state.prompt)

  useEffect(() => {
    if(!loading) inputRef.current.focus()
  }, [loading])

  return (
    <Box sx={{minHeight: '7rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
        <Paper elevation={1} sx={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', margin: '2rem auto 1rem auto', width: {xs: '90%', lg: '50%'}, padding: '0.5rem 0.5rem', borderRadius: '0.3rem', boxSizing: 'border-box', background: '#40414f'}}>
            <textarea 
                autoFocus={true}
                value={prompt}
                onChange={(e) => {dispatch(promptAction.setPrompt(e.target.value))}}
                aria-multiline
                type="text" 
                placeholder='Enter Prompt' 
                style={{
                    border: 'none', 
                    outline: 'none',
                    background: 'transparent', 
                    fontSize: '1rem', 
                    color: '#fff',
                    padding: '0.5rem',
                    boxSizing: 'border-box',
                    width: '100%',
                    resize: 'none',
                }}                
                ref={inputRef}
                rows={20}
            />
        </Paper>
        <Box sx={{width: {xs: '90%', lg: '50%'}, display: 'flex', justifyContent: 'flex-end'}}>
          <LoadingButton fullWidth={false} loading={loading} size='small' fontSize='0.9rem' sx={{color: loading ? '#fff' : '#787889', bgcolor: '#2e2e38', ':hover':{bgcolor: '#202123'}, width: 'unset'}}>save</LoadingButton>
        </Box>
    </Box>
  )
}

export default PromptInput
