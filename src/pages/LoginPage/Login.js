import React, { useState } from "react";
import axios from "axios";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import { makeStyles } from "@material-ui/core/styles";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import "../../style/login.css";

// import lib
import validation from "./Validation";

import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },

  textDanger: {
    color: "#f32828"
  }
}));

const initialFormValue = {
  email: "",
  password: ""
};

export default function SignIn() {
  // const classes = useStyles();
  // const history = useHistory();
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState(initialFormValue);
  // const [toched, setToched] = useState({});
  const [validateError, setValidateError] = useState({});

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setFormValue((prevValue) => ({
      ...prevValue,
      [name]: value
    }));
  }
  function handleFormSubmit(event) {
    event.preventDefault();
    axios
    .post(`${process.env.REACT_APP_SERVER}/api/admin/login`, formValue)
    .then((result) => {
      localStorage.setItem("token", result.data.data.data.accessToken);
      localStorage.setItem("admin", result.data.data.data.user_id);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
    setOpen(true);
    setValidateError(validation(formValue));
  }

  // useEffect(() => {
  //   return () => {
  //     setValidateError(validation(formValue));
  //   }
  // }, [formValue]);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#36373B", height: "100vh" }}
    >
      <div className="container ">
        <form
          className="login-form mx-auto"
          noValidate
          onSubmit={handleFormSubmit}
        >
          <div className="heading-text">LOGO</div>
          <div className="sub-heading-text">Administrator</div>
          <label className="lables">아이디</label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={handleChange}
            //onBlur={handleBlur}
            onClick={handleClose}
            className="text-fields"
            placeholder="Please enter your registered email address."
            required
          />
          {validateError.email && open ? (
            <p className="error-message">{validateError.email}</p>
          ) : '' }

          <Box mt={3}></Box>

          <label className="lables">비밀번호</label>

          <input
            type="password"
            id="password"
            name="password"
            onClick={handleClose}
            onChange={handleChange}
            //onBlur={handleBlur}
            className="text-fields"
            placeholder="Please enter a password."
            required
          />

          {validateError.password && open? (
            <p className="error-message">{validateError.password}</p>
          ) : ''}

          <Box mt={5}></Box>

          <button type="submit" className="submit" onClick={handleClickOpen}>
            LOG IN
          </button>

          {/* <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!isEmpty(validateError)}
          >
            Sign In
          </Button>

          */}
          <Grid container>
            <Grid item xs>
              {/* <Link href="/Forgot" variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
}
