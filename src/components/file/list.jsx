import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { api } from '../../core/api'
import { filesAction } from '../../store/files'
import FileSearch from './file-search'
import { Box, Grid, IconButton, Typography } from '@mui/material'
import { Delete, Download } from '@mui/icons-material'
import DeleteAlertDialog from '../alert/delete'
import { toast } from 'react-hot-toast'
import { SuccessToast, ErrorToast } from '../alert/toaster'
import { LoadingButton } from '@mui/lab'

const FileList = () => {

	const dispatch = useDispatch()
	const filesList = useSelector(state => state.files.list)
  
	const [query, setQuery] = useState('')
	const [openDelete, setOpenDelete] = useState(false)
	const [deleteItem, setDeleteItem] = useState(0)
	const [fileLoading, setFileLoading] = useState(false)

	useEffect(() => {
		handleLoadFilesList()
	}, [])

	const handleLoadFilesList = async () => {
		const data = JSON.stringify({
			search_text: query,
			page: 0
		})

		axios.post(api.docs_list, data, {headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'X-API-Key': '5b8e7e84-7011-4c47-a5f2-d02ab153de29'}}).then(res => {
			if(res.status === 200) {
				dispatch(filesAction.setList(res?.data?.fileslist))
			}
		})
	}

	const handleDeleteFile = () => {
		const data = JSON.stringify({
			doc_id: deleteItem
		})
		axios.post(api.docs_delete, data, {headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'X-API-Key': '5b8e7e84-7011-4c47-a5f2-d02ab153de29'}}).then(res => {if(res?.status === 200) {
		  toast((t) => <SuccessToast msg={'File Deleted'} id={t.id}/>)
		  handleLoadFilesList()
		}else {
		  toast((t) => <ErrorToast msg={'Try Again'} id={t.id}/>)
		}})
	}

	const handleDownloadFile = async (filename) => {
		dispatch(filesAction.setLoading(true))
		const data = JSON.stringify({
			filename: filename
		})
		axios.post(api.docs_download, data,{headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'X-API-Key': '5b8e7e84-7011-4c47-a5f2-d02ab153de29', responseType: 'blob'}}).then(res => {if(res?.status === 200) {
			const blob = new Blob([res?.data], { type: filename.split('.')?.[1] })
			const url = URL.createObjectURL(blob)
			const link = document.createElement('a')
			link.href = url
			link.setAttribute('download', filename)
			document.body.appendChild(link)
			link.click()
			URL.revokeObjectURL(url)
			document.body.removeChild(link)
			dispatch(filesAction.setLoading(false))
		}else {
			toast((t) => <ErrorToast msg={'Try Again'} id={t.id}/>)
			dispatch(filesAction.setLoading(false))
		}})
	}

	return (
		<Box sx={{padding: '2rem 0'}}>
			<FileSearch query={query} setQuery={setQuery}/>

			{filesList?.length !== 0 ? <Box sx={{height: 'auto', padding: '0.5rem', width: {xs: '95%', lg: '70%'}, margin: '0 auto 2rem auto', borderRadius: '0.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', rowGap: '0.5rem', background: '#20212350', boxSizing: 'border-box'}}>
					<Grid container sx={{justifyContent: 'space-between', alignItems: 'center', color: '#c9ccd3', padding: '0.5rem', borderRadius: '0.25rem', background: '#202123', width: '100%'}}>
                        <Grid item xs={0}><Typography>Id</Typography></Grid>
                        <Grid item xs={6}><Typography sx={{overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>File Name</Typography></Grid>
                        <Grid item xs={1}><Typography>Page Count</Typography></Grid>                            
                        <Grid item xs={2}><Typography>Upload Date</Typography></Grid>                            
                        <Grid item xs={1} sx={{textAlign: 'center'}}><Typography>Action</Typography></Grid>                            
                    </Grid>
                {filesList?.map((item, index) => {
                    return(
                    <Grid container sx={{justifyContent: 'space-between', alignItems: 'center', color: '#c9ccd3', padding: '0.25rem 0.5rem', margin: '0 0.5rem', borderRadius: '0.25rem', background: '#20212390', ':hover': {background: '#20212350'}, width: '100%'}}>
                        <Grid item xs={0}><Typography>{item.fileid}</Typography></Grid>

                        <Grid item xs={6}><Typography sx={{overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{item.filename}</Typography></Grid>
                        
                        <Grid item xs={1}><Typography>{item?.pagecount}</Typography></Grid>
                        
												<Grid item xs={2}><Typography sx={{overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{item?.uploaddate}</Typography></Grid>
																		
												<Grid item xs={1} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', columnGap: 0.5}}>
													<LoadingButton sx={{borderRadius: '0.25rem', color: '#c9ccd3', ':hover': {color: '#fff', bgcolor: '#28282f'}, padding: '0.5rem', minWidth: '2rem'}} onClick={(e) => {handleDownloadFile(item?.filename)}}>
														<Download sx={{color: 'inherit', padding: '0rem'}}/>
													</LoadingButton>
													<IconButton sx={{borderRadius: '0.25rem', color: '#c9ccd3', ':hover': {color: '#fff'}}} onClick={(e) => {setOpenDelete(true); setDeleteItem(item?.fileid)}}><Delete sx={{color: 'inherit'}}/></IconButton>
												</Grid>
                    </Grid>
                )})}
            </Box>
			: <Box sx={{height: 'auto', padding: '5rem 0.5rem', width: {xs: '95%', lg: '70%'}, margin: '0 auto 2rem auto', borderRadius: '0.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', rowGap: '0.5rem', background: '#20212350', boxSizing: 'border-box'}}>
				<Typography sx={{color: '#c9ccd3'}}>No Files Available</Typography>
			</Box>
			}

			{openDelete && <DeleteAlertDialog 
				open={openDelete}
				setOpen={setOpenDelete}
				deleteFunction={handleDeleteFile}
				message='The file will be deleted from the database and cannot be retrieved. Click Confirm to continue'
			/>}
		</Box>
	)
}

export default FileList
