import { Avatar, Box } from '@mui/material'
import Lottie from 'lottie-react'
import { useEffect, useRef } from 'react'

const ChatList = ({chat}) => {

    const heightRef = useRef(null)

    useEffect(() => {
        if(heightRef.current) {
            heightRef.current.scrollTop = heightRef.current.scrollHeight
        }
    }, [chat])

    const QuestionBox = ({question}) => {
        return(
            <Box sx={{display: 'flex', justifyContent: 'center', boxSizing: 'border-box'}}>
                <Box sx={{display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', columnGap: {xs: '1rem', lg: '1.5rem'}, padding: {xs: '1rem 0', lg: '1.5rem 0'}, color: '#fff', width: {xs: '90%', lg: '50%'}, wordBreak: 'break-word', boxSizing: 'border-box'}}>
                    <Avatar sx={{background: 'indigo', borderRadius: '0.25rem', height: '2rem', width: '2rem', fontSize: '0.9rem'}}>U</Avatar>
                    <p style={{margin: 0}}>{question}</p>
                </Box>
            </Box>
        )
    }

    const AnswerBox = ({data}) => {
        return(
            <Box sx={{display: 'flex', justifyContent: 'center', boxSizing: 'border-box', border: '1px solid #2c2e35', background: '#40414f'}}>
                <Box sx={{display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', columnGap: {xs: '1rem', lg: '1.5rem'}, padding: {xs: '1rem 0', lg: '1.5rem 0'}, color: '#c9ccd3', width: {xs: '90%', lg: '50%'}, wordBreak: 'break-word', boxSizing: 'border-box'}}>
                    <Avatar sx={{background: '#19c37d', borderRadius: '0.25rem', height: '2rem', width: '2rem', fontSize: '0.9rem'}}>C</Avatar>
                    {data?.error == undefined
                        ? data?.answer !== undefined 
                            ? <p style={{margin: '0.25rem 0 0 0'}}>{data?.answer}</p>
                            : <Lottie style={{height: 20, width: 30, marginTop: '0.75rem'}} autoPlay animationData={require('../../assets/loading-dots.json')} loop={true}/>
                        : <p style={{margin: '0.75rem 0 0 0', color: 'red'}}>{data?.error}</p>
                    }
                </Box>
            </Box>
        )
    }

    return (
        <Box sx={{overflowY: 'scroll', height: 'calc(100vh - 7rem)', paddingBottom: '5rem', scrollBehavior: 'smooth'}} ref={heightRef}>
            {chat?.map(item => [
                <QuestionBox question={item?.question}/>,
                <AnswerBox data={item}/>
            ])}
        </Box>
    )
}

export default ChatList
