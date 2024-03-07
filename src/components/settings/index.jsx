import { Box, Divider, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Input, MenuItem, OutlinedInput, Paper, Skeleton, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField, Typography, styled } from '@mui/material'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {api} from '../../core/api'
import { useDispatch, useSelector } from 'react-redux'
import { settingsAction } from '../../store/settings'
import { LoadingButton } from '@mui/lab'
import { useFormik } from 'formik'
import * as Yup from "yup"
import toast from 'react-hot-toast'

const CELL = styled(TableCell)(() => ({
  // background: 'red',
  padding: '1rem 1rem',
  border: 'none',
  color: '#c5c8ce'
}))

const Settings = () => {

  const dispatch = useDispatch()
  const {settings} = useSelector(state => state.settings)

  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleLoadSettings = async () => {
    if(settings === null) {
      setLoading(true)
      axios.post(api.settings_get, null,{headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'X-API-Key': '5b8e7e84-7011-4c47-a5f2-d02ab153de29'}}).then(res => {
        console.log(res)
        if(res?.status === 200) {
          dispatch(settingsAction.setSettings(res?.data.data))
          setLoading(false)
          form.setValues({
            companyname: res?.data?.data?.companyname,
            email: res?.data?.data?.email,
            phonenumber: res?.data?.data?.phonenumber,
            historycount: res?.data?.data?.historycount,
            model: res?.data?.data?.model,
          })
        }
      }).catch(er => {
        console.log(er);
        setLoading(false)
      })
    }
  }

  const initialValues = {
    companyname: settings?.companyname || "",
    email: settings?.email || "",
    phonenumber: settings?.phonenumber || "",
    historycount: settings?.historycount || 1,
    model: settings?.model || "gpt-35-turbo",
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('Must be a valid email').max(255),
    phone: Yup.number().min(12),  
  });  

  const form = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try{
        setSaving(true)
        axios.post(api.settings_save, {
          companyname: values?.companyname,
          email: values?.email,
          phonenumber: values?.phonenumber,
          historycount: values?.historycount,
          model: values?.model,
        }, {headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'X-API-Key': '5b8e7e84-7011-4c47-a5f2-d02ab153de29'}}).then(res => {
          if(res?.status === 200) {
            dispatch(settingsAction.setSettings(values))
            setSaving(false)
            toast.success(res.data.status)
          }
        }).catch(er => {
          console.log(er);
          setSaving(false)
        })  
      }catch (err) {
        setSaving(false)
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
    }
    }
  })

  useEffect(() => {
    handleLoadSettings()
  }, [])

  return (
    <Box sx={{position: 'relative', minHeight: 'calc(100vh - 3.8rem)', overflowY: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingY: '2rem'}}>
      <Box sx={{minHeight: '7rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Paper elevation={1} sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0 auto', width: {xs: '90%', lg: '47.5%'}, padding: '1rem 1rem', borderRadius: '0.3rem', boxSizing: 'border-box', background: '#40414f'}}>

          <form onSubmit={form.handleSubmit}>
            <Grid container columnSpacing={3} rowSpacing={loading ? 0 : 3}>
              <Grid item xs={12} lg={6}>
                {loading ? <Skeleton height="5rem"/> :
                <TextField 
                  label="Company Name"
                  fullWidth
                  name='companyname'
                  value={form.values.companyname}
                  onChange={form.handleChange}
                />
                }
                </Grid>
              <Grid item xs={12} lg={6}>
                {loading ? <Skeleton height="5rem" width="21rem" sx={{m: 0}}/> :
                <TextField 
                  label="Phone Number"
                  fullWidth
                  name='phonenumber'
                  value={form.values.phonenumber}
                  onChange={form.handleChange}
                />
                }
                </Grid>
              <Grid item xs={12} lg={12}>
                {loading ? <Skeleton height="5rem"/> :
                <TextField 
                  label="Email"
                  fullWidth
                  name='email'
                  value={form.values.email}
                  onChange={form.handleChange}
                  error={!!(form.touched.email && form.errors.email)}
                  helperText={form.touched.email && form.errors.email}
                />
                }
                </Grid>
              <Grid item xs={12} lg={6}>
                {loading ? <Skeleton height="5rem"/> :
                <TextField 
                  label="History Count"
                  fullWidth
                  select
                  name='historycount'
                  value={form.values.historycount}
                  onChange={form.handleChange}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </TextField>
                }
              </Grid>
              <Grid item xs={12} lg={6}>
                {loading ? <Skeleton height="5rem" width="21rem"/> :
                <TextField 
                  label="Model"
                  fullWidth
                  select
                  name='model'
                  value={form.values.model}
                  onChange={form.handleChange}
                >
                  <MenuItem value={'gpt-35-turbo'}>gpt-35-turbo</MenuItem>
                  <MenuItem value={'gpt-35-turbo-16k'}>gpt-35-turbo-16k</MenuItem>
                  <MenuItem value={'gpt-4'}>gpt-4</MenuItem>
                  <MenuItem value={'gpt-4-32k'}>gpt-4-32k</MenuItem>
                </TextField>
                }
              </Grid>            

              <Grid item xs={12} textAlign={'right'}>
                <LoadingButton fullWidth={false} disabled={loading} onClick={form.handleSubmit} loading={saving} size='small' fontSize='0.9rem' sx={{color: saving ? '#fff' : '#787889', bgcolor: '#2e2e38', ':hover':{bgcolor: '#202123'}, width: 'unset'}}>save</LoadingButton>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Box>
  )
}

export default Settings