import { Box, Typography } from '@mui/material'
import Lottie from 'lottie-react'
import { useSelector } from 'react-redux'
import animationData from '../../assets/loading-dots.json'


const LoadingAnimation = () => {
    return(
        <Box sx={{display: 'flex', justifyContent: 'center', boxSizing: 'border-box', background: {xs: '#40414f', lg: 'transparent'}}}>
            <Box sx={{width: {xs: '90%', lg: '50%'}, boxSizing: 'border-box', background: {xs: 'inherit', lg: '#40414f'}, padding: {xs: '1rem 0rem', lg: '1rem'}, borderRadius: '0.3rem'}}>
                <Lottie style={{height: 20, width: 30}} autoPlay animationData={animationData} loop={true}/>
            </Box>
        </Box>
    )
}

const NotFound = ({message}) => {
    return(
        <Box sx={{padding: '1rem 0', background: '#40414f', width: {xs: '90%', lg: '50%'}, margin: '0 auto', boxSizing: 'border-box', borderRadius: '0.3rem', textAlign: 'center'}}>
            {message}
        </Box>
    )
}


const ChatList = ({loading}) => {

    const {answer} = useSelector(state => state.search)
  
    const AnswerBox = () => {
        return(
            <Box sx={{display: 'flex', justifyContent: 'center', boxSizing: 'border-box', background: {xs: '#40414f', lg: 'transparent'}}}>
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', gap: '1.5rem', color: '#c9ccd3', width: {xs: '90%', lg: '50%'}, boxSizing: 'border-box', background: {xs: 'inherit', lg: '#40414f'}, borderRadius: '0.3rem'}}>
                    {answer?.[0]?.content === undefined
                        ? <NotFound message={answer?.[0]}/>
                        : answer?.map((item, index) => (
                        <Box sx={{padding: {xs: '1rem 0rem', lg: '1rem'}}}>
                            <Typography>{item?.content}</Typography>
                            <Box sx={{display: 'flex', flexDirection: {xs: 'column', lg: 'row'}, alignItem: 'center', justifyContent: 'flex-end', columnGap: '1rem', borderTop: '1px solid #787889', marginTop: '0.5rem', paddingTop: '0.5rem'}}>
                                <Typography fontSize='0.9rem' sx={{color: '#787889'}}>source: {item?.source}</Typography>
                                <Typography fontSize='0.9rem' sx={{color: '#787889'}}>page: {item?.page}</Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        )
    }

    return (
        <Box sx={{overflowY: 'scroll', minHeight: 'calc(100vh - 7rem)', paddingBottom: '3rem', scrollBehavior: 'smooth'}}>
            {answer?.length !== 0 
                ? loading 
                    ? <LoadingAnimation />
                    : <AnswerBox />
                : <></>
            }
        </Box>
    )
}

export default ChatList
