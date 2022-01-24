import React, { useEffect, useState } from "react";
import clsx from 'clsx';
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Button, FormControl, InputLabel, OutlinedInput, InputAdornment, Checkbox, FormControlLabel, Tooltip, Typography } from '@material-ui/core';
// OutlinedInput id="otpv" type="text"
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import CardFooter from "components/Card/CardFooter.js";



// import styles from "assets/jss/material-kit-react/views/home.js";

import { get2faCode, update2faCode, disable2faCode} from '../../actions/users';
// import isEmpty from '../lib/isEmpty';

const dashboardRoutes = [];

const useStyles = makeStyles();

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#0075bc',
    color: '#fff',
    maxWidth: 230,
    fontSize: theme.typography.pxToRem(10),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

const initialFormValue = {
  'password': '',
  'confirmPassword': '',
  'otpv': ''
}

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


export default function TFA(props) {

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState(initialFormValue);
  const [validateError, setValidateError] = useState({});
  const [settings2fa, setSettings2fa] = useState({});
  const [qrimage, setqrimage] = useState('');
  const [tfacode, settfacode] = useState('');
  const [tfastatussetSettings2fasetbackcode] = useState(false);
  const [otp, setotp] = useState("");
  const [showResults, setShowResults] = React.useState(false)



  const { otpv } = formValue;

  const { ...rest } = props;


  const Get2Facode = async () => {
    let { error, result } = await get2faCode();
    setSettings2fa(result);
    console.log(result, 'result')
  }
  useEffect(() => {
    Get2Facode()
    //console.log(data.result);
  }, [])

  const updatekey = async () => {

    if (otp == "") {
      alert("Please Enter the otp")
    } else {
      var data = {
        code: otp,
        secret: settings2fa.secret,
        uri: settings2fa.uri,
      }
      console.log(data, "-------");
      let { error, result } = await update2faCode(data);
      console.log(result, 'result');
      window.location="/securityType/";


    }
  }
  const disablekey = async () => { 
    let { error, result } = await disable2faCode();
    // setSettings2fa(result);
    console.log(result,result);
    window.location="/securityType/";

  }
  const handleChangeotp = (e) => {
    setotp(e.target.value)
    console.log("-----sfdsdf", e.target.value);
  }

  // function
  const handleChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    let formData = { ...formValue, ...{ [id]: value } }
    setFormValue(formData)
    //setValidateError(validation(formData))
  }

  return (
    <div>
      <div className="inner_pageheader">
        <div className={classes.container}>
          <div className="inner_content_panel">
            <GridContainer>
              <GridItem sm={12} md={12} lg={12}>
                <h2 className="inner_section_title">Two Factor Authentication<span>{ }</span></h2>
                <GridContainer className="tfa_panel">
                  <GridItem sm={12} md={7} lg={7}>
                    <div className="tfa_panel_div">
                      <div>
                        <h2>Scan QR Code</h2>
                        <img className="mb-4" src={settings2fa.imageUrl} alt="Logo" />
                      </div>
                      <div className="ml-4">
                        <h2>Backup your secret key</h2>
                        <p className="secret_key">{settings2fa.secret}</p>
                        <div className="text_center_mobile">
                          <Button className="auth_btn">Copy Code</Button>
                        </div>
                        <p className="text-dark">Please remember your secret key ({settings2fa.secret}). If your secret key gets lost, stolen or erased, you will need this key to get back into your google authentication! Otherwise resetting your google two factor authentication requires opening a support ticket and take atleast 7 days to process.</p>

                        {/* { settings2fa.upated == 0 &&  */}
                        <div>
                          <p className="text-dark">Please Enter the code to Confirm the secret key or else the secret key will be chnaged</p>
                          <form className="auth_form form_bg_white">
                            <div className="form-row">
                              <div className="form-group col-md-12">

                                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                                  <InputLabel htmlFor="otp"  >Enter OTP </InputLabel>
                                  <OutlinedInput id="otp" type="text" onChange={handleChangeotp}
                                    aria-describedby="outlined-weight-helper-text"
                                    labelWidth={80}
                                  />
                                </FormControl>
                              </div>
                            </div>
                          </form>

                          <div className="text_center_mobile">
                            <Button className="auth_btn" onClick={updatekey}>Continue</Button>
                          </div>
                        </div>
                        {/* }   */}
                        {settings2fa.upated == 1 &&
                          <p className="text-dark">Your Secret key was successfully Updated</p>
                        }
                      </div>
                    </div>
                  </GridItem>               
                </GridContainer>
              </GridItem>
            
                          <CardFooter>     
              {
                settings2fa.status == 'Enabled' && <Button color="primary" onClick={disablekey}>
                  Disable
                </Button>
              }
              {
                settings2fa.status == 'Disabled' && <Button color="primary" onClick={updatekey}>
                  Enable          </Button>
              }
  </CardFooter>
            </GridContainer>
          </div>
        </div>
      </div>

    </div>
  );
}
