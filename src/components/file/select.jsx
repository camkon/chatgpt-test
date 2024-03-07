import { useEffect, useState } from 'react'
import axios from 'axios'
import { api } from '../../core/api'
import { Box, Button, Grid, IconButton, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Delete, Folder, Upload } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { filesAction } from '../../store/files'
import { toast } from 'react-hot-toast'
import { ErrorToast, SuccessToast } from '../alert/toaster'


const Select = () => {

    const dispatch = useDispatch()
    const selectedFiles = useSelector(state => state.files.selectedFiles)  

    const [uploading, setUploading] = useState(false)

    const handleLoadFilesList = async () => {
		const data = JSON.stringify({
			search_text: '',
			page: 0
		})

        axios.post(api.docs_list, data, {headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'X-API-Key': '5b8e7e84-7011-4c47-a5f2-d02ab153de29'}}).then(res => {
			if(res.status === 200) {
				dispatch(filesAction.setList(res?.data?.fileslist))
			}
		})
    }

    const handleUploadFile = async () => {
        setUploading(true)
        const formData = new FormData();
        var fileIndex = 0
        while(fileIndex < selectedFiles.length) {
            formData.append('uploadfiles', selectedFiles[fileIndex]);
            fileIndex++
        }

        axios.post(api.docs_upload, formData, {headers: {'Accept': 'multipart/form-data', 'Content-Type': 'multipart/form-data', 'X-API-Key': '5b8e7e84-7011-4c47-a5f2-d02ab153de29'}}
        ).then(res => {
            if(res?.status === 200) {
                dispatch(filesAction.setSelctedFiles([]))
                handleLoadFilesList()
                toast((t) => <SuccessToast msg={'Files Uploaded'} id={t.id}/>)
            }
            setUploading(false)
        }).catch(er => {
            toast((t) => <ErrorToast msg={er?.data?.message ?? 'Try Again'} id={t.id}/>)
            setUploading(false)
        })
    }

    const handleSelectFiles = (e) => {
        dispatch(filesAction.setSelctedFiles([...selectedFiles, ...e.target.files]))
    }

    return (
        <Box sx={{borderBottom: '1px solid #2a2b32'}}>
            <Box sx={{padding: '2rem 0', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', columnGap: '0.5rem'}}>
                <input 
                    type="file"
                    id="upload-files-button" 
                    onChange={handleSelectFiles}
                    hidden
                    multiple
                    accept='.csv, .pdf'
                />
                <label htmlFor='upload-files-button'>
                    <Button component='span' variant='contained' sx={{background:'#202123', ':hover': {background: '#2a2b32'}}} startIcon={<Folder />}>Select Files</Button>
                </label>
            </Box>

            {selectedFiles?.length !== 0 && <Box sx={{height: 'auto', padding: '0.5rem', width: {xs: '90%', lg: '40%'}, margin: '0 auto 2rem auto', borderRadius: '0.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', rowGap: '0.5rem', background: '#20212350', boxSizing: 'border-box'}}>
                {selectedFiles?.map((item, index) => {
                    return(
                    <Grid container sx={{justifyContent: 'space-between', alignItems: 'center', color: '#c9ccd3', padding: '0 0.5rem', margin: '0 0.5rem', borderRadius: '0.25rem', background: '#20212390', ':hover': {background: '#20212350'}, width: '100%'}}>
                        <Grid item xs={0}><Typography>{index+1}</Typography></Grid>
                        <Grid item xs={10}><Typography sx={{overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{item.name}</Typography></Grid>
                        
                        <Grid item xs={0}>
                            <IconButton sx={{borderRadius: '0.25rem'}} onClick={(e) => {
                                dispatch(filesAction.removeSelectedFiles(index))
                            }}><Delete sx={{color: '#c9ccd3'}}/></IconButton>
                        </Grid>
                    </Grid>
                )})}
            </Box>}

            {selectedFiles?.length !== 0 && <Box sx={{textAlign: 'center', paddingBottom: '2rem'}}>
                <LoadingButton loading={uploading} onClick={handleUploadFile} variant='contained' sx={{color: '#fff', background: '#202123', ':hover': {background: '#2a2b32'}}} startIcon={<Upload />}>Upload Files</LoadingButton>    
            </Box>}

        </Box>
    )
}

export default Select
