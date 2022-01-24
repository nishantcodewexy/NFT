import React, { useState } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { toast } from 'react-toastify';

// import img from "assets/img/coin_img.png";
// import { useDispatch } from 'react-redux';
// import { useHistory } from "react-router-dom";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


import { forgotPassword } from './../../actions/users';

import isEmpty from '../../lib/isEmpty';


// toaster config
toast.configure();
let toasterOption = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
     
//         EOOON
//      {' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  
    textDanger: {
      color: "#f32828",
    }
  }));

  // props
  const initialFormValue = {
    'email': '',
  }

export default function ForgotPassword() {

//   const history = useHistory();
//   const dispatch = useDispatch();


  const classes = useStyles();
  const [formValue, setFormValue] = useState(initialFormValue);
  const [validateError, setValidateError] = useState({});

  const { email } = formValue;

  // function
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formData = { ...formValue, ...{ [name]: value } }
    setFormValue(formData)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let reqData = {
        email
    }
    let {  error } = await forgotPassword(reqData);
    console.log('reqData',reqData);
    if (isEmpty(error)) {
        setFormValue(initialFormValue)     
        toast.success('Kindly check your email', toasterOption);
    } else {
        setValidateError(error);
    }
  }
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
         Forgot Password
        </Typography>
          <form className={classes.form} noValidate  onSubmit={handleFormSubmit}>
            <TextField
              onChange={handleChange}
              value={email}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
             {
                validateError.email && <span className={classes.textDanger}>{validateError.email}</span>
            }
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Send Mail
            </Button>
          </form>
        </div>
        </Container>
   
  );
}