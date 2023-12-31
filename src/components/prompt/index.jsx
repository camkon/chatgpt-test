import { Box, Paper } from '@mui/material'
import ChatList from './chat-list'
import PromptInput from './prompt-input'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import {api} from '../../core/api'
import { useDispatch, useSelector } from 'react-redux'
import { promptAction } from '../../store/prompt'
import { LoadingButton } from '@mui/lab'

const Prompt = () => {

  const inputRef = useRef(null)
  const [prompt, setPrompt] = useState('')
  const [saving, setSaving] = useState(false)
  const {tab} = useSelector(state => state.prompt)

  const getPrompt = async () => {
      axios.post(api.get_prompt).then(res => {
        if(res?.status === 200) {
          setPrompt(res?.data)
        }
      }).catch(er => {
        console.log(er);
      })
  }

  useEffect(() => {
    if(tab === 'prompt') getPrompt()
  }, [tab])

  useEffect(() => {
    if(!saving) inputRef.current.focus()
  }, [saving])

  const handleSavePrompt = async () => {
    if(prompt !== '') {
      setSaving(true)
      axios.post(api.set_prompt, {prompt: prompt}).then(res => {
        if(res?.status === 200) {
          setSaving(false)
        }
      }).catch(er => {
        console.log(er);
        setSaving(false)
      })
    }
  }  

  return (
    <Box sx={{position: 'relative', minHeight: 'calc(100vh - 3.8rem)', overflowY: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
      <Box sx={{minHeight: '7rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
        <Paper elevation={1} sx={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', margin: '2rem auto 1rem auto', width: {xs: '90%', lg: '50%'}, padding: '0.5rem 0.5rem', borderRadius: '0.3rem', boxSizing: 'border-box', background: '#40414f'}}>
            <textarea 
                autoFocus={true}
                value={prompt}
                onChange={(e) => {setPrompt(e.target.value)}}
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
          <LoadingButton onClick={handleSavePrompt} fullWidth={false} loading={saving} size='small' fontSize='0.9rem' sx={{color: saving ? '#fff' : '#787889', bgcolor: '#2e2e38', ':hover':{bgcolor: '#202123'}, width: 'unset'}}>save</LoadingButton>
        </Box>
      </Box>
    </Box>
  )
}

export default Prompt