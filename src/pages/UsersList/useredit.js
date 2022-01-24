import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import PhoneInput from 'react-phone-input-2'

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

//import avatar from "assets/img/faces/marc.jpg";
import isEmpty from '../../lib/isEmpty';

import {  getUser, updateUser } from '../../actions/users';

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

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


const initialFormValue = {
  'name': "",
  'firstName': "",
  'lastName': "",
  'email': "",
  'phonenumber': "",
  'phoneCode':"",


}

const useStyles = makeStyles(styles);

export default function UserProfile(props) {
  const classes = useStyles();
  const history = useHistory();
  const [toched, setToched] = useState({});

  const dispatch = useDispatch();
  const [userdet, setUser] = useState();
  const [formValue, setFormValue] = useState(initialFormValue);
  const [validateError, setValidateError] = useState({});

  const { userId } = useParams();
   // console.log(userId,"asdfdsfdsfdsf");

//   const handleFile = (event) => {
//     const { id, files } = event.target;
//     //settmpupimagefront(URL.createObjectURL(event.target.files[0]));

//     let formData = { ...formValue, ...{ [id]: files[0] } }
//     setFormValue(formData)
//     //setValidateError(formData)
//   };


  // function
  const onChange = (e) => {
    e.preventDefault();
   // console.log(e.target);
    const { id, value } = e.target;
    let formData = { ...formValue, ...{ [id]: value } }
    setFormValue(formData)
    console.log(formValue);
    //setValidateError(formData)
  }

    const {
      
        email,
        phoneNo,
        phoneCode,
    
    } = formValue

    const handlePhoneNumber = (value, country) => {
      const { dialCode } = country;
      let phoneNo = value;
      let formData = formValue;
      if (dialCode) {
          formData = {
              ...formData, ...{
                  phoneCode: dialCode,
                  phoneNo: phoneNo.slice(dialCode.length),
              }
          }
      } else if (value) {
          formData = { ...formData, ...{ phoneNo } }
      }
      setFormValue(formData)
      // setValidateError(validation(formData))

  }
    const handleBlurPhone = (e) => {
      setToched({ ...toched, ...{ 'phoneNo': true, 'phoneCode': true } })
  }
  const handleFormSubmit = async (e) => {
    //console.log("saran");
    e.preventDefault();
    console.log(formValue);

    let reqData = {
        email,
        phoneNo,
        phoneCode,
        userId
    }
    console.log(reqData);
    let { error } = await updateUser(reqData);
    console.log(reqData);
    if (isEmpty(error)) {
      toast.success('User Updated', toasterOption);
       history.push('/userlist')
    } else {
      setValidateError(error);
    }
  }
  let formdata = {};
  const getUserData = async () => {
    var test = await getUser(userId);
    console.log('testtest',test)

    // formdata['firstName'] = test.result.firstName;
    // formdata['lastName'] = test.result.lastName;
    formdata['email'] = test.result.email;
    console.log('formdata',formdata)
    formdata['phoneNo'] = test.result.phoneNo;
    formdata['phoneCode'] = test.result.phoneCode;
    setFormValue(formdata)
    console.log(formdata.firstName)
    //setUser(test.userValue);
  }

  useEffect(() => {
    //logout(history)
    getUserData();
  }, [])


  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <form className={classes.form} noValidate onSubmit={handleFormSubmit}>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Update Users</h4>
                {/* <p className={classes.cardCategoryWhite}>Create a new user</p> */}
              </CardHeader>
              <CardBody>
                <GridContainer>                 
                  {/* <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="firstName"
                      onChange={onChange}
                      id="firstName"
                      value={firstName}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                    {
                        validateError.name && <span className={classes.textDanger}>{validateError.name}</span>
                    }
                  </GridItem> */}
                
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Email address"
                      onChange={onChange}
                      value={email}
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                    {
                        validateError.email && <span className={classes.textDanger}>{validateError.email}</span>
                    }
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>

                  {/* <PhoneInput
                            placeholder="Enter phone number"
                            value={phoneCode + phoneNo}
                            onChange={handlePhoneNumber}
                            onBlur={handleBlurPhone}
                        /> */}
                        Mobile Number
                    <PhoneInput
                      labelText="Mobile"
                      onChange={handlePhoneNumber}
                      onBlur={handleBlurPhone}
                      value={phoneCode + phoneNo}
                      id="phoneNo"
                      // formControlProps={{
                      //   fullWidth: true
                      // }}
                    />
                    {
                        validateError.phonenumber && <span className={classes.textDanger}>{validateError.phonenumber}</span>
                    }
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" type="submit">Update</Button>
              </CardFooter>
            </form>
          </Card>
        </GridItem>       
      </GridContainer>
    </div>
  );
}
