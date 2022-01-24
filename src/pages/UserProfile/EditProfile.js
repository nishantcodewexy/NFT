import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import customInputStyle from "assets/jss/material-dashboard-react/components/customInputStyle.js";

import 'react-phone-input-2/lib/style.css'

//import avatar from "assets/img/faces/marc.jpg";
import isEmpty from '../../lib/isEmpty';

import { updateProfile, getadminUsers } from '../../actions/users';

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    getadminUsers,
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
  'email': "",

}

const useStyles = makeStyles(styles);

const customStyle = makeStyles(customInputStyle);

export default function UserProfile() {
  const customStyles = customStyle();

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  // const [userdet, setUser] = useState();
  const [result, setFormValue] = useState({name:"",email:""});
  const [formData, setFormData] = useState(initialFormValue);
  const [validateError, setValidateError] = useState({});


  // function
  // const onChange = (e) => {
  //   e.preventDefault();
  //   console.log(e.target);
  //   const { name, value } = e.target;
    
  //   //let formData = { ...formData, ...{ [name]: value } }
  //   setFormData(value)
  //   console.log(name,'formData of forms');
  //   // setValidateError(formData)
  // }
  const onChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;

    let formDatass = { ...result, ...{ [id]: value } }
    setFormValue(formDatass)
    setFormData(formDatass)
}

  const {
    email,
    name
  } = formData

  const handleFormSubmit = async (e) => {
    //console.log("saran");
    e.preventDefault();

    let reqData = {
      result
    }

    let { error } = await updateProfile(reqData);
    
    //console.log(error);
    if (isEmpty(error)) {
      toast.success('Profile Updated', toasterOption);
      history.push('/editprofile')
    } else {
      setValidateError(error);
    }
  }

  const getadmindata = async () => {
    var  result  = await getadminUsers();
    console.log('profileeetest',result);
    let formData = {};
     formData['name'] =result.result.name;
    formData['email'] = result.result.email;
    setFormData(formData)
    setFormValue(formData)

  }

  useEffect(() => {
    //logout(history)
    getadmindata();
  }, [])

  return (
    // formData.map(formData => ()
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
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Name"
                      onChange={onChange}
                      id="name"
                      value={name}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                    {
                        validateError.name && <span className={classes.textDanger}>{validateError.name}</span>
                    }
                  </GridItem>
                
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput   id="filled-disabled"  variant="filled"   disabled = {true}
  
                      labelText="Email address"
                      className= 'classes.disabled'
                      value={email}
                      onChange={onChange}
                      id="email"
                      name="email"
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
                
                {/* <GridItem xs={12} sm={12} md={3}>
                  Name
                    <CustomInput
                      // labelText="Name"

                      id="name"
                      name="name"
                      defaultValue={"name"}
                      inputProps={{
                        value: formData.name,
                        onChange
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                    {
                      validateError.name && <span className={classes.textDanger}>{validateError.name}</span>
                    }
                  </GridItem> */}
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
