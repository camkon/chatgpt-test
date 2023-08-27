import { Box } from '@mui/material'
import Select from './select'
import FileList from './list'

const File = () => {

    return (
        <Box sx={{minHeight: 'calc(100vh - 3.8rem)'}}>
			<Select />
            <FileList />
        </Box>
    )
}

export default File
