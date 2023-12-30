import { Cancel, CheckCircle, CheckCircleOutline, Close } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { useEffect } from 'react';
import toast, {CheckmarkIcon, ErrorIcon, Toaster, useToasterStore} from 'react-hot-toast'

const ToasterComponent = () => {
    const { toasts } = useToasterStore();
    const TOAST_LIMIT = 1

    useEffect(() => {
    toasts
        .filter((t) => t.visible) // Only consider visible toasts
        .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit?
        .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
    }, [toasts]);

    return <Toaster 
        maxCount={1}
        reverseOrder={false}
        toastOptions={{
            duration: 30000
        }}
        containerStyle={{
            top: '0.4rem',  
        }}
        position='bottom-left'
    />
}

export default ToasterComponent

export const SuccessToast = ({msg, id, dismiss}) => {

    useEffect(() => {
        if(dismiss !== undefined) {setTimeout(() => {toast.dismiss(id)}, dismiss)}
    }, [])

    return (<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
    <CheckmarkIcon style={{marginLeft: '-0.25rem'}}/>
    <Box sx={{margin: '0 0.5rem'}}>{msg}</Box>
    <IconButton onClick={() => {toast.dismiss(id)}} size='small' sx={{marginRight: '-0.5rem'}}><Close fontSize='0.7rem'/></IconButton>
</div>)
}

export const ErrorToast = ({msg, id, dismiss}) => {

    useEffect(() => {
        if(dismiss !== undefined) {setTimeout(() => {toast.dismiss(id)}, dismiss)}
    }, [])
    
    return(<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <ErrorIcon style={{marginLeft: '-0.25rem'}}/>
        <Box sx={{margin: '0 0.5rem'}}>{msg}</Box>
        <IconButton onClick={() => {toast.dismiss(id)}} size='small' sx={{marginRight: '-0.5rem'}}><Close fontSize='0.7rem'/></IconButton>
    </div>)
}
