import { Delete, Folder, Upload } from '@mui/icons-material'
import { Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { api } from '../../core/api'
import { useEffect, useState } from 'react'
import InputFiles from 'react-input-files'

const Select = ({selectedFiles, setSelectedFiles}) => {

    const [file, setFile] = useState('')

    const handleUploadFile = async () => {
        const formData = new FormData()
        formData.append('uploadfiles', selectedFiles?.map(i => i))

        console.log(selectedFiles?.map(i => i))

        axios.post(api.docs_upload, formData, {headers: {'Content-Type': 'multipart/form-data'}
        }).then(res => {
            setSelectedFiles([])
            console.log(res?.data)
        }).catch(er => {
            console.log(er)
        })
    }

    // useEffect(() => {console.log(selectedFiles)}, [selectedFiles])

    return (
        <Box sx={{borderBottom: '1px solid #2a2b32', }}>
            <Box sx={{height: '8rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', columnGap: '0.5rem'}}>
                <InputFiles multiple={true} onChange={(file) => {
                    setFile(file)
                    setSelectedFiles([...selectedFiles, file[0]])
                }}>
                    <Button variant='contained' sx={{background:'#202123', ':hover': {background: '#2a2b32'}}} startIcon={<Folder />}>Select Files</Button>
                </InputFiles>
                <Button onClick={handleUploadFile} variant='contained' sx={{background: '#202123', ':hover': {background: '#2a2b32'}}} startIcon={<Upload />}>Upload</Button>
                {/* <IconButton onClick={handleUploadFile} sx={{padding: '1rem', borderRadius: '0.25rem', ':hover': {background: '#40414f'}, background: '#2a2b32', color: '#6b6c7b'}}><Upload /></IconButton> */}
            </Box>
            {selectedFiles?.length && <Box sx={{height: 'auto', padding: '0.5rem', width: '30%', margin: '0 auto 2rem auto', borderRadius: '0.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', rowGap: '0.5rem', background: '#20212350', boxSizing: 'border-box'}}>
                {selectedFiles?.map((item, index) => {
                    console.log(item)
                    return(
                    <Stack width={'97%'} flexDirection='row' alignItems='center' columnGap={2} justifyContent='space-between' sx={{color: '#c9ccd3', padding: '0 0.5rem', borderRadius: '0.25rem', background: '#20212390', ':hover': {background: '#20212350'}}}>
                        <Box sx={{display: 'flex', columnGap: '1rem'}}>
                            <Typography>{index+1}</Typography>
                            <Typography>{item.name}</Typography>
                        </Box>
                        <IconButton onClick={(e) => {
                            setSelectedFiles(selectedFiles?.filter((i, ind) => ind !== index))
                        }}><Delete sx={{color: '#c9ccd3'}}/></IconButton>
                    </Stack>
                )})}
            </Box>}
        </Box>
    )
}

export default Select
