import { Box, Button, Typography } from '@mui/material'
import axios from 'axios'
import Lottie from 'lottie-react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { api } from '../../core/api'
import { LoadingButton } from '@mui/lab'

// const LoadingAnimation = () => {
//     return(
//         <Box sx={{display: 'flex', justifyContent: 'center', boxSizing: 'border-box', background: {xs: '#40414f', lg: 'transparent'}}}>
//             <Box sx={{width: {xs: '90%', lg: '50%'}, boxSizing: 'border-box', background: {xs: 'inherit', lg: '#40414f'}, padding: {xs: '1rem 0rem', lg: '1rem'}, borderRadius: '0.3rem'}}>
//                 <Lottie style={{height: 20, width: 30}} autoPlay animationData={require('../../assets/loading-dots.json')} loop={true}/>
//             </Box>
//         </Box>
//     )
// }

const NotFound = ({message}) => {
    return(
        <Box sx={{padding: '1rem 0', background: '#40414f', width: {xs: '90%', lg: '50%'}, margin: '0 auto', boxSizing: 'border-box', borderRadius: '0.3rem', textAlign: 'center'}}>
            {message}
        </Box>
    )
}


const ChatList = ({loading}) => {

    const {response} = useSelector(state => state.prompt)

    const [saving, setSaving] = useState(false)

    const handleSavePrompt = async () => {
      if(response !== '') {
        setSaving(true)
        axios.post(api.set_prompt, {prompt: response}).then(res => {
          if(res?.status === 200) {
            setSaving(false)
          }
        }).catch(er => {
          console.log(er);
          setSaving(false)
        })
      }
    }  
  
    const AnswerBox = () => {
        return(
            <Box sx={{display: 'flex', justifyContent: 'center', boxSizing: 'border-box', background: {xs: '#40414f', lg: 'transparent'}}}>
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', gap: '1.5rem', color: '#c9ccd3', width: {xs: '90%', lg: '50%'}, boxSizing: 'border-box', background: {xs: 'inherit', lg: '#40414f'}, borderRadius: '0.3rem'}}>
                    {response === ''
                        ? <NotFound message={response}/>
                        :
                        <Box sx={{padding: {xs: '1rem 0rem', lg: '1rem 1rem 0.75rem 1rem'}, width: '100%', position: 'relative', boxSizing: 'border-box'}}>
                            <Typography sx={{whiteSpace: 'pre-line'}}>{response}</Typography>
                            <Box sx={{display: 'flex', flexDirection: {xs: 'column', lg: 'row'}, alignItem: 'center', justifyContent: 'flex-end', columnGap: '1rem', borderTop: '1px solid #787889', marginTop: '0.5rem', paddingTop: '0.5rem'}}>
                                <LoadingButton fullWidth={false} onClick={handleSavePrompt} loading={saving} size='small' fontSize='0.9rem' sx={{color: saving ? '#fff' : '#787889', bgcolor: '#2e2e38', ':hover':{bgcolor: '#202123'}, width: 'unset'}}>save</LoadingButton>
                            </Box>
                        </Box>
                    }
                </Box>
            </Box>
        )
    }

    return (
        <Box sx={{overflowY: 'scroll', minHeight: 'calc(100vh - 7rem)', paddingBottom: '3rem', scrollBehavior: 'smooth'}}>
            {response?.length !== 0 
                ? <AnswerBox />
                : <></>
            }
        </Box>
    )
}

export default ChatList
