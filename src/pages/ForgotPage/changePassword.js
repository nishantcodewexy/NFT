import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
// import img from "assets/img/coin_img.png";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Container from "@material-ui/core/Container";

import { changePassword } from "./../../actions/users";

import isEmpty from "../../lib/isEmpty";

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
};

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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textDanger: {
    color: "#f32828",
  },
}));

const initialFormValue = {
  password: "",
  confirmPassword: "",
};

export default function SignInSide() {
  const history = useHistory();
  // const dispatch = useDispatch();
  const { authToken } = useParams();
  console.log(authToken, "params");

  const classes = useStyles();
  const [formValue, setFormValue] = useState(initialFormValue);
  const [validateError, setValidateError] = useState({});

  const [loader, setLoader] = useState();

  const { password, confirmPassword } = formValue;
  // function
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formData = { ...formValue, ...{ [name]: value } };
    setFormValue(formData);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let reqData = {
      password,
      confirmPassword,
      authToken,
    };
    console.log(reqData);
    let { error } = await changePassword(reqData);
    console.log(error);

    if (isEmpty(error)) {
      setFormValue(initialFormValue);
      toast.success("Password changed successfully", toasterOption);
      history.push("/");
    } else {
      setValidateError(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Change password
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleFormSubmit}>
          <TextField
            onChange={handleChange}
            value={password}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="password"
            name="password"
            type="password"
            autoComplete="password"
            autoFocus
          />
          {validateError.password && (
            <span className={classes.textDanger}>{validateError.password}</span>
          )}
          <TextField
            onChange={handleChange}
            value={confirmPassword}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="confirmPassword"
            type="password"
            id="confirmPassword"
            autoComplete="confirmPassword"
          />
          {validateError.confirmPassword && (
            <span className={classes.textDanger}>
              {validateError.confirmPassword}
            </span>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Update Password
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/" variant="body2">
                Login
              </Link>
            </Grid>
            {/* <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid> */}
          </Grid>
          {/* <Box mt={5}>
              <Copyright />
            </Box> */}
        </form>
      </div>
    </Container>
  );
}
