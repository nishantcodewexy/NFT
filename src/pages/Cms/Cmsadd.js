import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import PhoneInput from 'react-phone-input-2'
;
import { MenuItem, InputLabel } from '@material-ui/core';

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Select from '@material-ui/core/Select'
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { toastAlert } from '../../lib/toastAlert'

import { Editor } from '@tinymce/tinymce-react';

//import avatar from "assets/img/faces/marc.jpg";
import isEmpty from '../../lib/isEmpty';

import { AddCms } from '../../actions/emailTemplate';

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

export default function Categoryadd(props) {
  const classes = useStyles();
  const history = useHistory();
  const [toched, setToched] = useState({});

  const dispatch = useDispatch();
  const [userdet, setUser] = useState();
  const [formValue, setFormValue] = useState(initialFormValue);
  const [validateError, setValidateError] = useState({});

  const { userId } = useParams();
  const onChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    let formData = { ...formValue, ...{ [id]: value } }
    setFormValue(formData)
    console.log(formValue);
  }

    const {
     category,
     productname,
     price,
     creatorname,
     content,
     creatorimage,
     productimage,
     tokentype

    } = formValue

    useEffect(() => {
    }, [])

  const onchangeeditor = (e) => {
    let formData = { ...formValue, ...{ ["content"]: e } }
    setFormValue(formData)
    console.log(formValue);
  }

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formData = { ...formValue, ...{ [name]: value } }
    setFormValue(formData)
  }

  const handleFormSubmit = async (e) => {
    // console.log(productname,"saran");
    e.preventDefault();
    try {
      
    
        let reqData = new FormData();
        reqData.append('productname', productname);
        console.log(reqData,"saran");
        reqData.append('price', price);
        reqData.append('content', content);
        reqData.append('creatorimage', creatorimage);
        reqData.append('creatorname', creatorname);
        reqData.append('productimage', productimage);
        reqData.append('tokentype', tokentype);
        console.log(reqData,'add')
        const { status, loading, messages, error } = await AddCms(reqData);
        if (status == 'success') {
          toastAlert('success', messages, 'AddCms')
          history.push('/CmsList')
        } else {
          setValidateError(error);
        }
      } catch (err) {
      }

  }

  const handleFile = (event) => {
    const { name, files } = event.target;
    let formData = { ...formValue, ...{ [name]: files[0] } }
    setFormValue(formData)
  };

  const handleProduct = (event) => {
    const { name, files } = event.target;
    let formData = { ...formValue, ...{ [name]: files[0] } }
    setFormValue(formData)
  };

  

  let formdata = {};

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <form className={classes.form} noValidate onSubmit={handleFormSubmit}>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Add banner</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>                 
                 <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      onChange={onChange}
                      labelText="Product Name"
                      id="productname"
                      value={productname}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem> 
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      onChange={onChange}
                      labelText="Price"

                      id="price"
                      value={price}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem> 
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      onChange={onChange}
                      labelText="Creator Name"

                      id="creatorname"
                      value={creatorname}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem> 

                  <GridItem xs={12} sm={12} md={3}>
                    <div className="custom_select">
                      <InputLabel id="demo-controlled-open-select-label">Token Type</InputLabel>
                      <Select
                        className="d-block"
                        name="tokentype"
                        value={tokentype}
                        onChange={handleChange}
                      >
                        <MenuItem value="ETH">ETH</MenuItem>
                        <MenuItem value="BEP">BEP</MenuItem>
                      </Select>

                      {
                        validateError.tokentype && <span className={classes.textDanger}>{validateError.tokentype}</span>
                      }
                    </div>
                  </GridItem>

                </GridContainer>
                <GridContainer>

                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Creator Image"
                      name="creatorimage"
                      onChange={handleFile}
                      type="file"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                    {
                      validateError.creatorimage && <span className={classes.textDanger}>{validateError.creatorimage}</span>
                    }
                    {/* <img src={image.photo} width="50" height="30" /> */}
                  </GridItem>

                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Product Image"
                      name="productimage"
                      onChange={handleProduct}
                      type="file"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                    {
                      validateError.productimage && <span className={classes.textDanger}>{validateError.productimage}</span>
                    }
                    {/* <img src={image.photo} width="50" height="30" /> */}
                  </GridItem>
                </GridContainer>

                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                    <p className={classes.cardCategoryWhite}>Create a new user</p>
                    <Editor apiKey='j2crzkts7ankhknggcx4ku2xkuiaxsiruhwg1e01cfwvmbpq'
                      onEditorChange={onchangeeditor}
                      id="content"
                      init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                          'advlist autolink lists link image charmap print preview anchor',
                          'searchreplace visualblocks code fullscreen',
                          'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar:
                          'undo redo code | formatselect | bold italic backcolor | \
                          alignleft aligncenter alignright alignjustify | \
                          bullist numlist outdent indent | removeformat | help'
                      }}
                    />
                   
                    {
                      validateError.content && <span className={classes.textDanger}>{validateError.content}</span>
                    }
                  </GridItem>
                </GridContainer>
           
              </CardBody>
              <CardFooter>
                <Button color="primary" type="submit">Add</Button>
              </CardFooter>
            </form>
          </Card>
        </GridItem>       
      </GridContainer>
    </div>
  );
}
