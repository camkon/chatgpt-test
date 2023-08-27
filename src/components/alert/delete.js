import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DeleteAlertDialog = ({open, setOpen, deleteFunction, message}) => {

  const handleClose = () => {setOpen(false)}
  
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth='xs'
      >
        <DialogTitle id="alert-dialog-title" sx={{textAlign: 'center'}}>{"Are you sure?"}</DialogTitle>
        <DialogContent >
          <DialogContentText id="alert-dialog-description" sx={{textAlign: 'center'}}>{message}</DialogContentText>
        </DialogContent>
        <DialogActions sx={{paddingBottom: '1rem', display: 'flex', justifyContent: 'center', columnGap: "0.5rem"}}>
          <Button onClick={handleClose} size='small' autoFocus sx={{'&:hover': {backgroundColor: '#4e79cf', color: '#fff'}}}>Cancel</Button>
          <Button onClick={() => {handleClose(); deleteFunction()}} size='small' sx={{'&:hover': {backgroundColor: '#a94750', color: '#fff'}}}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteAlertDialog