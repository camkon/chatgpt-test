import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import Select from './select'

const File = () => {

    const [selectedFiles, setSelectedFiles] = useState([])

    return (
        <Box sx={{height: 'calc(100vh - 3.8rem)'}}>
			<Select selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles}/>
        </Box>
    )
}

export default File
