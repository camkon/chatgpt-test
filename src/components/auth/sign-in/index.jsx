import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { CircularProgress } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ToasterComponent from '../../../components/alert/toaster'

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://google.com/">
        SnippetFlow
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const initialValues = {
  email: '',
  password: '',
  isSubmitting: false
}

export default function SignInModule() {

  const navigate = useNavigate()

  const key = sessionStorage.getItem('gpttestkey')

  React.useEffect(() => {
    if(key === '5b8e7e84-7011-4c47-a5f2-d02ab153de29-25') {
      navigate('/')
    }
  }, [key])

  const form = useFormik({
    initialValues,
    onSubmit: (values, helpers) => {
      try {
        if(values.email === 'admin@demo.com' && values.password === 'admin-demo-pass') {
          setTimeout(() => {
            toast.success('signed in',{id: 'signed-in'})
            sessionStorage.setItem('gpttestkey', '5b8e7e84-7011-4c47-a5f2-d02ab153de29-25')
          }, 1000);
          setTimeout(() => {
            navigate('/')
            toast.remove('signed-in')
            helpers.setSubmitting(false)
          }, 2000);
        }else {
          setTimeout(() => {
            helpers.setSubmitting(false)
            toast.error('wrong credentials! try again')
          }, 1500);
        }        
      } catch (error) {
        helpers.setSubmitting(false)
      }
    }
  })

  return (
    <Container component="main" maxWidth="xs">
      <ToasterComponent />
      <form onSubmit={form.handleSubmit}>
        <Box
          sx={{
            marginTop: 15,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            px: 3,
            bgcolor: '#40414f',
            borderRadius: 3,
            py: 5,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#202123" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h6" color={"#ddd"} sx={{mb: 1}}>
            Sign in
          </Typography>
          <Box
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={form.values.email}
              onChange={form.handleChange}
              autoFocus
              />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={form.values.password}
              onChange={form.handleChange}
              error={!!(form.touched.password && form.errors.password)}
            />
            <LoadingButton
              loading={form.isSubmitting}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ m: "1rem 0 2rem 0", color: "#fff", py: 1.25, backgroundColor: '#202123', ':hover': {backgroundColor: '#2a2b32'} }}
            >
              Sign In
            </LoadingButton>
          </Box>
        </Box>
      </form>
    </Container>
  );
}
