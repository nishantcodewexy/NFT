import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

// import material ui
import { Select } from '@material-ui/core';

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
import { MenuItem, InputLabel } from '@material-ui/core';

import { Editor } from '@tinymce/tinymce-react';

// import action
import { updatecms,} from '../../actions/emailTemplate'
import {  getsinglecms } from '../../actions/users'

// import lib
import fileObjectUrl from '../../lib/fileObjectUrl';
import isEmpty from '../../lib/isEmpty';
import { toastAlert } from '../../lib/toastAlert';

const styles = theme => ({
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
});

const initialFormValue = {
  'currencyType': '',
  'currencyName': '',
  'currencySymbol': '',
  'withdrawFee': '',
  'minabi': '',   // if token
  'contractAddress': '',  // if token
  'bankName': '',  // if fiat
  'name': '',  // if fiat
  'accountNo': '', // if fiat
  'routingNo': '', // if fiat
  'photo': "",
  // 'currencyId':''
}
const useStyles = makeStyles(styles);

const EditCurrency = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { currencyId } = useParams();

  // state
  const [formValue, setFormValue] = useState(initialFormValue);
  const [validateError, setValidateError] = useState({});

  const {
    category,
    productname,
    price,
    creatorname,
    content,
    creatorimage,
    productimage,
    token
  } = formValue


  // function

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formData = { ...formValue, ...{ [name]: value } }
    setFormValue(formData)
  }

  const handleFile = (event) => {
    const { name, files } = event.target;
    let formData = { ...formValue, ...{ [name]: files[0] } }
    setFormValue(formData)
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      let reqData = new FormData();
      reqData.append('currencyId', currencyId);
      reqData.append('productname', productname);
      reqData.append('price', price);
      reqData.append('content', content);
      reqData.append('creatorimage', creatorimage);
      reqData.append('creatorname', creatorname);
      reqData.append('productimage', productimage);
      reqData.append('token', token);
    


      const { status, loading, messages, error } = await updatecms(reqData);
      if (status == 'success') {
        toastAlert('success', messages, 'EditCMS')
        history.push('/CmsList')
      } else {
        setValidateError(error);
      }
    }
    catch (err) {
    }
  }

  const fetchSingleCurrency = async () => {
    try {
      const { status, loading, error, result } = await getsinglecms(currencyId);
      if (status == 'success') {

        console.log("ressssssssss",result)
        var tempdata=result.data
        let data = {
          'productname': tempdata.productname,
          'price': tempdata.price,
          'content': tempdata.content,
          'creatorimage': tempdata.creatorimage,
          'creatorname': tempdata.creatorname,
          'productimage': tempdata.productimage,
          'token': tempdata.token,
        }
        setFormValue(data)
      } else { }
    } catch (err) { }
  }



  const handleProduct = (event) => {
    const { name, files } = event.target;
    let formData = { ...formValue, ...{ [name]: files[0] } }
    setFormValue(formData)
  };

  const onchangeeditor = (e) => {
    let formData = { ...formValue, ...{ ["content"]: e } }
    setFormValue(formData)
    console.log(formValue);
  }

  
  useEffect(() => {
    fetchSingleCurrency();
  }, [])

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <form method="POST" className={classes.form} noValidate onSubmit={handleFormSubmit}>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Update CMS</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <div className="custom_select">
                      <InputLabel id="demo-controlled-open-select-label">currencyType</InputLabel>
                      <Select
                        className="d-block"
                        labelText="Currency Symbol"
                        name="token"
                        value={token}
                        onChange={handleChange}
                      >
                        <MenuItem value="ETH">ETH</MenuItem>
                        <MenuItem value="BEP">BEP</MenuItem>
                      </Select>
                    </div>

                    {
                      validateError.type && <span className={classes.textDanger}>{validateError.type}</span>
                    }

                  </GridItem>

                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Product Name"
                      name="productname"
                      value={productname}
                      onChange={handleChange}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                    {
                      validateError.productname && <span className={classes.textDanger}>{validateError.productname}</span>
                    }
                  </GridItem>

                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Price"
                      name="price"
                      value={price}
                      onChange={handleChange}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                    {
                      validateError.price && <span className={classes.textDanger}>{validateError.price}</span>
                    }
                  </GridItem>

                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Creator Name"
                      name="creatorname"
                      value={creatorname}
                      onChange={handleChange}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                    {
                      validateError.creatorname && <span className={classes.textDanger}>{validateError.creatorname}</span>
                    }
                  </GridItem>

                

                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Creator Image"
                      onChange={handleFile}
                      name="creatorimage"
                      type="file"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                    <img src={fileObjectUrl(creatorimage)} width="50" height="50" />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Creator Image"
                      onChange={handleProduct}
                      name="productimage"
                      type="file"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                    <img src={fileObjectUrl(productimage)} width="50" height="50" />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                    <p className={classes.cardCategoryWhite}>Create a new user</p>
                    <Editor apiKey='j2crzkts7ankhknggcx4ku2xkuiaxsiruhwg1e01cfwvmbpq'
                      value={content} 
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
                <Button
                  color="primary"
                  type="submit"
                >
                  Update
                </Button>
              </CardFooter>
            </form>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default EditCurrency;