import { Box, Divider, Paper, Skeleton, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography, styled } from '@mui/material'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {api} from '../../core/api'
import { useDispatch, useSelector } from 'react-redux'
import { historyAction } from '../../store/history'

const CELL = styled(TableCell)(() => ({
  // background: 'red',
  padding: '1rem 1rem',
  border: 'none',
  color: '#c5c8ce'
}))

const History = () => {

  const dispatch = useDispatch()
  const {history} = useSelector(state => state.history)

  const [loading, setLoading] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleLoadHistory = async () => {
    if(history?.length === 0) {
      setLoading(true)
      axios.post(api.history_get, {pageno: 1, recordcount: 10}).then(res => {
        if(res?.status === 200) {
          dispatch(historyAction.setHistory(res?.data))
          setLoading(false)
        }
      }).catch(er => {
        console.log(er);
        setLoading(false)
      })
    }
  }

  console.log(history)

  useEffect(() => {
    handleLoadHistory()
  }, [])

  return (
    <Box sx={{position: 'relative', minHeight: 'calc(100vh - 3.8rem)', overflowY: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingY: '2rem'}}>
      <Box sx={{minHeight: '7rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Paper elevation={1} sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0 auto', width: {xs: '90%', lg: '70%'}, padding: '0.5rem 0.5rem', borderRadius: '0.3rem', boxSizing: 'border-box', background: '#40414f'}}>

        <Table>
          <TableHead>
            <TableRow>
              <CELL sx={{color: '#fff'}}>ID</CELL>
              <CELL sx={{color: '#fff'}}>HISTORY</CELL>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading ? history?.data?.map(i => (
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
            )) : [1,2,3,4,5].map(() =>
              <TableRow>
                <CELL sx={{width: 50}}><Skeleton height={'3rem'}/></CELL>
                <CELL><Skeleton height={'3rem'}/></CELL>
              </TableRow>
            )}
          </TableBody>
          <TablePagination 
            sx={{border: 'none', color: '#c5c8ce'}}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5,10,15,20,25]}
            page={history.totalrecords}
            count={history.totalpages}
          />
        </Table>


        </Paper>
      </Box>
    </Box>
  )
}

export default History