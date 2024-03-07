import { Box, Divider, FormControl, IconButton, MenuItem, Paper, Select, Skeleton, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField, Typography, styled } from '@mui/material'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {api} from '../../core/api'
import { useDispatch, useSelector } from 'react-redux'
import { historyAction } from '../../store/history'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'

const CELL = styled(TableCell)(() => ({
  padding: '1rem 1rem',
  border: 'none',
  color: '#c5c8ce'
}))

const NoDataBox = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '20rem',
  width: '100%',
}))

const History = () => {

  const dispatch = useDispatch()
  const {history} = useSelector(state => state.history)

  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState(history.recordcount ?? 10)
  const [page, setPage] = useState(0)

  const handleLoadHistory = async ({pageno, recordcount}) => {
    // if(history?.length === 0) {
      setLoading(true)
      axios.post(api.history_get, {pageno: pageno, recordcount: recordcount}, {headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'X-API-Key': '5b8e7e84-7011-4c47-a5f2-d02ab153de29'}}).then(res => {
        if(res?.status === 200) {
          dispatch(historyAction.setHistory(res?.data))
          setLoading(false)
          // setPage(pageno)
        }
      }).catch(er => {
        console.log(er);
        setLoading(false)
      })
    // }
  }

  console.log(history)

  useEffect(() => {
    handleLoadHistory({pageno: 1, recordcount: 10})
  }, [])

  useEffect(() => {setItems(history.recordcount)}, [history.recordcount])

  return (
    <Box sx={{position: 'relative', minHeight: 'calc(100vh - 3.8rem)', overflowY: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingY: '2rem'}}>
      <Box sx={{minHeight: '7rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Paper elevation={1} sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0 auto', width: {xs: '90%', lg: '70%'}, padding: '0.5rem 0.5rem', borderRadius: '0.3rem', boxSizing: 'border-box', background: '#40414f'}}>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <CELL sx={{color: '#fff'}}>ID</CELL>
                <CELL sx={{color: '#fff'}}>HISTORY</CELL>
              </TableRow>
            </TableHead>
            <TableBody>
              {history?.data?.length !== 0 ? history?.data?.slice(page * history?.recordcount, page * history?.recordcount + history?.recordcount)?.map((i) => (
                  <TableRow>
                    <CELL>{i.id}</CELL>
                    <CELL>
                      <span style={{fontWeight: 'bold'}}>query</span> : {i.question}
                      <br /><br />
                      {i.answer}
                      
                      <br /><br />
                      <Box sx={{textAlign: 'right'}}>
                        <span style={{fontWeight: 'bold'}}>time</span>: {i.conversationtime} 
                        &#160; 
                        <span style={{fontWeight: 'bold'}}>duration</span>: {i.timetaken}
                      </Box>
                    </CELL>
                  </TableRow>
                )) : <NoDataBox>no history available</NoDataBox> 
              }
            </TableBody>
            {/* <TablePagination 
              sx={{border: 'none', color: '#c5c8ce'}}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5,10,15,20,25]}
              page={history.totalrecords}
              count={history.totalpages}
            /> */}
          </Table>
        <TableFooter sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%', borderTop: `1px solid #808080`}}>
          <TableRow sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%', paddingRight: '1.5rem', color: '#ddd'}}>
            <Typography variant="body2">Rows per page: </Typography>
            <FormControl size="small" sx={{ m: 1, minWidth: 60, fontSize: '0.9rem'}}>
              <Select
                value={items}
                onChange={(e) => {setItems(e.target.value); handleLoadHistory({pageno: 1, recordcount: e.target.value ?? 5})}}
                size="small"
                variant="outlined"
                select
                sx={{fontSize: '0.9rem'}}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>
            </FormControl>
            <span style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginLeft: '1rem'}}>
              <Typography variant="body2" style={{marginRight: '0.5rem'}}>
                {history.pageno} of {history.totalpages ?? 1}
              </Typography>
              <IconButton disabled={history.pageno === 1 ? true : false} onClick={(e) => {handleLoadHistory({pageno: history.pageno-1, recordcount: items})}}><ChevronLeft /></IconButton>
              <IconButton disabled={history.pageno === history.totalpages ? true : false} onClick={(e) => {handleLoadHistory({pageno: history.pageno+1, recordcount: items})}}><ChevronRight/></IconButton>
            </span>
          </TableRow>
        </TableFooter>
        </TableContainer>

        </Paper>
      </Box>
    </Box>
  )
}

export default History

// pageNow={data.pageno}
// pageItems={data.recordcount}
// pageCount={data.totalpages}